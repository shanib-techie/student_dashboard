import Sidebar from "@/components/dashboard/Sidebar";
import MobileNav from "@/components/dashboard/MobileNav";
import type { ReactNode } from "react";

/**
 * DashboardLayout — Server Component.
 *
 * Renders the persistent shell (sidebar + mobile nav) that wraps all
 * /dashboard/* routes. Children are streamed in via Next.js App Router.
 *
 * Sidebar and MobileNav are Client Components (they need useState/pathname),
 * but this layout itself has zero client JS.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main
          id="main-content"
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-24 md:pb-8"
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
