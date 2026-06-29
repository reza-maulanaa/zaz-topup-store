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
    <div className="relative h-[320px] w-full">
      {cards.map((card, i) => (
        /* Float wrapper — hanya animasi naik-turun */
        <motion.div
          key={card.game}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: card.delay,
          }}
          className={`absolute ${i === 0 ? "left-8 top-4" : "left-32 top-28"}`}
        >
          <div className="w-48 overflow-hidden border border-zinc-200 shadow-md">
            {/* Full image */}
            <div className="relative h-56 w-full bg-zinc-100">
              <Image
                src={card.image}
                alt={card.game}
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* Info overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[11px] font-semibold text-white/60 uppercase tracking-wide">
                  {card.game}
                </p>
                <p className="mt-0.5 text-sm font-bold text-white">
                  {card.amount}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-white/70">{card.price}</span>
                  <button
                    onClick={() => onSelect?.(card.slug)}
                    className="bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-red-700 transition-colors"
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
      <div className="absolute left-16 top-16 h-40 w-40 rounded-full bg-yellow-200 opacity-60 blur-3xl" />
    </div>
  );
}
