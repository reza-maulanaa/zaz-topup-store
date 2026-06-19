"use client";

import { motion } from "motion/react";

type ActiveGame = "free-fire" | "mobile-legends" | null;

const games: {
  name: string;
  image: string;
  key: ActiveGame;
  desc: string;
  accent: string;
}[] = [
  {
    name: "Free Fire",
    image: "/ff.avif",
    key: "free-fire",
    desc: "Diamond & Item",
    accent: "from-orange-50 to-red-50 border-orange-200",
  },
  {
    name: "Mobile Legends",
    image: "/ml.avif",
    key: "mobile-legends",
    desc: "Diamond & Pass",
    accent: "from-sky-50 to-violet-50 border-violet-200",
  },
];

type GameProps = {
  activeGame: ActiveGame;
  onGameSelect: (game: ActiveGame) => void;
};

export function Game({ activeGame, onGameSelect }: GameProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          Pilih Game
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Game Pilihan
        </h2>
        <p className="mt-2 max-w-2xl text-slate-500">
          Top up game favoritmu dengan proses instan dan harga terbaik.
        </p>
      </motion.div>

      <div className="mt-8 flex flex-wrap justify-center gap-5 md:justify-start">
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
                className={`relative overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200 ${
                  isActive
                    ? `scale-105 bg-gradient-to-br shadow-lg ${game.accent}`
                    : "border-slate-200 hover:scale-[1.03] hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="h-28 w-28 object-cover transition duration-300 group-hover:scale-105 sm:h-32 sm:w-32 md:h-36 md:w-36"
                />

                {isActive && (
                  <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="mt-3 text-center">
                <p className="text-sm font-bold text-slate-900">{game.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">{game.desc}</p>
              </div>

              {isActive && (
                <div className="mt-1.5 flex justify-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold text-violet-700">
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
