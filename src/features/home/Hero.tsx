"use client";

import { motion } from "motion/react";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";

type HeroSectionOneProps = {
  onTopUpClick: () => void;
  onContactClick: () => void;
};

export default function HeroSectionOne({
  onTopUpClick,
  onContactClick,
}: HeroSectionOneProps) {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 py-10 md:px-8 md:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Content */}
        <div className="order-1 flex flex-col items-center lg:items-start">
          <motion.h1
            initial={{
              opacity: 0,
              filter: "blur(4px)",
              y: 10,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              max-w-[650px]
              text-center
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-slate-900
              md:text-5xl
              lg:max-w-none
              lg:text-left
            "
          >
            Top Up Game Cepat, Mudah dan Tepercaya.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.5,
            }}
            className="
              mx-auto
              mt-6
              max-w-xl
              text-center
              text-base
              leading-relaxed
              text-slate-600
              lg:mx-0
              lg:text-left
            "
          >
            Diamond Mobile Legends, Free Fire dan berbagai kebutuhan gaming
            lainnya dengan proses instan, aman, dan harga terbaik.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.7,
            }}
            className="
              mt-8
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
              sm:justify-center
              lg:justify-start
            "
          >
            <button
              onClick={onTopUpClick}
              className="
                min-w-[180px]
                rounded-xl
                bg-black
                px-6
                py-3
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-slate-800
              "
            >
              Top Up Sekarang
            </button>

            <button
              onClick={onContactClick}
              className="
                min-w-[180px]
                rounded-xl
                border
                border-slate-300
                bg-white
                px-6
                py-3
                font-medium
                text-slate-800
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-slate-400
                hover:bg-slate-50
              "
            >
              Kontak Kami
            </button>
          </motion.div>
        </div>

        {/* Particle Typography */}
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.9,
          }}
          className="
            order-2
            flex
            justify-center
            lg:justify-end
          "
        >
          <div
            className="
              h-[140px]
              w-full
              max-w-[320px]

              sm:h-[180px]
              sm:max-w-[420px]

              md:h-[220px]
              md:max-w-[500px]

              lg:h-[320px]
              lg:max-w-[550px]

              overflow-hidden
            "
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
