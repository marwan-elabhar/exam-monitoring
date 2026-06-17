import {RiskLevel, SessionStatus} from "@/types";
import {cn} from "@/lib/utils";

// Risk Badge

const RISK_STYLES: Record<RiskLevel, string> = {
    high: "bg-[rgba(255,107,107,0.20)] text-risk-high",
    medium: "bg-[rgba(255,184,48,0.20)] text-risk-medium",
    low: "bg-[rgba(82,196,26,0.20)] text-risk-low",
};

const RISK_LABELS: Record<RiskLevel, string> = {
    high: "High",
    medium: "Medium",
    low: "Low",
};

interface RiskBadgeProps {
    level: RiskLevel;
    className?: string;
}

export function RiskBadge({level, className}: RiskBadgeProps) {
    return (
        <span
            role="status"
            aria-label={`Risk level: ${RISK_LABELS[level]}`}
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide select-none",
                RISK_STYLES[level],
                className
            )}
        >
      {RISK_LABELS[level]}
    </span>
    );
}

// Status Badge

const STATUS_DOT: Record<SessionStatus, string> = {
    active: "bg-status-active",
    idle: "bg-status-idle",
    reconnecting: "bg-status-reconnecting",
    terminated: "bg-status-terminated",
    completed: "bg-status-completed",
};

const STATUS_LABELS: Record<SessionStatus, string> = {
    active: "Active",
    idle: "Idle",
    reconnecting: "Reconnecting",
    terminated: "Terminated",
    completed: "Completed",
};

interface StatusBadgeProps {
    status: SessionStatus;
    className?: string;
}

export function StatusBadge({status, className}: StatusBadgeProps) {
    return (
        <span
            role="status"
            aria-label={`Status: ${STATUS_LABELS[status]}`}
            className={cn("inline-flex items-center gap-1.5 select-none", className)}
        >
      <span
          aria-hidden="true"
          className={cn(
              "w-2 h-2 rounded-full shrink-0",
              STATUS_DOT[status],
              status === "reconnecting" && "animate-pulse"
          )}
      />
      <span className="text-sm text-secondary">{STATUS_LABELS[status]}</span>
    </span>
    );
}
