"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, progressVariants } from "@/lib/variants";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { Course } from "@/types";

const GRADIENT_MAP: Record<number, string> = {
  0: "from-violet-600/15 to-violet-500/5",
  1: "from-cyan-600/15 to-cyan-500/5",
  2: "from-emerald-600/15 to-emerald-500/5",
  3: "from-amber-600/15 to-amber-500/5",
};

const ICON_COLOR_MAP: Record<number, string> = {
  0: "text-violet-400 bg-violet-500/10",
  1: "text-cyan-400 bg-cyan-500/10",
  2: "text-emerald-400 bg-emerald-500/10",
  3: "text-amber-400 bg-amber-500/10",
};

const BAR_COLOR_MAP: Record<number, string> = {
  0: "bg-gradient-to-r from-violet-500 to-indigo-400",
  1: "bg-gradient-to-r from-cyan-500 to-teal-400",
  2: "bg-gradient-to-r from-emerald-500 to-green-400",
  3: "bg-gradient-to-r from-amber-500 to-yellow-400",
};

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const colorIdx = index % 4;

  return (
    <motion.article
      custom={index + 2}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${GRADIENT_MAP[colorIdx]} border border-white/[0.07] p-5 flex flex-col gap-4 backdrop-blur-sm group cursor-default`}
      aria-label={`Course: ${course.title}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.015] pointer-events-none rounded-2xl" />

      <header className="flex items-start justify-between gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${ICON_COLOR_MAP[colorIdx]}`}>
          <DynamicIcon name={course.icon_name} size={20} />
        </div>
        <span className="text-xs font-semibold text-white/30 bg-white/5 border border-white/[0.06] rounded-lg px-2 py-1 shrink-0">
          {course.progress}%
        </span>
      </header>

      <h2 className="text-sm font-semibold text-white/90 leading-snug">{course.title}</h2>

      <footer className="mt-auto space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-white/30">
          <span>Progress</span>
          <span>{course.progress >= 80 ? "Almost done!" : course.progress >= 50 ? "Halfway there" : "Just started"}</span>
        </div>
        {/* Track */}
        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            custom={course.progress}
            variants={progressVariants}
            initial="hidden"
            animate="visible"
            className={`h-full rounded-full ${BAR_COLOR_MAP[colorIdx]}`}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </footer>
    </motion.article>
  );
}
