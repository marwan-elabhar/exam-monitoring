import { Candidate } from "@/types";
import { ActionButton } from "@/components/ui/Button";

interface ActionsCellProps {
  candidate: Candidate;
  onViewDetails: (candidate: Candidate) => void;
  onSendWarning: (candidate: Candidate) => void;
  onTerminate: (candidate: Candidate) => void;
}

const isEnded = (candidate: Candidate) =>
  candidate.status === "terminated" || candidate.status === "completed";

export function ActionsCell({
  candidate,
  onViewDetails,
  onSendWarning,
  onTerminate,
}: ActionsCellProps) {
  return (
    <div className="flex-1 flex items-center justify-end gap-2">
      <ActionButton
        variant="primary"
        aria-label={`View details for ${candidate.name}`}
        onClick={() => onViewDetails(candidate)}
      >
        View Details
      </ActionButton>

      <ActionButton
        variant="warning"
        aria-label={`Send warning to ${candidate.name}`}
        onClick={() => onSendWarning(candidate)}
      >
        Send Warning
      </ActionButton>

      <ActionButton
        variant="danger"
        aria-label={`Terminate session for ${candidate.name}`}
        disabled={isEnded(candidate)}
        onClick={() => onTerminate(candidate)}
      >
        Terminate
      </ActionButton>
    </div>
  );
}
