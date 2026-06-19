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
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
          1
        </span>
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Masukkan ID
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            User ID
          </label>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-violet-500 focus:bg-white"
            value={userId}
            onChange={(e) => onUserIdChange(e.target.value)}
            placeholder="Contoh: 123456789"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Server ID
          </label>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-violet-500 focus:bg-white"
            value={serverId}
            onChange={(e) => onServerIdChange(e.target.value)}
            placeholder="Contoh: 1234"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Nickname
          </label>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-violet-500 focus:bg-white"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="Contoh: ProPlayer123"
          />
        </div>
      </div>
    </section>
  );
}
