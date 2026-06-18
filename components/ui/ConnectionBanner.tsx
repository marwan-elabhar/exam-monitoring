"use client";

import { useAppSelector } from "@/hooks/redux";
import { selectConnectionStatus, selectError } from "@/store/selectors";
import { cn } from "@/lib/utils";

const BANNER_STYLES = {
  connecting:  "bg-[rgba(24,144,255,0.12)] border-status-reconnecting text-status-reconnecting",
  reconnecting:"bg-[rgba(255,184,48,0.12)] border-action-warning text-action-warning",
  failed:      "bg-[rgba(255,107,107,0.12)] border-action-danger text-action-danger",
  connected:   null, // no banner when healthy
};

const SPINNER_STATUSES = new Set(["connecting", "reconnecting"]);

export function ConnectionBanner() {
  const status = useAppSelector(selectConnectionStatus);
  const error = useAppSelector(selectError);

  // Only render when not connected
  if (status === "connected" || !error) return null;

  const styles = BANNER_STYLES[status];
  if (!styles) return null;

  const showSpinner = SPINNER_STATUSES.has(status);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "flex items-center gap-2 px-6 py-2.5 border-b text-sm font-medium",
        styles
      )}
    >
      {showSpinner && (
        <svg
          aria-hidden="true"
          className="w-4 h-4 shrink-0 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            d="M12 2a10 10 0 0 1 10 10"
            opacity="0.3"
          />
          <path
            strokeLinecap="round"
            d="M12 2a10 10 0 0 1 10 10"
          />
        </svg>
      )}

      {status === "failed" && (
        <svg
          aria-hidden="true"
          className="w-4 h-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )}

      <span>{error}</span>
    </div>
  );
}
