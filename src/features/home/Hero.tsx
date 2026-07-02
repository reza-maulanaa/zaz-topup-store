"use client";

import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";

const TRUST_ITEMS = [
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: "Proses Instan",
    desc: "1–15 menit masuk",
  },
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "100% Aman",
    desc: "Transaksi terjamin",
  },
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "Harga Terbaik",
    desc: "Termurah dijamin",
  },
];

type HeroSectionOneProps = {
  onTopUpClick: () => void;
  onContactClick: () => void;
};

export default function HeroSectionOne({
  onTopUpClick,
  onContactClick,
}: HeroSectionOneProps) {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-10 md:px-8 md:pb-12 md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Content */}
        <div className="order-1 flex flex-col items-center lg:items-start">
          {/* Status badge */}
          <div
            className="animate-in fade-in slide-in-from-top-2 fill-mode-both duration-300 mb-5 inline-flex items-center gap-2 border border-zinc-300 px-4 py-1.5 text-xs font-semibold text-zinc-500 tracking-wide"
          >
            <span className="h-1.5 w-1.5 animate-pulse bg-emerald-500" />
            Tersedia 24/7 · Proses Instan
          </div>

          <h1
            className="animate-in fade-in blur-in-4 slide-in-from-bottom-2 fill-mode-both duration-500 max-w-[650px] text-center text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:max-w-none lg:text-left"
          >
            Top Up Game <span>Cepat</span>, Mudah & Tepercaya.
          </h1>

          <p
            className="animate-in fade-in fill-mode-both duration-300 delay-500 mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-slate-500 lg:mx-0 lg:text-left"
          >
            Diamond Mobile Legends, Free Fire dan berbagai kebutuhan gaming
            lainnya dengan proses instan, aman, dan harga terbaik.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-in fade-in fill-mode-both duration-300 delay-700 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <button
              onClick={onTopUpClick}
              className="group flex min-w-[180px] items-center justify-center gap-2 bg-slate-900 px-6 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Top Up Sekarang
            </button>

            <button
              onClick={onContactClick}
              className="min-w-[180px] border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow"
            >
              Kontak Kami
            </button>
          </div>

          {/* Trust badges */}
          <div
            className="animate-in fade-in fill-mode-both duration-400 delay-900 mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 border border-slate-100 bg-slate-50 px-3.5 py-2.5 shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-white text-slate-600 shadow-sm ring-1 ring-slate-100">
                  {item.icon}
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-slate-800">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Particle Typography */}
        <div
          className="animate-in fade-in fill-mode-both duration-600 delay-500 order-2 flex items-center justify-center lg:justify-end"
        >
          <CursorDrivenParticleTypography
            text="zazstore.id"
            fontSize={72}
            particleSize={3}
            particleDensity={4}
            dispersionStrength={80}
            returnSpeed={0.08}
            fontWeight="300"
            color="#f97316"
            className="h-[280px] w-full max-w-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
