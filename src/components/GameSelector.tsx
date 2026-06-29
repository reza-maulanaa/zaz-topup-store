"use client";

import Image from "next/image";
import Link from "next/link";

const games = [
  { slug: "free-fire", name: "Free Fire", image: "/ff.avif" },
  { slug: "mobile-legends", name: "Mobile Legends", image: "/ml.webp" },
];

export function GameSelector({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-[520px] mx-auto">
        <div className="flex flex-row overflow-x-auto gap-4 scrollbar-hide pb-1">
          {games.map((game) => {
            const isActive = activeSlug === game.slug;
            return (
              <Link
                key={game.slug}
                href={`/game/${game.slug}`}
                className="flex flex-col items-center gap-1 cursor-pointer shrink-0"
              >
                <div
                  className={`w-14 h-14 border-2 overflow-hidden ${
                    isActive
                      ? "border-red-500 ring-2 ring-red-200"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={game.image}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                    alt={game.name}
                  />
                </div>
                <span
                  className={`text-[11px] text-center w-14 truncate ${
                    isActive ? "text-red-500 font-semibold" : "text-gray-500"
                  }`}
                >
                  {game.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
