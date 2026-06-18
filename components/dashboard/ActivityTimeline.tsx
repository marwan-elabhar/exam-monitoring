import { CandidateActivity, ActivityEventType } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const EVENT_DOT: Record<ActivityEventType, string> = {
  session_start:   "bg-status-active",
  status_change:   "bg-status-reconnecting",
  risk_change:     "bg-risk-medium",
  flag:            "bg-action-danger",
  connection_drop: "bg-action-warning",
  reconnect:       "bg-status-active",
  proctor_note:    "bg-action-warning",
};

const EVENT_LABEL: Record<ActivityEventType, string> = {
  session_start:   "Session",
  status_change:   "Status",
  risk_change:     "Risk",
  flag:            "Flag",
  connection_drop: "Connection",
  reconnect:       "Reconnect",
  proctor_note:    "Warning",
};

interface ActivityTimelineProps {
  events: CandidateActivity[];
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-secondary px-5 py-4">
        No activity recorded yet.
      </p>
    );
  }

  return (
    <ol
      aria-label="Candidate activity timeline"
      className="flex flex-col px-5 py-2"
    >
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        return (
          <li key={event.id} className="flex gap-3 relative">
            {/* Vertical line connecting dots — hidden on last item */}
            {!isLast && (
              <div
                aria-hidden="true"
                className="absolute left-[7px] top-[22px] bottom-0 w-px bg-border"
              />
            )}

            {/* Dot */}
            <div className="flex flex-col items-center shrink-0 mt-1">
              <span
                aria-hidden="true"
                className={cn(
                  "w-3.5 h-3.5 rounded-full border-2 border-header shrink-0",
                  EVENT_DOT[event.type]
                )}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col pb-5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
                  {EVENT_LABEL[event.type]}
                </span>
                <time
                  dateTime={event.timestamp}
                  title={new Date(event.timestamp).toLocaleString()}
                  className="text-xs text-secondary"
                >
                  {formatRelativeTime(event.timestamp)}
                </time>
              </div>
              <p className="text-sm text-primary mt-0.5">{event.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
