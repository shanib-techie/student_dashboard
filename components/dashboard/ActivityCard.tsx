"use client";

import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/variants";
import { Activity } from "lucide-react";
import type { ActivityDay } from "@/types";

interface ActivityCardProps {
  data: ActivityDay[];
  index: number;
}

const INTENSITY_CLASS = [
  "bg-white/[0.04]",
  "bg-violet-600/30",
  "bg-violet-500/50",
  "bg-violet-400/70",
  "bg-violet-300/90",
];

export default function ActivityCard({ data, index }: ActivityCardProps) {
  // Show last 35 weeks × 7 days = 245 days (grid fits nicely)
  const last245 = data.slice(-245);
  // Group into weeks of 7
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < last245.length; i += 7) {
    weeks.push(last245.slice(i, i + 7));
  }

  const totalContributions = data.filter((d) => d.count > 0).length;

  return (
    <motion.article
      custom={index}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="relative col-span-full lg:col-span-2 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/60 to-[#0d0d14] border border-white/[0.07] p-6 group cursor-default"
      aria-label="Learning activity graph"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-violet-500/[0.03] pointer-events-none" />

      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-violet-400" />
          <h2 className="text-sm font-semibold text-white/80">Learning Activity</h2>
        </div>
        <span className="text-xs text-white/30">
          {totalContributions} active days this year
        </span>
      </header>

      {/* Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px] min-w-0">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (wi * 7 + di) * 0.002,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  title={`${day.date}: ${day.count} sessions`}
                  className={`w-2.5 h-2.5 rounded-[2px] ${INTENSITY_CLASS[day.count]} transition-colors`}
                  aria-label={`${day.date}: ${day.count} learning sessions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <footer className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-[11px] text-white/25">Less</span>
        {INTENSITY_CLASS.map((cls, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${cls}`} />
        ))}
        <span className="text-[11px] text-white/25">More</span>
      </footer>
    </motion.article>
  );
}
