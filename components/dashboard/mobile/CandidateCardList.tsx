"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Candidate } from "@/types";
import { CandidateCard } from "@/components/dashboard/mobile/CandidateCard";
import { CardSkeleton } from "@/components/ui/Skeleton";

const CARD_HEIGHT = 130; // estimated closed card height in px
const CARD_GAP = 12;     // gap-3 = 12px between cards
const SKELETON_COUNT = 8;

interface CandidateCardListProps {
  candidates: Candidate[];
  isLoading: boolean;
  onViewDetails: (candidate: Candidate) => void;
  onSendWarning: (candidate: Candidate) => void;
  onTerminate: (candidate: Candidate) => void;
}

export function CandidateCardList({
  candidates,
  isLoading,
  onViewDetails,
  onSendWarning,
  onTerminate,
}: CandidateCardListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: candidates.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => CARD_HEIGHT + CARD_GAP,
    overscan: 3,
    // Measure actual rendered size so the virtualizer self-corrects
    // as cards with longer names or open menus take more space
    measureElement: (el) => el.getBoundingClientRect().height + CARD_GAP,
  });

  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading candidates"
        className="flex flex-col gap-3 p-4"
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      role="list"
      aria-label={`${candidates.length} candidate sessions`}
      className="flex-1 min-h-0 overflow-y-auto px-4 py-4"
    >
      <div
        style={{ height: virtualizer.getTotalSize(), position: "relative" }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const candidate = candidates[virtualRow.index];
          return (
            <div
              key={candidate.id}
              role="listitem"
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${virtualRow.start}px)`,
                paddingBottom: CARD_GAP,
              }}
            >
              <CandidateCard
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
  );
}
