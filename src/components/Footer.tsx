const WA = process.env.NEXT_PUBLIC_WA_NUMBER || "6289502839100";
const INSTAGRAM = "zazstoreid";

function HeadsetIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function WAIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.84 1.56V6.81a4.85 4.85 0 01-1.07-.12z" />
    </svg>
  );
}

const contactLinks = [
  {
    label: "Customer Service",
    href: `https://wa.me/${WA}`,
    iconBg: "bg-emerald-50 text-emerald-600 ring-emerald-100 group-hover:bg-emerald-100",
    icon: <HeadsetIcon />,
  },
  {
    label: "Chat WhatsApp",
    href: `https://wa.me/${WA}`,
    iconBg: "bg-green-50 text-green-600 ring-green-100 group-hover:bg-green-100",
    icon: <WAIcon />,
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: `https://instagram.com/${INSTAGRAM}`,
    iconBg: "bg-rose-50 text-rose-600 ring-rose-100 group-hover:bg-rose-100",
    icon: <InstagramIcon />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@zazstoreid",
    iconBg: "bg-slate-950 text-white ring-slate-200 group-hover:bg-slate-800",
    icon: <TikTokIcon />,
  },
];

function LinkCard({
  href,
  iconBg,
  icon,
  label,
}: {
  href: string;
  iconBg: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 transition duration-200 ${iconBg}`}
      >
        {icon}
      </div>
      <span className="text-sm font-semibold text-slate-700 transition group-hover:text-slate-900">
        {label}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-auto shrink-0 text-slate-300 transition group-hover:text-slate-500"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Brand */}
          <section className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img src="/zaz.avif" alt="ZazStore" className="h-full w-full object-cover" />
              </div>
              <div className="leading-tight">
                <h2 className="text-base font-bold tracking-tight text-slate-900">
                  ZazStore.ID
                </h2>
                <p className="text-xs text-slate-400">Top Up Game Termurah</p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
              Top up game jadi lebih mudah, cepat, dan aman. Tersedia Mobile
              Legends, Free Fire, dan game populer lainnya dengan proses simpel
              via WhatsApp.
            </p>

            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <WAIcon size={16} />
              +{WA}
            </a>
          </section>

          {/* Contact */}
          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Kontak
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactLinks.map((link) => (
                <LinkCard key={link.label} {...link} />
              ))}
            </div>
          </section>

          {/* Social */}
          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Ikuti Kami
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {socialLinks.map((link) => (
                <LinkCard key={link.label} {...link} />
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-400">
            © 2025 ZazStore.ID · Semua transaksi diproses manual via WhatsApp
          </p>
          <p className="text-xs text-slate-300">Made with ♥ in Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
