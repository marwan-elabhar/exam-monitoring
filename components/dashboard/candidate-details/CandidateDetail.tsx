"use client";

import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {selectSelectedCandidate, selectCandidateActivity} from "@/store/selectors";
import {setSelectedCandidate} from "@/store/slices/uiSlice";
import {SlideoutPanel} from "@/components/ui/SlideoutPanel";
import CandidateDetailContent from "./CandidateDetailsContent";


export function CandidateDetail() {
    const dispatch = useAppDispatch();
    const candidate = useAppSelector(selectSelectedCandidate);
    const activity = useAppSelector(selectCandidateActivity);

    function handleClose() {
        dispatch(setSelectedCandidate(null));
    }

    return (
        <SlideoutPanel
            open={!!candidate}
            onClose={handleClose}
            title={candidate?.name ?? ""}
        >
            {candidate && (
                <CandidateDetailContent
                    key={candidate.id}
                    candidate={candidate}
                    activity={activity}
                />
            )}
        </SlideoutPanel>
    );
}
