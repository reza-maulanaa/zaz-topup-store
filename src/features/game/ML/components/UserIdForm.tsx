"use client";

export default function UserIdForm({
  userId,
  onUserIdChange,
  serverId,
  onServerIdChange,
  nickname,
  onNicknameChange,
}: {
  userId: string;
  onUserIdChange: (value: string) => void;
  serverId: string;
  onServerIdChange: (value: string) => void;
  nickname: string;
  onNicknameChange: (value: string) => void;
}) {
  return (
    <section className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center bg-violet-50 text-sm font-bold text-violet-600">
          1
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Masukkan ID Akun
          </h2>
          <p className="text-xs text-slate-400">Cek di pojok kanan atas profil ML kamu</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
            User ID
          </label>
          <input
            className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-300 transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            value={userId}
            onChange={(e) => onUserIdChange(e.target.value)}
            placeholder="Contoh: 123456789"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
            Server ID
          </label>
          <input
            className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-300 transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            value={serverId}
            onChange={(e) => onServerIdChange(e.target.value)}
            placeholder="Contoh: 1234"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
            Nickname
          </label>
          <input
            className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-300 transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="Contoh: ProPlayer123"
          />
        </div>
      </div>

      {userId && serverId && nickname && (
        <div className="mt-3 flex items-center gap-2 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          ID lengkap — lanjut pilih item!
        </div>
      )}
    </section>
  );
}
