"use client";

import  ChevronDown from '@/features/game/ML/icons/ChevronDown';

export default function HowToOrder({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const steps = [
    "Masukkan User ID, Server ID & Nickname",
    "Pilih nominal diamond atau paket",
    "Pilih metode pembayaran",
    "Klik Order via WhatsApp & kirim pesan",
    "Transfer & kirim bukti ke admin",
    "Diamond masuk 1–15 menit setelah konfirmasi",
  ];

  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-50"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
          <span className="text-amber-500">📋</span>
          Cara Order
        </span>

        <ChevronDown rotated={open} />
      </button>

      {open ? (
        <div className="border-t border-slate-200 px-5 py-4">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-start gap-3 text-sm text-slate-600"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xs font-bold text-violet-600">
                  {index + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}