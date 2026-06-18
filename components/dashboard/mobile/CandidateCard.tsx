"use client";

import { memo } from "react";
import { Candidate } from "@/types";
import { RiskBadge, StatusBadge } from "@/components/dashboard/Badge";
import { ActionButton } from "@/components/ui/Button";
import { formatRelativeTime } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  onViewDetails: (candidate: Candidate) => void;
  // Opens the shared action sheet at the list level — avoids one portal per card
  onOpenActions: (candidate: Candidate) => void;
}

export function CandidateCardComponent({
  candidate,
  onViewDetails,
  onOpenActions,
}: CandidateCardProps) {
  return (
    <article
      aria-label={`Candidate ${candidate.name}, ${candidate.riskLevel} risk, ${candidate.status}`}
      className="rounded-lg bg-card border border-border flex flex-col"
    >
      {/* Top — Risk + Name + Status */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <RiskBadge level={candidate.riskLevel} />
          <span className="text-sm font-medium text-primary truncate">
            {candidate.name}
          </span>
        </div>
        <StatusBadge status={candidate.status} />
      </div>

      {/* Last active */}
      <div className="px-3 pb-3">
        <span className="text-xs text-secondary">
          Last active: {formatRelativeTime(candidate.lastActiveAt)}
        </span>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-3 px-3 py-3 border-t border-border">
        <ActionButton
          variant="primary"
          className="flex-1"
          aria-label={`View details for ${candidate.name}`}
          onClick={() => onViewDetails(candidate)}
        >
          View Details
        </ActionButton>

        <button
          type="button"
          aria-label={`More actions for ${candidate.name}`}
          aria-haspopup="dialog"
          onClick={() => onOpenActions(candidate)}
          className="w-10 h-10 flex items-center justify-center rounded border border-border text-secondary hover:text-primary hover:border-[rgba(255,255,255,0.2)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export const CandidateCard = memo(CandidateCardComponent);
