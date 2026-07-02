"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import HeroSectionOne from "@/features/home/Hero";
import { Game } from "@/features/home/Game";
import { Footer } from "@/components/Footer";

const FreeFire = dynamic(() => import("@/features/game/FF/FreeFire"));
const MobileLegends = dynamic(() => import("@/features/game/ML/MobileLegends"));

type ActiveGame = "free-fire" | "mobile-legends" | null;

export function Home() {
  const gameSectionRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

  const handleTopUpClick = () => {
    gameSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleContactClick = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGameSelect = (game: ActiveGame) => {
    setActiveGame(game);
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      <Header />
      <HeroSectionOne onTopUpClick={handleTopUpClick} onContactClick={handleContactClick} />
      <div ref={gameSectionRef}>
        <Game activeGame={activeGame} onGameSelect={handleGameSelect} />
      </div>
      {activeGame && (
        <div ref={paymentRef}>
          {activeGame === "free-fire" && <FreeFire />}
          {activeGame === "mobile-legends" && <MobileLegends />}
        </div>
      )}
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
