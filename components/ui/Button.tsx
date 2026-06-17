import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "warning" | "danger";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-action-primary text-white hover:bg-action-primary/90 focus-visible:ring-action-primary",
  warning: "border border-action-warning text-action-warning bg-[rgba(255,184,48,0.08)] hover:bg-[rgba(255,184,48,0.15)] focus-visible:ring-action-warning",
  danger:
    "border border-[rgba(255,107,107,0.30)] text-action-danger hover:border-action-danger hover:bg-[rgba(255,107,107,0.08)] focus-visible:ring-action-danger",
};

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

export function ActionButton({
  variant,
  className,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center px-3 py-1.5 rounded text-xs font-medium",
        "transition-colors duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-card",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
