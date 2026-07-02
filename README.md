# Zaztopup — Dokumentasi Arsitektur & Reverse Engineering

Website top-up game (Mobile Legends, Free Fire) dengan admin panel. Next.js 16 App Router, Neon Postgres, Drizzle ORM, JWT auth via httpOnly cookie.

> Dokumen ini bukan README biasa — ini peta untuk memahami **kenapa** setiap keputusan teknis diambil, bukan cuma apa fungsinya. Bagian bertanda ⚠️ = kode hasil AI generation yang perlu ditelusuri lebih dalam / belum tentu optimal.

---

## 1. Arsitektur Umum

### Stack

| Layer | Teknologi | Kenapa |
|---|---|---|
| Framework | Next.js 16.2.9 (App Router) | Fullstack dalam satu repo: page + API route + proxy |
| Database | Neon (serverless Postgres) | Postgres tanpa kelola server; driver HTTP cocok untuk serverless |
| ORM | Drizzle | Query builder tipis, 1:1 dengan SQL, ringan untuk edge/serverless |
| Auth | JWT (HS256) di httpOnly cookie | Stateless — tidak perlu session store |
| Rate limit | Upstash Redis + sliding window | Serverless Redis via REST, tidak butuh koneksi TCP persisten |
| Validasi | Zod v4 | Runtime validation di trust boundary (TypeScript hilang saat runtime) |
| Styling | Tailwind v4 + shadcn/radix | — |

### Flow request: browser → database

```
Browser
  │
  │ GET /admin  (cookie: token=eyJ...)
  ▼
┌─────────────────────────────────────────────┐
│ src/proxy.ts  (pengganti middleware.ts)     │  ← jalan SEBELUM route apapun
│  matcher: /admin/*, /login, /register       │
│  - tidak ada cookie token?  → redirect /login│
│  - token valid tapi bukan admin? → redirect /│
│  - token invalid?           → redirect /login│
│  (verifikasi pakai jose, TANPA query DB)    │
└─────────────────────────────────────────────┘
  │ lolos
  ▼
┌─────────────────────────────────────────────┐
│ Page (src/app/admin/page.tsx)               │
│  Client component → fetch ke /api/admin/*   │
│  via src/services/api.ts (credentials incl.)│
└─────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────┐
│ API Route (src/app/api/admin/.../route.ts)  │
│  1. getAuthUser()  → verify JWT (jsonwebtoken)
│                    → SELECT user dari DB     │  ← authz sesungguhnya di sini
│  2. cek role === "admin"                    │
│  3. validasi body (Zod)                     │
│  4. query via Drizzle                       │
└─────────────────────────────────────────────┘
  │ SQL over HTTPS (bukan TCP!)
  ▼
Neon Postgres
```

**Prinsip penting:** proxy = gerbang UX (redirect cepat), API route = gerbang keamanan sesungguhnya. Proxy hanya melindungi *page* `/admin/*`; endpoint `/api/admin/*` TIDAK ada di matcher proxy — makanya setiap API route wajib cek `getAuthUser()` sendiri. Kalau lupa cek di satu route, route itu terbuka. Ini pattern *defense in depth*, tapi juga titik rawan human error.

### Struktur folder

```
src/
├── proxy.ts                  # Route guard (dulu bernama middleware.ts)
├── app/
│   ├── page.tsx / layout.tsx # Landing + root layout (AuthProvider di sini)
│   ├── login/ register/      # Halaman auth
│   ├── admin/                # Admin panel (dashboard, users, products CRUD)
│   ├── game/                 # Halaman top-up per game
│   └── api/
│       ├── auth/             # login, register, logout, me, delete-account
│       ├── admin/            # dashboard, users, products (protected)
│       └── products/         # katalog publik (produk aktif)
├── lib/
│   ├── db.ts                 # Koneksi Drizzle + Neon
│   ├── schema.ts             # Skema tabel (users, products)
│   ├── auth.ts               # JWT sign/verify + cookie (runtime Node)
│   ├── auth-edge.ts          # JWT verify pakai jose (dipakai proxy)
│   ├── validation.ts         # Zod schema + helper parseBody
│   ├── ratelimit.ts          # Upstash sliding window limiter
│   └── utils.ts              # cn() helper Tailwind
├── contexts/AuthContext.tsx  # State auth di client (React Context)
├── services/api.ts           # Fetch wrapper + typed API client
├── features/                 # UI per domain (home, game/ML, game/FF)
└── components/               # Header, Footer, ui/
```

---

## 2. File Krusial — Bedah Blok per Blok

### 2.1 `src/proxy.ts` — route guard

> **Kenapa namanya `proxy.ts`, bukan `middleware.ts`?** Di Next.js 16, `middleware` di-rename jadi `proxy` (deprecated notice ada di docs bawaan: `node_modules/next/dist/docs/.../proxy.md`). Nama "proxy" dipilih karena file ini berperilaku seperti network boundary di depan aplikasi — bisa jalan terpisah dari runtime utama (misal di CDN). **Perubahan besar lain di v16: proxy default-nya Node.js runtime**, bukan Edge runtime seperti middleware jaman Next ≤15. Ini penting untuk cerita dual-JWT di bawah.

```ts
const PROTECTED_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/register"];
```
Dua kelas route: yang butuh admin, dan yang justru *tidak boleh* diakses kalau sudah login (UX: orang login gak perlu lihat halaman login lagi).

```ts
const token = request.cookies.get("token")?.value;
```
Token dibaca dari **cookie**, bukan header `Authorization`. Kenapa? Karena cookie `httpOnly` dikirim otomatis oleh browser di setiap request — termasuk request *navigasi halaman* (yang tidak bisa disisipi header custom oleh JS). Kalau token disimpan di localStorage, proxy tidak akan pernah melihatnya saat user mengetik URL `/admin` langsung.

```ts
if (isProtected) {
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
  try {
    const decoded = await verifyTokenEdge(token);
    if (decoded.role !== "admin") return NextResponse.redirect(new URL("/", request.url));
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```
- Verifikasi pakai `verifyTokenEdge` (jose) — **tanpa query database**. Proxy jalan di *setiap* request yang match; kalau tiap request harus hit DB, latensi & biaya naik. JWT memang didesain supaya klaim (id, email, role) bisa dipercaya tanpa lookup, selama signature valid.
- **Trade-off yang harus dipahami:** role dibaca dari token, bukan DB. Kalau admin di-demote, tokennya tetap bilang `role: "admin"` sampai expired (maks 7 hari). Ini sifat bawaan stateless JWT. Mitigasinya di sini: API route melakukan lookup DB ulang (lihat 2.2), jadi data sensitif tetap aman — yang "bocor" hanya akses ke *halaman kosong* admin.
- `new URL("/login", request.url)` — redirect wajib URL absolut di proxy (enforced sejak Next 12).

```ts
export const config = { matcher: ["/admin/:path*", "/login", "/register"] };
```
Matcher dievaluasi **saat build** (harus statis). Tanpa matcher, proxy jalan di semua request termasuk `_next/static`, gambar, dll — buang-buang compute. `:path*` = semua segmen di bawah `/admin`.

⚠️ **Perlu ditelusuri:** matcher tidak mencakup `/api/admin/:path*`. Aman karena tiap API route cek sendiri, tapi menambahkan API path ke matcher akan memberi lapisan penolakan lebih awal (dan lebih murah) untuk request tanpa token.

### 2.2 `src/lib/auth.ts` + `src/lib/auth-edge.ts` — dual JWT

**Kenapa ada DUA library JWT (`jsonwebtoken` dan `jose`) untuk satu secret yang sama?**

Sejarahnya: di Next ≤15, middleware jalan di **Edge Runtime** — JavaScript runtime minimal (mirip browser/service worker) tanpa API Node.js seperti `Buffer`, `fs`, atau modul `crypto` bawaan Node. `jsonwebtoken` bergantung pada `crypto` Node → crash di Edge. `jose` ditulis di atas **Web Crypto API** (`crypto.subtle`) yang tersedia di semua runtime (Edge, Node, browser) → jalan di mana saja. Makanya pattern umum: `jose` di middleware, `jsonwebtoken` di API route.

Keduanya menghasilkan/memverifikasi token yang **kompatibel** — sama-sama HS256 (HMAC-SHA256, symmetric: satu secret untuk sign dan verify). `generateToken` (jsonwebtoken) → `verifyTokenEdge` (jose) valid, karena JWT adalah *standar format*, bukan format library.

⚠️ **Perlu ditelusuri / kandidat simplifikasi:** karena proxy di Next 16 sudah Node.js runtime, alasan teknis pemisahan ini **sudah hilang**. `jose` bisa dipakai di semua file (dia jalan di Node juga), dan `jsonwebtoken` + `auth-edge.ts` bisa dihapus → satu library, satu code path. Split ini adalah *fosil* dari era Edge middleware yang terbawa AI generation.

Blok per blok `auth.ts`:

```ts
const TOKEN_EXPIRY = "7d";
```
Token hidup 7 hari, dan **tidak ada refresh token flow** di project ini. Login → token 7 hari → expired → login ulang. Sederhana, tapi berarti: (a) tidak bisa revoke token sebelum expired, (b) window pencurian token panjang. Refresh token (short-lived access + long-lived refresh) adalah upgrade path kalau kebutuhan revocation muncul.

```ts
jwt.sign({ id, email, role }, process.env.JWT_SECRET!, { expiresIn: TOKEN_EXPIRY })
```
Payload JWT itu **hanya base64-encoded, BUKAN terenkripsi** — siapapun bisa decode dan baca isinya. Yang dijamin signature adalah *integritas* (tidak bisa diubah tanpa secret), bukan *kerahasiaan*. Makanya password tidak pernah masuk payload. `!` (non-null assertion) = kalau `JWT_SECRET` tidak di-set, crash saat sign — fail fast, lebih baik daripada sign dengan `undefined`.

```ts
cookieStore.set("token", token, {
  httpOnly: true,   // JS di browser TIDAK bisa baca cookie ini → XSS tidak bisa curi token
  secure: process.env.NODE_ENV === "production",  // hanya lewat HTTPS di prod
  sameSite: "lax",  // cookie tidak dikirim pada POST cross-site → mitigasi CSRF
  maxAge: COOKIE_MAX_AGE,  // 7 hari, sinkron dengan expiry token
  path: "/",
});
```
Tiga atribut ini adalah trio pertahanan standar:
- `httpOnly` melawan **XSS** (script jahat tidak bisa `document.cookie`).
- `sameSite: "lax"` melawan **CSRF**: browser hanya mengirim cookie cross-site pada *top-level GET navigation*. Form POST dari situs lain → cookie tidak ikut → request-nya anonim. Karena semua mutasi di API ini pakai POST/PATCH/DELETE, `lax` sudah menutup CSRF klasik tanpa perlu CSRF token.
- `secure` melawan sniffing di jaringan (cookie tidak bocor lewat HTTP polos).

```ts
export async function getAuthUser(): Promise<AuthUser | null> {
  ...
  const decoded = verifyToken(token);
  const result = await db.select(...).from(users).where(eq(users.id, decoded.id)).limit(1);
  return result[0] ?? null;
}
```
Ini **satu-satunya gerbang authz di API layer**, dipakai semua route protected. Beda dengan proxy: setelah verify JWT, dia **query DB** untuk ambil user terkini. Konsekuensinya: user yang sudah dihapus → `null` → 403, meskipun tokennya masih valid. Role juga selalu fresh dari DB. Trade-off: +1 query DB per request protected — harga yang wajar untuk authz yang benar.

Catatan: `catch { return null }` menelan semua error (token expired, DB down) jadi `null`. Praktis, tapi DB down akan terlihat sebagai "tidak login" — bisa membingungkan saat debugging.

### 2.3 `src/lib/db.ts` — koneksi database

```ts
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```
Driver `neon-http` mengirim tiap query sebagai **request HTTPS**, bukan koneksi TCP Postgres. Kenapa penting di serverless: tiap invocation function bisa jadi instance baru; koneksi TCP Postgres itu mahal (handshake + auth + limit `max_connections`). Ratusan lambda × koneksi persisten = DB kehabisan slot koneksi. HTTP = stateless, tidak ada koneksi yang harus di-pool atau di-cleanup.

Trade-off: `neon-http` **tidak mendukung interactive transaction** (`db.transaction()` multi-statement dengan logic di tengah). Untuk itu perlu driver websocket (`neon-serverless`). Project ini belum butuh transaksi multi-step, jadi HTTP cukup — tapi catat: begitu ada flow "kurangi saldo + buat order" yang harus atomik, driver ini harus diganti.

### 2.4 `src/lib/schema.ts` — skema DB

```ts
id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
```
UUID digenerate **di aplikasi** (`$defaultFn`), bukan di DB (`gen_random_uuid()`). Konsekuensi: insert lewat Drizzle dapat UUID, insert manual lewat SQL langsung → `id` null → error. ⚠️ Lebih tahan banting kalau default-nya di level DB (`.default(sql\`gen_random_uuid()\`)`).

```ts
email: text("email").notNull().unique(),
```
`unique()` membuat **unique index** di Postgres — melakukan dua tugas: (1) constraint anti-duplikat yang ditegakkan DB (bukan cuma di kode), (2) index untuk lookup login `WHERE email = ?` jadi O(log n) bukan full table scan. Ini contoh rung "DB constraint over app code": cek `existing` di register (lihat 2.6) sebenarnya redundan secara correctness — constraint inilah jaring pengaman sesungguhnya terhadap race condition dua register bersamaan.

```ts
price: integer("price").notNull(),
```
Harga sebagai **integer (rupiah utuh)**, bukan float/decimal. Fundamental: floating point tidak bisa merepresentasikan banyak nilai desimal secara eksak (0.1 + 0.2 ≠ 0.3) — untuk uang selalu integer satuan terkecil.

```ts
isActive: boolean("is_active").notNull().default(true),
```
Basis **soft delete** untuk products: "hapus" = toggle nonaktif. Kenapa: produk mungkin direferensikan riwayat order (nanti), dan admin bisa undo. Bandingkan: `users` di-hard-delete (lihat 2.7) — inkonsisten tapi masuk akal, user punya hak dihapus permanen (GDPR-ish), produk tidak.

⚠️ **Perlu ditelusuri:** folder `drizzle/` (output migration di `drizzle.config.ts`) tidak ada di repo → schema kemungkinan di-sync pakai `db:push` (langsung ubah DB tanpa file migration). Untuk solo dev oke; untuk tim/production serius, migration files (`db:generate` + `db:migrate`) memberi riwayat perubahan schema yang bisa di-review & di-rollback.

### 2.5 `src/lib/ratelimit.ts` — rate limiting

```ts
limiter: Ratelimit.slidingWindow(5, "60 s"),
```
**Algoritma sliding window**: gabungan dua counter fixed-window (jendela sekarang + sebelumnya) dengan bobot proporsional waktu. Kenapa bukan fixed window murni? Fixed window punya **masalah boundary**: 5 request di detik ke-59 + 5 request di detik ke-61 = 10 request dalam 2 detik, semua lolos. Sliding window menghaluskan itu. Kenapa bukan token bucket? Token bucket mengizinkan *burst* (menabung token) — justru yang TIDAK kita mau untuk brute-force login. 5/menit per IP cukup ketat untuk manusia, mematikan untuk password guessing.

Kenapa **Upstash via REST**: rate limit butuh state *terpusat* (dua instance serverless harus lihat counter yang sama → tidak bisa in-memory). Redis klasik butuh koneksi TCP (masalah yang sama dengan Postgres di 2.3); Upstash mengekspos Redis lewat HTTP REST → cocok serverless.

```ts
// fail open
catch (err) { console.error(...); return true; }
```
**Fail-open**: Redis down → request diloloskan. Pilihan sadar: lebih baik kehilangan rate limiting sementara daripada seluruh login mati karena dependency sekunder tumbang. (Fail-closed masuk akal untuk sistem yang sangat sensitif; untuk topup store, availability menang.)

```ts
const xff = req.headers.get("x-forwarded-for");
if (xff) return xff.split(",")[0].trim();
```
IP diambil dari `X-Forwarded-For` karena di belakang proxy (Vercel), `req` tidak pernah melihat IP asli. ⚠️ **Perlu dipahami:** header XFF bisa **dipalsukan client** kalau infra tidak menimpanya. Di Vercel aman (Vercel menimpa XFF), tapi kalau pindah hosting, entri pertama XFF bisa jadi bohongan → attacker bypass rate limit dengan ganti-ganti header. Aturan umumnya: hanya percaya XFF dari reverse proxy yang kamu kontrol.

### 2.6 `src/lib/validation.ts` + pemakaiannya — validasi input

Kenapa validasi **di server, di awal handler**? TypeScript berhenti eksis saat runtime — `req.json()` mengembalikan `any` yang isinya sepenuhnya dikendalikan client (curl bisa kirim `{"email": {"$gt": ""}}`). Zod adalah pagar **runtime** di *trust boundary*: titik di mana data pindah dari "dikendalikan orang asing" ke "dipercaya kode kita". Validasi di form client itu UX, bukan security — bisa di-bypass total.

```ts
password: z.string().min(8).max(72)
```
`max(72)` bukan angka acak: **bcrypt hanya memproses 72 byte pertama** — sisanya diam-diam diabaikan. Tanpa cap ini, password 100 karakter dengan 72 karakter pertama sama akan dianggap identik. Juga mencegah DoS via hashing input raksasa.

```ts
return { ok: false, error: result.error.issues[0]?.message ?? "..." };
```
`parseBody` mengembalikan discriminated union `{ok: true, data} | {ok: false, error}` alih-alih throw — memaksa caller menangani kegagalan secara eksplisit lewat type narrowing.

⚠️ **Inkonsistensi (perlu dirapikan):** `POST /api/admin/products` TIDAK pakai Zod — validasi manual `if (!game || !category || !label || !price)`. Dua bug laten: (1) `!price` menolak `price: 0` padahal mungkin valid... dan lebih penting menerima `price: "abc"` string, (2) field lain (`diamonds`, `discount`) lolos tanpa cek tipe sama sekali → string bisa masuk kolom integer dan meledak di DB. PATCH-nya justru sudah pakai `updateProductSchema` lengkap. Ini jejak khas AI generation: dua endpoint bertetangga dengan standar berbeda.

### 2.7 API routes — pattern & anatomi

Pattern seragam semua route (hafalkan urutan ini, ini "resep"-nya):

```
1. Rate limit    (hanya auth routes — endpoint yang bisa di-brute-force)
2. AuthN + AuthZ (getAuthUser() + cek role — semua /api/admin/*)
3. Validasi body (Zod / parseBody)
4. Query DB      (Drizzle)
5. Response      { success, ... } dengan status code semantik
6. catch         → 500 generik, TANPA bocorkan detail error
```

Urutan 1→2→3 disengaja: tolak yang paling murah dulu (cek counter Redis) sebelum yang mahal (bcrypt, query DB).

**Status codes yang dipakai:** 400 (input invalid), 401 (belum login), 403 (login tapi bukan admin), 404 (resource tidak ada), 429 (rate limited), 201 (created), 500 (error server). Pembedaan 401 vs 403 itu semantik HTTP standar: 401 = "siapa kamu?", 403 = "aku tahu siapa kamu, dan tidak boleh".

Detail per route yang layak dicatat:

- **`auth/login`**: pesan error sengaja identik untuk "email tidak ada" dan "password salah" (`Email atau password salah`) → mencegah **user enumeration**. ⚠️ Tapi masih ada dua celah kecil: (1) *timing side channel* — kalau email tidak ada, `bcrypt.compare` di-skip, respons lebih cepat ~100ms, bisa diukur attacker (mitigasi: selalu compare terhadap dummy hash); (2) `register` membocorkan `"Email sudah terdaftar"` — enumeration tetap bisa lewat pintu register (dimitigasi rate limit 5/menit, tapi tidak tertutup).
- **`auth/register`**: `bcrypt.hash(password, 12)` — cost 12 = 2¹² iterasi. Bcrypt *sengaja lambat* (~100-250ms); ini fiturnya, bukan bug: memperlambat brute-force offline kalau DB bocor. Cek `existing` lalu insert itu **bukan atomik** (race window) — unique constraint di DB (2.4) yang jadi penjaga sesungguhnya; race hanya berujung 500, bukan data duplikat.
- **`auth/me`**: dipanggil `AuthContext` saat app mount untuk hydrate state login. Kalau token invalid → sekalian `clearAuthCookie()` (bersihkan cookie zombie).
- **`admin/products/[id]` DELETE**: sebenarnya **toggle** `isActive`, bukan delete — method DELETE dipakai untuk soft delete. ⚠️ Semantik HTTP-nya questionable (DELETE idealnya idempotent; toggle tidak — dua kali DELETE = balik ke semula). Lebih jujur: `PATCH {isActive: false}`.
- **`admin/users/[id]` DELETE**: hard delete + **tidak ada guard self-delete atau anti-hapus-sesama-admin** ⚠️ — admin bisa menghapus akunnya sendiri atau admin lain lewat API.
- **`admin/dashboard`**: tiga query via `Promise.all` — jalan paralel, latensi = query terlambat, bukan jumlah ketiganya. Pattern bagus untuk query independen.
- **`params: Promise<{id: string}>`** di dynamic route: di Next 15+ `params` jadi async (harus di-`await`) — persiapan streaming/partial rendering.

### 2.8 `next.config.ts` — security headers

```ts
{ key: "X-Content-Type-Options", value: "nosniff" },
```
Melarang browser **MIME-sniffing**: tanpa ini, file upload berlabel `text/plain` berisi `<script>` bisa "ditebak" browser sebagai HTML dan dieksekusi. `nosniff` = percaya Content-Type apa adanya.

```ts
{ key: "X-Frame-Options", value: "DENY" },
```
Melarang situs ini di-embed dalam `<iframe>` → mencegah **clickjacking** (situs jahat menaruh admin panel transparan di atas tombol umpan "klik untuk hadiah").

```ts
{ key: "X-XSS-Protection", value: "1; mode=block" },
```
⚠️ **Header mati.** XSS Auditor sudah dihapus dari Chrome (2019) & Edge; Firefox tidak pernah implement. Tidak berbahaya di sini karena `mode=block`, tapi murni kargo-kultus dari snippet lama — jejak AI generation. Boleh dihapus.

```ts
{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
```
Cross-origin request hanya membawa origin (`https://situs.com`), bukan path lengkap → URL internal (misal `/admin/users?q=...`) tidak bocor ke situs eksternal via header Referer. Downgrade HTTPS→HTTP: tidak kirim apa-apa.

⚠️ **Yang absen:** `Content-Security-Policy` (pertahanan XSS modern yang sesungguhnya, pengganti X-XSS-Protection) dan `Strict-Transport-Security`/HSTS (paksa HTTPS; Vercel set otomatis, tapi kalau self-host harus manual). CSP butuh effort (nonce untuk inline script Next.js) — layak ditelusuri saat serius hardening.

---

## 3. File Pendukung (per domain)

### Auth (client side)
| File | Peran |
|---|---|
| `src/contexts/AuthContext.tsx` | React Context pemegang state `user` di client. Saat mount, panggil `/api/auth/me` untuk hydrate (karena cookie httpOnly tidak bisa dibaca JS — satu-satunya cara client tahu "aku login sebagai siapa" adalah bertanya ke server). `let cancelled` di useEffect = guard setState setelah unmount. |
| `src/services/api.ts` | Fetch wrapper typed. `credentials: "include"` = selalu kirim cookie. Semua response error dinormalisasi jadi `Error` dengan message dari server → UI cukup `catch (e) => e.message`. |

### Data layer
| File | Peran |
|---|---|
| `src/lib/db.ts` | Instance Drizzle + Neon HTTP (lihat 2.3) |
| `src/lib/schema.ts` | Definisi tabel + `$inferSelect`/`$inferInsert` (tipe TS digenerate dari schema — single source of truth) |
| `drizzle.config.ts` | Config drizzle-kit (dialect postgres, schema path, output `./drizzle`) |

### API routes
| Route | Method | Akses | Catatan |
|---|---|---|---|
| `/api/auth/register` | POST | publik + ratelimit | bcrypt cost 12 |
| `/api/auth/login` | POST | publik + ratelimit | set cookie |
| `/api/auth/logout` | POST | publik | clear cookie |
| `/api/auth/me` | GET | cookie | hydrate client |
| `/api/auth/delete-account` | DELETE | login | hard delete diri sendiri |
| `/api/products` | GET | publik | hanya `isActive`, filter `?game=` |
| `/api/admin/dashboard` | GET | admin | 3 query paralel |
| `/api/admin/users` | GET | admin | tanpa kolom password |
| `/api/admin/users/[id]` | DELETE | admin | hard delete ⚠️ tanpa self-guard |
| `/api/admin/products` | GET/POST | admin | POST ⚠️ validasi manual, bukan Zod |
| `/api/admin/products/[id]` | PATCH/DELETE | admin | DELETE = toggle isActive |

### UI / Frontend
| Folder | Peran |
|---|---|
| `src/app/*` | Pages (App Router). `/admin/*` = client components yang fetch adminApi |
| `src/features/game/ML`, `FF` | Fitur top-up per game: components + hooks (state order) + utils (format rupiah, deep-link WhatsApp — checkout = kirim order via WA, belum ada payment gateway) |
| `src/features/home` | Landing (Hero, Game grid) |
| `src/components/ui` | Komponen shared (MapPicker/leaflet, particle typography/gsap ⚠️ berat, cek dampak bundle) |

---

## 4. Ringkasan ⚠️ — daftar "perlu ditelusuri lebih dalam"

Prioritas dari sisi dampak:

1. **Validasi manual di `POST /api/admin/products`** — tipe tidak dicek, `price: 0` tertolak, string bisa masuk kolom integer. Samakan dengan Zod seperti PATCH. *(bug nyata)*
2. **`admin/users/[id]` DELETE tanpa guard** — admin bisa hapus dirinya/admin lain. *(keputusan produk yang belum diambil secara sadar)*
3. **Dual JWT sudah tidak perlu di Next 16** — proxy kini Node runtime; `jose` saja cukup untuk semua, hapus `jsonwebtoken` + `auth-edge.ts`. *(simplifikasi)*
4. **`X-XSS-Protection` header mati; CSP & HSTS absen.** *(hardening)*
5. **Tidak ada migration files** (workflow `db:push`) — tidak ada riwayat schema. *(proses)*
6. **`/api/admin/*` tidak masuk matcher proxy** — aman tapi single-point-of-failure di kedisiplinan tiap route memanggil `getAuthUser()`. *(defense in depth)*
7. **Timing side channel di login** + enumeration via register. *(minor, rate-limited)*
8. **DELETE = toggle** di products — semantik HTTP tidak idempotent. *(kosmetik API design)*
9. **UUID digenerate di app, bukan DB.** *(robustness)*

---

## 5. Menjalankan Project

```bash
npm install
npm run dev          # dev server
npm run build        # production build
npm run db:studio    # GUI browse DB
npm run db:push      # sync schema.ts → DB (tanpa migration file)
```

Env yang dibutuhkan (`.env.local`):
```
DATABASE_URL=            # Neon connection string
JWT_SECRET=              # random panjang (mis. openssl rand -base64 48)
UPSTASH_REDIS_REST_URL=  # opsional — tanpa ini rate limit nonaktif (fail open)
UPSTASH_REDIS_REST_TOKEN=
```
