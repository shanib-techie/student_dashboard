import type { ActivityDay } from "@/types";

/**
 * Generates 52 weeks of mock contribution data for the activity graph.
 * Deterministic seed ensures consistent SSR/CSR output (no hydration mismatch).
 */
export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Pseudo-random but deterministic based on date string
    const seed = date.toISOString().slice(0, 10).replace(/-/g, "");
    const pseudo = (parseInt(seed, 10) % 17) / 16;

    // Weight toward recent activity
    const recencyBoost = i < 30 ? 0.3 : i < 90 ? 0.1 : 0;
    const raw = pseudo + recencyBoost;

    let count = 0;
    if (raw > 0.85) count = 4;
    else if (raw > 0.65) count = 3;
    else if (raw > 0.45) count = 2;
    else if (raw > 0.25) count = 1;

    days.push({ date: date.toISOString().slice(0, 10), count });
  }

  return days;
}

export function calculateStreak(activity: ActivityDay[]): number {
  let streak = 0;
  const reversed = [...activity].reverse();
  for (const day of reversed) {
    if (day.count > 0) streak++;
    else break;
  }
  return streak;
}
