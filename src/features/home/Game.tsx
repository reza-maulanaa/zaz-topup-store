"use client";

import { motion } from "motion/react";

type ActiveGame = "free-fire" | "mobile-legends" | null;

const games: { name: string; image: string; key: ActiveGame }[] = [
  { name: "Free Fire", image: "/ff.avif", key: "free-fire" },
  { name: "Mobile Legends", image: "/ml.avif", key: "mobile-legends" },
];

type GameProps = {
  activeGame: ActiveGame;
  onGameSelect: (game: ActiveGame) => void;
};

export function Game({ activeGame, onGameSelect }: GameProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Game Pilihan
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Top up game favoritmu dengan proses instan dan harga terbaik.
        </p>
      </motion.div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 md:justify-start">
        {games.map((game, index) => {
          const isActive = activeGame === game.key;
          return (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onGameSelect(game.key)}
            >
              <div
                className={`overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200
                  ${
                    isActive
                      ? "border-violet-500 shadow-lg shadow-violet-100 scale-105"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="h-28 w-28 object-cover transition duration-300 group-hover:scale-105
                    sm:h-32 sm:w-32 md:h-36 md:w-36"
                />
              </div>

              <h2 className="mt-3 text-center text-sm font-semibold text-slate-900">
                {game.name}
              </h2>

              {/* Indicator aktif */}
              {isActive && (
                <div className="mt-1 flex justify-center">
                  <span
                    className="inline-flex items-center gap-1 rounded-full
                    bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-600"
                  >
                    ✓ Dipilih
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
