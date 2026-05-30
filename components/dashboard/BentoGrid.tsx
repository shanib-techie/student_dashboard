import type { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * BentoGrid — Server Component.
 * Provides a responsive 1→2→3 column grid with consistent gap.
 * Children use col-span utilities to claim space within it.
 */
export default function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <section
      aria-label="Dashboard bento grid"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
    >
      {children}
    </section>
  );
}
