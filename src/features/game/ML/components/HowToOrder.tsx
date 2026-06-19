"use client";

import ChevronDown from "@/features/game/ML/icons/ChevronDown";

const STEPS = [
  "Masukkan User ID, Server ID & Nickname",
  "Pilih nominal diamond atau paket",
  "Pilih metode pembayaran",
  "Klik Order via WhatsApp & kirim pesan",
  "Transfer & kirim bukti ke admin",
  "Diamond masuk 1–15 menit setelah konfirmasi",
];

export default function HowToOrder({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-50"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-base">
            📋
          </span>
          Cara Order
        </span>
        <ChevronDown rotated={open} />
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 py-4">
          <ol className="space-y-3">
            {STEPS.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xs font-bold text-violet-600">
                  {index + 1}
                </span>
                <span className="text-slate-600 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
