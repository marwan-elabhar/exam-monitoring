"use client";

import {useRef, useCallback} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";
import {Candidate} from "@/types";
import {CandidateCard} from "@/components/dashboard/mobile/CandidateCard";
import {CardSkeleton} from "@/components/ui/Skeleton";
import {useCardActionSheet} from "@/components/dashboard/mobile/useCardActionSheet";


const CARD_HEIGHT = 128;
const CARD_GAP = 12;
const ITEM_SIZE = CARD_HEIGHT + CARD_GAP;
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


    const {openActions, actionSheet} = useCardActionSheet({
        onViewDetails,
        onSendWarning,
        onTerminate,
    });

    const virtualizer = useVirtualizer({
        count: candidates.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => ITEM_SIZE,
        overscan: 3,
    });


    const measureRef = useCallback(
        (el: Element | null) => {
            if (el) virtualizer.measureElement(el);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    if (isLoading) {
        return (
            <div aria-busy="true" aria-label="Loading candidates" className="flex flex-col gap-3 p-4">
                {Array.from({length: SKELETON_COUNT}).map((_, i) => (
                    <CardSkeleton key={i}/>
                ))}
            </div>
        );
    }

    return (
        <>
            <div
                ref={scrollRef}
                role="list"
                aria-label={`${candidates.length} candidate sessions`}
                className="flex-1 min-h-0 overflow-y-auto px-4 py-4 will-change-scroll"
            >
                <div style={{height: virtualizer.getTotalSize(), position: "relative"}}>
                    {virtualizer.getVirtualItems().map((virtualRow) => {
                        const candidate = candidates[virtualRow.index];
                        return (
                            <div
                                key={candidate.id}
                                role="listitem"
                                data-index={virtualRow.index}
                                ref={measureRef}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: CARD_HEIGHT,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                <CandidateCard
                                    candidate={candidate}
                                    onViewDetails={onViewDetails}
                                    onOpenActions={openActions}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {actionSheet}
        </>
    );
}
