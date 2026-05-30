"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookMarked, Trophy, Settings } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookMarked, href: "/dashboard/courses" },
  { id: "achievements", label: "Trophies", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-around bg-[#0a0a0f]/90 backdrop-blur-xl border-t border-white/[0.06] px-2 pb-safe"
      aria-label="Mobile navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`relative flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              isActive ? "text-violet-400" : "text-white/35 hover:text-white/60"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-active"
                className="absolute top-1 inset-x-2 h-0.5 bg-violet-500 rounded-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
