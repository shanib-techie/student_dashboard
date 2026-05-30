import type { Variants } from "framer-motion";

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const cardHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const progressVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (pct: number) => ({
    scaleX: pct / 100,
    originX: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  }),
};

export const sidebarVariants: Variants = {
  expanded: { width: 240, transition: { type: "spring", stiffness: 280, damping: 28 } },
  collapsed: { width: 64, transition: { type: "spring", stiffness: 280, damping: 28 } },
};
