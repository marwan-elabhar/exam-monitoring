"use client";

import {useCallback} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {useIsMobile} from "@/hooks/useMediaQuery";
import {useRealtimeEvents} from "@/lib/realtime/useRealtimeEvents";
import {selectFilteredCandidates, selectIsLoading} from "@/store/selectors";
import {setSelectedCandidate, setPendingTerminate} from "@/store/slices/uiSlice";
import {Candidate} from "@/types";
import {CandidatesTable} from "@/components/dashboard/desktop/CandidatesTable";
import {CandidateCardList} from "@/components/dashboard/mobile/CandidateCardList";
import {EmptyState} from "@/components/ui/EmptyState";
import {ConnectionBanner} from "@/components/ui/ConnectionBanner";
import {Filters} from "@/components/dashboard/Filters";
import Header from "@/components/dashboard/Header";
import {CandidateDetail} from "@/components/dashboard/candidate-details/CandidateDetail";
import {TerminateModal} from "@/components/dashboard/TerminateModal";

export function CandidateList() {
    const dispatch = useAppDispatch();
    const candidates = useAppSelector(selectFilteredCandidates);
    const isLoading = useAppSelector(selectIsLoading);
    const isMobile = useIsMobile();

    // Mounts the Pusher connection. Falls back to mock emitter in dev
    // when NEXT_PUBLIC_PUSHER_KEY is not set
    useRealtimeEvents();

    const handleViewDetails = useCallback(
        (candidate: Candidate) => dispatch(setSelectedCandidate(candidate.id)),
        [dispatch]
    );

    const handleSendWarning = useCallback(
        (candidate: Candidate) => dispatch(setSelectedCandidate(candidate.id)),
        [dispatch]
    );

    const handleTerminate = useCallback(
        (candidate: Candidate) => dispatch(setPendingTerminate(candidate.id)),
        [dispatch]
    );

    const sharedProps = {
        candidates,
        isLoading,
        onViewDetails: handleViewDetails,
        onSendWarning: handleSendWarning,
        onTerminate: handleTerminate,
    };

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <Header/>
            <ConnectionBanner/>
            <Filters/>
            {!isLoading && candidates.length === 0
                ? <EmptyState
                    title="No sessions found"
                    description="Try adjusting your search or filters."
                />
                : isMobile
                    ? <CandidateCardList {...sharedProps} />
                    : <CandidatesTable {...sharedProps} />
            }
            <CandidateDetail/>
            <TerminateModal/>
        </div>
    );
}
