"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type ActiveGame = "free-fire" | "mobile-legends" | null;

const games = [
  {
    name: "Free Fire",
    image: "/ff.avif",
    key: "free-fire" as ActiveGame,
    desc: "Diamond & Item",
    accent: "from-red-100 to-orange-100 border-red-400",
  },
  {
    name: "Mobile Legends",
    image: "/ml.webp",
    key: "mobile-legends" as ActiveGame,
    desc: "Diamond & Pass",
    accent: "from-blue-100 to-sky-100 border-blue-400",
  },
];

type GameCardProps = {
  game: (typeof games)[0];
  isActive: boolean;
  onSelect: () => void;
  index: number;
  interactive?: boolean;
};

function GameCard({ game, isActive, onSelect, index, interactive = true }: GameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.6, y: 6 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(2)" }
      );
    }
  }, [isActive]);

  const handleMouseEnter = () => {
    if (!interactive || isActive) return;
    gsap.to(cardRef.current, { y: -10, scale: 1.05, duration: 0.25, ease: "power2.out" });
    gsap.to(imgRef.current, { scale: 1.1, duration: 0.35, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!interactive || isActive) return;
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
    gsap.to(imgRef.current, { scale: 1, duration: 0.35, ease: "power2.out" });
  };

  const handleClick = () => {
    if (interactive) {
      gsap
        .timeline()
        .to(cardRef.current, { scale: 0.92, duration: 0.1, ease: "power2.in" })
        .to(cardRef.current, { scale: 1.07, duration: 0.22, ease: "back.out(2.5)" })
        .to(cardRef.current, { scale: 1, duration: 0.15, ease: "power2.out" });
    }
    onSelect();
  };

  return (
    <div
      className={`animate-in fade-in slide-in-from-bottom-5 fill-mode-both duration-300 cursor-pointer ${
        index === 1 ? "delay-100" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        ref={cardRef}
        className={`relative overflow-hidden border-2 ${
          isActive
            ? `bg-gradient-to-br shadow-lg ${game.accent}`
            : "border-blue-200 bg-white"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="relative h-36 w-36 overflow-hidden sm:h-40 sm:w-40 md:h-48 md:w-48">
          <div ref={imgRef} className="absolute inset-0" style={{ willChange: "transform" }}>
            <Image src={game.image} alt={game.name} fill className="object-cover" />
          </div>
        </div>

        {isActive && (
          <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center bg-white shadow-md">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
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
        <p className="text-base font-bold text-slate-900">{game.name}</p>
        <p className="mt-0.5 text-sm text-slate-400">{game.desc}</p>
      </div>

      {isActive && (
        <div ref={badgeRef} className="mt-1.5 flex justify-center">
          <span className="inline-flex items-center gap-1 bg-yellow-100 px-2.5 py-0.5 text-[10px] font-bold text-yellow-700">
            ✓ Dipilih
          </span>
        </div>
      )}
    </div>
  );
}

type GameProps = {
  activeGame: ActiveGame;
  onGameSelect: (game: ActiveGame) => void;
};

export function Game({ activeGame, onGameSelect }: GameProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:px-12 lg:px-16">
      <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-400">
        <div className="mb-4 inline-flex items-center gap-2 border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          <span className="h-1.5 w-1.5 bg-yellow-400" />
          Pilih Game
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Game Pilihan
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-500">
          Top up game favoritmu dengan proses instan dan harga terbaik.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 md:justify-start">
        {games.map((game, index) => (
          <GameCard
            key={game.name}
            game={game}
            isActive={activeGame === game.key}
            onSelect={() => onGameSelect(game.key)}
            index={index}
            interactive={false}
          />
        ))}
      </div>
    </section>
  );
}
