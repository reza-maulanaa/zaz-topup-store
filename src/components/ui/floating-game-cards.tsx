"use client";

import { motion } from "motion/react";
import Image from "next/image";

const cards = [
  {
    slug: "mobile-legends" as const,
    game: "Mobile Legends",
    amount: "100 Diamonds",
    price: "Rp 29.000",
    image: "/ml.webp",
    delay: 0,
  },
  {
    slug: "free-fire" as const,
    game: "Free Fire",
    amount: "140 Diamonds",
    price: "Rp 20.000",
    image: "/ff.avif",
    delay: 0.4,
  },
];

export function FloatingGameCards({
  onSelect,
}: {
  onSelect?: (slug: "free-fire" | "mobile-legends") => void;
}) {
  return (
    <div className="relative h-[240px] w-full lg:h-[420px]">
      {cards.map((card, i) => (
        <motion.div
          key={card.game}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: card.delay,
          }}
          className={`absolute ${
            i === 0
              ? "left-[15%] top-3 lg:left-[8%] lg:top-8"
              : "left-[45%] top-20 lg:left-[42%] lg:top-36"
          }`}
        >
          <div className="w-32 overflow-hidden border border-zinc-200 shadow-md lg:w-64">
            {/* Full image */}
            <div className="relative h-40 w-full bg-zinc-100 lg:h-72">
              <Image
                src={card.image}
                alt={card.game}
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* Info overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-3">
                <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wide lg:text-[11px]">
                  {card.game}
                </p>
                <p className="mt-0.5 text-xs font-bold text-white lg:text-sm">
                  {card.amount}
                </p>
                <div className="mt-1 flex items-center justify-between lg:mt-2">
                  <span className="text-[10px] text-white/70 lg:text-xs">{card.price}</span>
                  <button
                    onClick={() => onSelect?.(card.slug)}
                    className="bg-red-600 px-1.5 py-0.5 text-[9px] font-semibold text-white hover:bg-red-700 transition-colors lg:px-2 lg:text-[10px]"
                    style={{ cursor: "pointer" }}
                  >
                    Beli
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Decorative blur blob */}
      <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-yellow-200 opacity-60 blur-3xl lg:left-[25%] lg:h-64 lg:w-64" />
    </div>
  );
}
