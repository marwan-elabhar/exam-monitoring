"use client";

import {useState, useCallback} from "react";
import {Candidate} from "@/types";
import {SlideoutPanel} from "@/components/ui/SlideoutPanel";
import {RiskBadge, StatusBadge} from "@/components/dashboard/Badge";
import {ActionButton} from "@/components/ui/Button";

interface CardActionSheetProps {
    onViewDetails: (candidate: Candidate) => void;
    onSendWarning: (candidate: Candidate) => void;
    onTerminate: (candidate: Candidate) => void;
}

// Returned from the hook. Keeps action sheet state fully isolated
// from the virtualizer list so opening/closing the sheet never triggers
// a list re-render or virtualizer recalculation
export function useCardActionSheet({
                                       onViewDetails,
                                       onSendWarning,
                                       onTerminate,
                                   }: CardActionSheetProps) {
    const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

    const openActions = useCallback((c: Candidate) => setActiveCandidate(c), []);
    const closeActions = useCallback(() => setActiveCandidate(null), []);

    const isEnded =
        activeCandidate?.status === "terminated" ||
        activeCandidate?.status === "completed";

    const actionSheet = (
        <SlideoutPanel
            position="bottom"
            open={!!activeCandidate}
            onClose={closeActions}
            title={activeCandidate?.name ?? ""}
        >
            {activeCandidate && (
                <div className="flex flex-col gap-4 px-5 pt-4 pb-8">
                    <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <RiskBadge level={activeCandidate.riskLevel}/>
                        <StatusBadge status={activeCandidate.status}/>
                    </div>

                    <ActionButton
                        variant="primary"
                        className="w-full py-3.5 text-sm justify-center"
                        onClick={() => {
                            closeActions();
                            onViewDetails(activeCandidate);
                        }}
                    >
                        View Details
                    </ActionButton>

                    <ActionButton
                        variant="warning"
                        className="w-full py-3.5 text-sm justify-center"
                        onClick={() => {
                            closeActions();
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
                            closeActions();
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
    );

    return {openActions, actionSheet};
}
