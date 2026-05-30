"use client";

import ErrorUI from "@/components/dashboard/ErrorUI";

/**
 * error.tsx — Next.js App Router error boundary.
 * Catches unexpected runtime errors in the dashboard subtree.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorUI
      message={error.message ?? "An unexpected error occurred."}
      reset={reset}
    />
  );
}
