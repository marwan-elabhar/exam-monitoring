"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectPendingTerminateCandidate } from "@/store/selectors";
import { setPendingTerminate } from "@/store/slices/uiSlice";
import { terminateSession } from "@/store/slices/candidatesSlice";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

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
    <ConfirmModal
      open={!!candidate}
      title="Terminate session"
      message={
        candidate
          ? `This will immediately end ${candidate.name}'s exam session. This action cannot be undone.`
          : ""
      }
      confirmLabel="Terminate"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
