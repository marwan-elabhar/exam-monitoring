"use client";

import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {selectPendingTerminateCandidate} from "@/store/selectors";
import {setPendingTerminate} from "@/store/slices/uiSlice";
import {terminateSession} from "@/store/slices/candidatesSlice";
import {Modal} from "@/components/ui/Modal";

export function TerminateModal() {
    const dispatch = useAppDispatch();
    const candidate = useAppSelector(selectPendingTerminateCandidate);

    function handleConfirm() {
        if (!candidate) return;
        dispatch(terminateSession(candidate.id));
        dispatch(setPendingTerminate(null));
    }

    function handleCancel() {
        dispatch(setPendingTerminate(null));
    }

    return (
        <Modal
            open={!!candidate}
            title="Terminate session"
            confirmLabel="Terminate"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <p className="text-sm text-secondary leading-relaxed">
                This will immediately end{" "}
                <span className="text-primary font-medium">{candidate?.name}</span>
                &#39;s exam session. This action cannot be undone.
            </p>
        </Modal>
    );
}
