"use client";

import { useEffect, useRef } from "react";
import { ActionButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus the cancel button on open — safest default for a destructive modal
  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onCancel}
        className="fixed inset-0 z-50 bg-black/60"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-message"
        className={cn(
          "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-sm mx-auto",
          "bg-header border border-border rounded-lg shadow-xl",
          "flex flex-col p-6 gap-4"
        )}
      >
        <h2
          id="confirm-modal-title"
          className="text-base font-semibold text-primary"
        >
          {title}
        </h2>

        <p
          id="confirm-modal-message"
          className="text-sm text-secondary leading-relaxed"
        >
          {message}
        </p>

        <div className="flex gap-3 justify-end pt-1">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-secondary rounded-md border border-border hover:border-[rgba(255,255,255,0.2)] hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary"
          >
            Cancel
          </button>
          <ActionButton
            variant="danger"
            onClick={onConfirm}
            className="px-4 py-2 text-sm"
          >
            {confirmLabel}
          </ActionButton>
        </div>
      </div>
    </>
  );
}
