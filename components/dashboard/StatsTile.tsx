"use client";

import { motion } from "framer-motion";
import { BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";
import { fadeUpVariants } from "@/lib/variants";

interface StatsTileProps {
  totalCourses: number;
  avgProgress: number;
  completed: number;
  index: number;
}

export default function StatsTile({ totalCourses, avgProgress, completed, index }: StatsTileProps) {
  const stats = [
    { label: "Enrolled", value: totalCourses, icon: BookOpen, color: "text-violet-400 bg-violet-500/10" },
    { label: "Avg Progress", value: `${avgProgress}%`, icon: TrendingUp, color: "text-cyan-400 bg-cyan-500/10" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
  ];

  return (
    <motion.article
      custom={index}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/60 to-[#0d0d14] border border-white/[0.07] p-5 flex flex-col gap-4 group cursor-default"
      aria-label="Learning statistics"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.015] pointer-events-none" />
      <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest">Overview</h2>
      <div className="space-y-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon size={15} />
              </div>
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="text-xs text-white/40">{stat.label}</span>
                <span className="text-sm font-bold text-white/80">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}
