"use client";

import { motion } from "motion/react";
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
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-5 inline-flex items-center gap-2 border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 tracking-wide"
          >
            <span className="h-1.5 w-1.5 animate-pulse bg-yellow-400" />
            Tersedia 24/7 · Proses Instan
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[650px] text-center text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:max-w-none lg:text-left [&>span]:text-red-600"
          >
             <span>Top Up </span>Game Cepat, Mudah & Tepercaya.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-slate-500 lg:mx-0 lg:text-left"
          >
            Diamond Mobile Legends, Free Fire dan berbagai kebutuhan gaming
            lainnya dengan proses instan, aman, dan harga terbaik.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <button
              onClick={onTopUpClick}
              className="group flex min-w-[180px] border items-center justify-center gap-2 bg-red-600 border-gray-400 px-6 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md"
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
              className="min-w-[180px] border border-blue-600 bg-white px-6 py-3.5 font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow"
            >
              Kontak Kami
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 border border-blue-100 bg-blue-50 px-3.5 py-2.5 shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-blue-600 text-white shadow-sm">
                  {item.icon}
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-slate-800">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Cursor Particle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="order-2 flex justify-center lg:justify-end"
        >
          <CursorDrivenParticleTypography
            text="ZAZSTORE.ID"
            fontSize={90}
            particleSize={1.5}
            particleDensity={6}
            dispersionStrength={18}
            returnSpeed={0.08}
            color="#ef4444"
            className="h-full min-h-0"
          />
        </motion.div>
      </div>
    </section>
  );
}
