import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center py-24 px-6 text-center",
        className
      )}
    >
      {/* Icon — simple search/empty illustration */}
      <div
        aria-hidden="true"
        className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center mb-4"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-secondary"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <p className="text-base font-medium text-primary">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-secondary">{description}</p>
      )}
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  className?: string;
}

export function ErrorState({ message, className }: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex flex-col items-center justify-center py-24 px-6 text-center",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="w-12 h-12 rounded-full bg-[rgba(255,107,107,0.10)] flex items-center justify-center mb-4"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-action-danger"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-base font-medium text-primary">
        Something went wrong
      </p>
      <p className="mt-1 text-sm text-secondary">{message}</p>
    </div>
  );
}
