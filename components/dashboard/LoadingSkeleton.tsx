function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.04] animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Loading dashboard…">
      {/* Hero */}
      <SkeletonBox className="col-span-full lg:col-span-2 h-[180px]" />
      {/* Stats */}
      <SkeletonBox className="h-[180px]" />
      {/* Courses */}
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonBox key={i} className="h-[160px]" />
      ))}
      {/* Activity */}
      <SkeletonBox className="col-span-full lg:col-span-2 h-[180px]" />
    </div>
  );
}
