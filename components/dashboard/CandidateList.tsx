"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { selectFilteredCandidates, selectIsLoading, selectError } from "@/store/selectors";
import { terminateSession } from "@/store/slices/candidatesSlice";
import { setSelectedCandidate } from "@/store/slices/uiSlice";
import { Candidate } from "@/types";
import { CandidatesTable } from "@/components/dashboard/desktop/CandidatesTable";
import { CandidateCardList } from "@/components/dashboard/mobile/CandidateCardList";
import { EmptyState, ErrorState } from "@/components/ui/EmptyState";
import { Filters } from "@/components/dashboard/Filters";
import Header from "@/components/dashboard/Header";

export function CandidateList() {
  const dispatch = useAppDispatch();
  const candidates = useAppSelector(selectFilteredCandidates);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const isMobile = useIsMobile();

  const handleViewDetails = useCallback(
    (candidate: Candidate) => dispatch(setSelectedCandidate(candidate.id)),
    [dispatch]
  );

  const handleSendWarning = useCallback(
    (candidate: Candidate) => dispatch(setSelectedCandidate(candidate.id)),
    [dispatch]
  );

  const handleTerminate = useCallback(
    (candidate: Candidate) => dispatch(terminateSession(candidate.id)),
    [dispatch]
  );

  if (error) return <ErrorState message={error} />;

  const sharedProps = {
    candidates,
    isLoading,
    onViewDetails: handleViewDetails,
    onSendWarning: handleSendWarning,
    onTerminate: handleTerminate,
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header />
      <Filters />
      {!isLoading && candidates.length === 0
        ? <EmptyState
            title="No sessions found"
            description="Try adjusting your search or filters."
          />
        : isMobile
          ? <CandidateCardList {...sharedProps} />
          : <CandidatesTable {...sharedProps} />
      }
    </div>
  );
}
