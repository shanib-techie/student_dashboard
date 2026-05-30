"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorUIProps {
  message?: string;
  reset?: () => void;
}

export default function ErrorUI({
  message = "Something went wrong loading the dashboard.",
  reset,
}: ErrorUIProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4 px-4"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <AlertTriangle size={24} className="text-red-400" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white/80 mb-1">Database Error</h2>
        <p className="text-sm text-white/40 max-w-sm">{message}</p>
      </div>
      {reset && (
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.08] text-sm text-white/60 hover:text-white/80 transition-colors"
        >
          <RefreshCcw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
