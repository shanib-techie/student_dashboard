/**
 * Dashboard Page — Server Component
 *
 * Data flow:
 *  1. getCourses() runs on the server via the service-role Supabase client.
 *  2. Derived stats are computed server-side (no client overhead).
 *  3. Pure presentational Client Components receive data as props.
 *  4. No secrets are ever sent to the browser.
 *
 * This page uses Next.js dynamic rendering (no `cache`/`revalidate` overrides)
 * so data is always fresh. Add `export const revalidate = 60` to ISR if needed.
 */

import { Suspense } from "react";
import { getCourses } from "@/lib/supabase";
import { generateActivityData, calculateStreak } from "@/lib/activity";
import BentoGrid from "@/components/dashboard/BentoGrid";
import HeroCard from "@/components/dashboard/HeroCard";
import CourseCard from "@/components/dashboard/CourseCard";
import ActivityCard from "@/components/dashboard/ActivityCard";
import StatsTile from "@/components/dashboard/StatsTile";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import ErrorUI from "@/components/dashboard/ErrorUI";

async function DashboardContent() {
  let courses;

  try {
    courses = await getCourses();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to connect to the database.";
    return <ErrorUI message={message} />;
  }

  const activityData = generateActivityData();
  const streak = calculateStreak(activityData);
  const avgProgress =
    courses.length > 0
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)
      : 0;
  const completed = courses.filter((c) => c.progress === 100).length;

  return (
    <BentoGrid>
      {/* Row 1: Hero (2/3) + Stats (1/3) */}
      <HeroCard streak={streak} avgProgress={avgProgress} />
      <StatsTile
        totalCourses={courses.length}
        avgProgress={avgProgress}
        completed={completed}
        index={1}
      />

      {/* Row 2+: Dynamic course cards */}
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i + 2} />
      ))}

      {/* Row last: Activity graph spanning 2 columns */}
      <ActivityCard data={activityData} index={courses.length + 3} />
    </BentoGrid>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
