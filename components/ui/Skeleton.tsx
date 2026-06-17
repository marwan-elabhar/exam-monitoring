import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded bg-[rgba(255,255,255,0.06)]",
        className
      )}
    />
  );
}

// Pre-composed table row skeleton — matches CandidatesTable column layout
export function TableRowSkeleton() {
  return (
    <div
      role="row"
      aria-hidden="true"
      className="flex items-center gap-4 px-6 h-14 border-b border-border"
    >
      <Skeleton className="w-16 h-5 flex-shrink-0" />
      <Skeleton className="w-40 h-4 flex-shrink-0" />
      <Skeleton className="w-24 h-4 flex-shrink-0" />
      <Skeleton className="w-20 h-4 flex-shrink-0" />
      <div className="ml-auto flex gap-2">
        <Skeleton className="w-20 h-7" />
        <Skeleton className="w-24 h-7" />
        <Skeleton className="w-20 h-7" />
      </div>
    </div>
  );
}

// Pre-composed mobile card skeleton — matches CandidateCard layout
export function CardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-lg bg-card border border-border p-3 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-14 h-5" />
          <Skeleton className="w-28 h-4" />
        </div>
        <Skeleton className="w-20 h-5" />
      </div>
      <Skeleton className="w-24 h-3" />
      <div className="flex gap-2 pt-1 border-t border-border">
        <Skeleton className="flex-1 h-8" />
        <Skeleton className="w-8 h-8" />
      </div>
    </div>
  );
}
