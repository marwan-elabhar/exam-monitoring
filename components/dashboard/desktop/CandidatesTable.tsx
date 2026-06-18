"use client";

import { useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Candidate } from "@/types";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import { TableHeader } from "@/components/dashboard/desktop/TableHeader";
import { TableRow } from "@/components/dashboard/desktop/TableRow";

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
    overscan: 5,
  });

  // Stable callback — does not recreate on re-render
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
      <TableHeader />

      {isLoading ? (
        <div aria-busy="true" aria-label="Loading candidates" className="flex flex-col">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          role="rowgroup"
          tabIndex={0}
          aria-label={`${candidates.length} candidate sessions`}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-inset"
        >
          <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
            {virtualizer.getVirtualItems().map((virtualRow) => (
              <TableRow
                key={candidates[virtualRow.index].id}
                candidate={candidates[virtualRow.index]}
                start={virtualRow.start}
                rowIndex={virtualRow.index}
                onViewDetails={onViewDetails}
                onSendWarning={onSendWarning}
                onTerminate={onTerminate}
                onKeyDown={handleKeyDown}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
