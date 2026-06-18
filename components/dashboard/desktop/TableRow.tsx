import { memo } from "react";
import { Candidate } from "@/types";
import { RiskCell, NameCell, StatusCell, LastActiveCell, ActionsCell } from "@/components/dashboard/desktop/cells";

const ROW_HEIGHT = 56;

interface TableRowProps {
  candidate: Candidate;
  start: number;
  rowIndex: number;
  onViewDetails: (candidate: Candidate) => void;
  onSendWarning: (candidate: Candidate) => void;
  onTerminate: (candidate: Candidate) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, candidate: Candidate) => void;
}

export const TableRow = memo(
  function TableRow({
    candidate,
    start,
    rowIndex,
    onViewDetails,
    onSendWarning,
    onTerminate,
    onKeyDown,
  }: TableRowProps) {
    return (
      <div
        role="row"
        tabIndex={0}
        aria-rowindex={rowIndex + 1}
        aria-label={`${candidate.name}, ${candidate.riskLevel} risk, ${candidate.status}`}
        onKeyDown={(e) => onKeyDown(e, candidate)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: ROW_HEIGHT,
          transform: `translateY(${start}px)`,
        }}
        className="flex items-center px-6 gap-4 bg-card border-b border-border hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-100 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-action-primary"
      >
        <RiskCell level={candidate.riskLevel} />
        <NameCell name={candidate.name} />
        <StatusCell status={candidate.status} />
        <LastActiveCell isoString={candidate.lastActiveAt} />
        <ActionsCell
          candidate={candidate}
          onViewDetails={onViewDetails}
          onSendWarning={onSendWarning}
          onTerminate={onTerminate}
        />
      </div>
    );
  },
  (prev, next) =>
    prev.candidate.id === next.candidate.id &&
    prev.candidate.status === next.candidate.status &&
    prev.candidate.riskLevel === next.candidate.riskLevel &&
    prev.candidate.lastActiveAt === next.candidate.lastActiveAt &&
    prev.start === next.start &&
    prev.onViewDetails === next.onViewDetails &&
    prev.onSendWarning === next.onSendWarning &&
    prev.onTerminate === next.onTerminate &&
    prev.onKeyDown === next.onKeyDown
);
