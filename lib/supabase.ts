import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

// Server-side Supabase client — never exposes keys to the browser
function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export async function getCourses(): Promise<Course[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[Supabase] getCourses error:", error.message);
    throw new Error("Failed to load courses from the database.");
  }

  return data ?? [];
}
