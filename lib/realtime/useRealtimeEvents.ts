"use client";

import {useEffect, useCallback, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {applyRealtimeEvent} from "@/store/slices/candidatesSlice";
import {addActivityEvent} from "@/store/slices/activitySlice";
import {setConnectionStatus, setError} from "@/store/slices/uiSlice";
import {selectSelectedCandidateId} from "@/store/selectors";
import {RealtimeEvent} from "@/types";
import {getPusherClient, disconnectPusher} from "@/lib/realtime/pusher";

const CHANNEL_NAME = "exam-monitoring";
const EVENT_NAME = "candidate-event";

const CONNECTION_MESSAGES: Record<string, string> = {
    connecting: "Connecting to live feed...",
    unavailable: "Live feed unavailable. Retrying...",
    failed: "Could not establish live connection. Please refresh.",
    disconnected: "Disconnected from live feed. Reconnecting...",
};

export function useRealtimeEvents() {
    const dispatch = useAppDispatch();
    const selectedCandidateId = useAppSelector(selectSelectedCandidateId);

    const selectedIdRef = useRef<string | null>(selectedCandidateId);
    useEffect(() => {
        selectedIdRef.current = selectedCandidateId;
    }, [selectedCandidateId]);

    const handleEvent = useCallback(
        (event: RealtimeEvent) => {
            dispatch(applyRealtimeEvent(event));
            if (selectedIdRef.current && event.candidateId === selectedIdRef.current) {
                dispatch(addActivityEvent(event));
            }
        },
        [dispatch]
    );

    useEffect(() => {
        let pusher: ReturnType<typeof getPusherClient>;

        try {
            pusher = getPusherClient();
        } catch {
            if (process.env.NODE_ENV === "development") {
                dispatch(setConnectionStatus("connected"));
                let cleanup: (() => void) | undefined;
                import("@/lib/realtime/mockEmitter").then(({startMockEmitter}) => {
                    cleanup = startMockEmitter();
                });
                return () => cleanup?.();
            }
            dispatch(setConnectionStatus("failed"));
            dispatch(setError("Realtime configuration is missing. Contact support."));
            return;
        }

        pusher.connection.bind("connecting", () => {
            dispatch(setConnectionStatus("connecting"));
            dispatch(setError(null));
        });
        pusher.connection.bind("connected", () => {
            dispatch(setConnectionStatus("connected"));
            dispatch(setError(null));
        });
        pusher.connection.bind("unavailable", () => {
            dispatch(setConnectionStatus("reconnecting"));
            dispatch(setError(CONNECTION_MESSAGES["unavailable"]));
        });
        pusher.connection.bind("failed", () => {
            dispatch(setConnectionStatus("failed"));
            dispatch(setError(CONNECTION_MESSAGES["failed"]));
        });
        pusher.connection.bind("disconnected", () => {
            dispatch(setConnectionStatus("reconnecting"));
            dispatch(setError(CONNECTION_MESSAGES["disconnected"]));
        });

        const channel = pusher.subscribe(CHANNEL_NAME);

        channel.bind("pusher:subscription_error", (status: number) => {
            dispatch(setConnectionStatus("failed"));
            dispatch(
                setError(
                    status === 403
                        ? "Access denied to live feed. Please log in again."
                        : "Failed to subscribe to live feed."
                )
            );
        });

        channel.bind(EVENT_NAME, (data: RealtimeEvent) => {
            handleEvent(data);
        });

        return () => {
            channel.unbind_all();
            pusher.unsubscribe(CHANNEL_NAME);
            disconnectPusher();
        };
    }, [dispatch, handleEvent]);
}
