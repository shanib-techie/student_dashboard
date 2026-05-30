/**
 * loading.tsx — automatically shown by Next.js App Router
 * while the async Server Component (page.tsx) is streaming.
 *
 * Uses the same grid layout as the dashboard so there's
 * no layout shift when content arrives.
 */
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

export default function DashboardLoading() {
  return <LoadingSkeleton />;
}
