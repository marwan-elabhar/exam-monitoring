"use client";

import {useEffect, useCallback} from "react";
import {useAppDispatch} from "@/hooks/redux";
import {applyRealtimeEvent} from "@/store/slices/candidatesSlice";
import {setConnectionStatus, setError} from "@/store/slices/uiSlice";
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

    const handleEvent = useCallback(
        (event: RealtimeEvent) => {
            dispatch(applyRealtimeEvent(event));
        },
        [dispatch]
    );

    useEffect(() => {
        let pusher: ReturnType<typeof getPusherClient>;

        try {
            pusher = getPusherClient();
        } catch {
            // NEXT_PUBLIC_PUSHER_KEY not set. Start mock emitter which POSTs
            // to /api/pusher/trigger. Events still flow through Pusher.
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

        // "unavailable" fires when Pusher cannot connect after multiple attempts.
        // Pusher will keep retrying automatically.
        pusher.connection.bind("unavailable", () => {
            dispatch(setConnectionStatus("reconnecting"));
            dispatch(setError(CONNECTION_MESSAGES["unavailable"]));
        });

        // "failed" fires when the browser does not support WebSockets at all.
        pusher.connection.bind("failed", () => {
            dispatch(setConnectionStatus("failed"));
            dispatch(setError(CONNECTION_MESSAGES["failed"]));
        });

        // "disconnected" fires on clean disconnect or unexpected drop.
        // Pusher auto-reconnects unless you called .disconnect() explicitly.
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

        // Cleanup

        return () => {
            channel.unbind_all();
            pusher.unsubscribe(CHANNEL_NAME);
            disconnectPusher();
        };
    }, [dispatch, handleEvent]);
}
