import { redirect } from "next/navigation";

/**
 * Root page — immediately redirects to the dashboard.
 * This is a Server Component: no client JS sent for this redirect.
 */
export default function RootPage() {
  redirect("/dashboard");
}
