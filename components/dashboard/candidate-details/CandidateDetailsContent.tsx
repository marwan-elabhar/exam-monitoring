"use client"
import {useAppDispatch} from "@/hooks/redux";
import {useState, useEffect} from "react";
import {Candidate, CandidateActivity} from "@/types";
import {RiskBadge, StatusBadge} from "@/components/dashboard/Badge";
import {ActivityTimeline} from "@/components/dashboard/ActivityTimeline"
import {ActionButton} from "@/components/ui/Button";
import {formatRelativeTime} from "@/lib/utils";
import {initCandidateActivity, addWarningEvent} from "@/store/slices/activitySlice";


const WARNING_MESSAGES = [
    "Please keep your eyes on the screen.",
    "Suspicious activity detected. Please comply with exam rules.",
    "You are being monitored. Any violations will be reported.",
];


interface ContentProps {
    candidate: Candidate;
    activity: CandidateActivity[];
}


export default function CandidateDetailContent({candidate, activity}: ContentProps) {
    const dispatch = useAppDispatch();
    const [warningIndex, setWarningIndex] = useState(0);
    const [warnSent, setWarnSent] = useState(false);

    useEffect(() => {
        dispatch(initCandidateActivity(candidate.id));
    }, [candidate.id, dispatch]);

    // Clear the "Warning sent" confirmation after 2s, cleanup prevents
    // setState firing on an unmounted component if the panel closes first
    useEffect(() => {
        if (!warnSent) return;
        const timer = setTimeout(() => setWarnSent(false), 2000);
        return () => clearTimeout(timer);
    }, [warnSent]);

    function handleSendWarning() {
        const note = WARNING_MESSAGES[warningIndex % WARNING_MESSAGES.length];
        dispatch(addWarningEvent({candidateId: candidate.id, note}));
        setWarningIndex((i) => i + 1);
        setWarnSent(true);
    }

    const isEnded =
        candidate.status === "terminated" || candidate.status === "completed";

    return (
        <div className="flex flex-col h-full">

            {/* Candidate summary */}
            <section
                aria-label="Candidate summary"
                className="px-5 py-4 border-b border-border space-y-3 shrink-0"
            >
                <div className="flex items-center gap-2 flex-wrap">
                    <RiskBadge level={candidate.riskLevel}/>
                    <StatusBadge status={candidate.status}/>
                </div>

                <dl className="space-y-1">
                    <div className="flex items-center gap-2">
                        <dt className="text-xs text-secondary w-24 shrink-0">Email</dt>
                        <dd className="text-sm text-primary truncate">{candidate.email}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                        <dt className="text-xs text-secondary w-24 shrink-0">Last active</dt>
                        <dd className="text-sm text-primary">
                            <time
                                dateTime={candidate.lastActiveAt}
                                title={new Date(candidate.lastActiveAt).toLocaleString()}
                            >
                                {formatRelativeTime(candidate.lastActiveAt)}
                            </time>
                        </dd>
                    </div>
                </dl>
            </section>

            {/* Activity timeline */}
            <section
                aria-label="Activity timeline"
                aria-live="polite"
                aria-atomic="false"
                className="flex-1 min-h-0 overflow-y-auto"
            >
                <h3 className="px-5 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                    Activity
                </h3>
                <ActivityTimeline events={activity}/>
            </section>

            {/* Send Warning */}
            <div className="shrink-0 px-5 py-4 border-t border-border">
                <ActionButton
                    variant="warning"
                    disabled={isEnded}
                    onClick={handleSendWarning}
                    className="w-full justify-center py-2.5 text-sm"
                >
                    {warnSent ? "Warning sent" : "Send Warning"}
                </ActionButton>
                {isEnded && (
                    <p className="mt-2 text-xs text-secondary text-center">
                        Session has ended — no actions available.
                    </p>
                )}
            </div>

        </div>
    );
}
