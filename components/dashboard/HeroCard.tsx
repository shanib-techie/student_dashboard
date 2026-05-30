"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import { fadeUpVariants } from "@/lib/variants";

interface HeroCardProps {
  streak: number;
  avgProgress: number;
}

export default function HeroCard({ streak, avgProgress }: HeroCardProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      custom={0}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="relative col-span-full lg:col-span-2 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-950/60 via-indigo-950/40 to-[#0d0d14] border border-white/[0.07] p-7 flex flex-col justify-between min-h-[180px] group cursor-default"
      aria-label="Welcome hero tile"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/[0.06] to-transparent pointer-events-none" />

      {/* Floating orb */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-violet-600/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-12 w-24 h-24 rounded-full bg-indigo-500/8 blur-xl pointer-events-none" />

      <header>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-violet-400" />
          <span className="text-xs text-violet-400/80 font-medium tracking-widest uppercase">
            {greeting}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight font-display">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            Student
          </span>
        </h1>
        <p className="mt-1.5 text-sm text-white/40 max-w-xs">
          You're making great progress. Keep the momentum going!
        </p>
      </header>

      <footer className="flex items-center gap-5 mt-6">
        <div className="flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl px-3.5 py-2">
          <Flame size={16} className="text-orange-400" />
          <div>
            <p className="text-xs text-white/40 leading-none">Streak</p>
            <p className="text-base font-bold text-orange-300 leading-tight">{streak} days</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3.5 py-2">
          <div className="w-4 h-4 rounded-full border-2 border-emerald-400 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-white/40 leading-none">Avg Progress</p>
            <p className="text-base font-bold text-emerald-300 leading-tight">{avgProgress}%</p>
          </div>
        </div>
      </footer>
    </motion.article>
  );
}
