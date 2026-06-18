"use client";

import { useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Candidate } from "@/types";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import { RiskCell, NameCell, StatusCell, LastActiveCell, ActionsCell } from "@/components/dashboard/desktop/cells";
import { TableHeader } from "@/components/dashboard/desktop/TableHeader";

const ROW_HEIGHT = 56;
const SKELETON_COUNT = 8;

interface CandidatesTableProps {
  candidates: Candidate[];
  isLoading: boolean;
  onViewDetails: (candidate: Candidate) => void;
  onSendWarning: (candidate: Candidate) => void;
  onTerminate: (candidate: Candidate) => void;
}

export function CandidatesTable({
  candidates,
  isLoading,
  onViewDetails,
  onSendWarning,
  onTerminate,
}: CandidatesTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: candidates.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, candidate: Candidate) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onViewDetails(candidate);
      }
    },
    [onViewDetails]
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* Table header */}
      <TableHeader />

      {/* Loading state */}
      {isLoading ? (
        <div aria-busy="true" aria-label="Loading candidates" className="flex flex-col">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>
      ) : (
        /* Virtualized scroll container */
        <div
          ref={scrollRef}
          role="rowgroup"
          tabIndex={0}
          aria-label="Candidate sessions list"
          className="flex-1 overflow-y-auto overflow-x-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-inset"
        >
          <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const candidate = candidates[virtualRow.index];
              return (
                <div
                  key={candidate.id}
                  role="row"
                  tabIndex={0}
                  aria-label={`${candidate.name}, ${candidate.riskLevel} risk, ${candidate.status}`}
                  onKeyDown={(e) => handleKeyDown(e, candidate)}
                  style={{
                    position: "absolute",
                    top: virtualRow.start,
                    left: 0,
                    right: 0,
                    height: ROW_HEIGHT,
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
            })}
          </div>
        </div>
      )}
    </div>
  );
}
