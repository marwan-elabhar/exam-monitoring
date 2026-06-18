"use client";

import { useRef, useState, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Candidate } from "@/types";
import { CandidateCard } from "@/components/dashboard/mobile/CandidateCard";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { SlideoutPanel } from "@/components/ui/SlideoutPanel";
import { RiskBadge, StatusBadge } from "@/components/dashboard/Badge";
import { ActionButton } from "@/components/ui/Button";

const CARD_HEIGHT = 130;
const CARD_GAP = 12;
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

  // Single action sheet lifted out of individual cards — prevents one
  // SlideoutPanel per row (O(n) portals → one portal at the list level)
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);
  const handleOpenActions = useCallback((c: Candidate) => setActiveCandidate(c), []);

  const virtualizer = useVirtualizer({
    count: candidates.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => CARD_HEIGHT + CARD_GAP,
    overscan: 3,
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

  const isEnded =
    activeCandidate?.status === "terminated" ||
    activeCandidate?.status === "completed";

  return (
    <>
      <div
        ref={scrollRef}
        role="list"
        aria-label={`${candidates.length} candidate sessions`}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-4"
      >
        <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
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
                  onOpenActions={handleOpenActions}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Single shared action sheet — rendered once at list level via portal */}
      <SlideoutPanel
        position="bottom"
        open={!!activeCandidate}
        onClose={() => setActiveCandidate(null)}
        title={activeCandidate?.name ?? ""}
      >
        {activeCandidate && (
          <div className="flex flex-col gap-4 px-5 pt-4 pb-8">
            {/* Candidate context */}
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <RiskBadge level={activeCandidate.riskLevel} />
              <StatusBadge status={activeCandidate.status} />
            </div>

            <ActionButton
              variant="primary"
              className="w-full py-3.5 text-sm justify-center"
              onClick={() => {
                setActiveCandidate(null);
                onViewDetails(activeCandidate);
              }}
            >
              View Details
            </ActionButton>

            <ActionButton
              variant="warning"
              className="w-full py-3.5 text-sm justify-center"
              onClick={() => {
                setActiveCandidate(null);
                onSendWarning(activeCandidate);
              }}
            >
              Send Warning
            </ActionButton>

            <ActionButton
              variant="danger"
              disabled={isEnded}
              className="w-full py-3.5 text-sm justify-center"
              onClick={() => {
                setActiveCandidate(null);
                onTerminate(activeCandidate);
              }}
            >
              Terminate
            </ActionButton>

            {isEnded && (
              <p className="text-xs text-secondary text-center -mt-2">
                Session has ended — no actions available.
              </p>
            )}
          </div>
        )}
      </SlideoutPanel>
    </>
  );
}
