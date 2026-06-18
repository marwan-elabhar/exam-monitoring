"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/useIsClient";

interface SlideoutPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  // "right"  — full-height side panel (default, used for candidate detail)
  // "bottom" — action sheet that slides up from the bottom (used for mobile actions)
  position?: "right" | "bottom";
}

export function SlideoutPanel({
  open,
  onClose,
  title,
  children,
  position = "right",
}: SlideoutPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "fixed z-50 flex flex-col bg-header border-border",
          "transition-transform duration-300 ease-out",
          position === "right" && "top-0 right-0 h-full w-full md:w-[420px] border-l",
          position === "right" && (open ? "translate-x-0" : "translate-x-full"),
          position === "bottom" && "bottom-0 left-0 right-0 w-full rounded-t-2xl border-t",
          position === "bottom" && (open ? "translate-y-0" : "translate-y-full"),
        )}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          {position === "bottom" && (
            <div
              aria-hidden="true"
              className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border"
            />
          )}
          <h2 className="text-base font-semibold text-primary">{title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close panel"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded text-secondary hover:text-primary hover:bg-[rgba(255,255,255,0.06)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </div>
      </aside>
    </>,
    document.body
  );
}
