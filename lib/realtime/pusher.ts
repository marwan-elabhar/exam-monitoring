import Pusher from "pusher-js";

// Pusher is instantiated once and reused across the app.
let pusherInstance: Pusher | null = null;

export function getPusherClient(): Pusher {
    if (pusherInstance) return pusherInstance;

    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
        throw new Error(
            "NEXT_PUBLIC_PUSHER_KEY is not defined. Add it to your .env.local file."
        );
    }

    pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu",
        activityTimeout: 30000,
        pongTimeout: 10000,
    });

    return pusherInstance;
}

export function disconnectPusher() {
    pusherInstance?.disconnect();
    pusherInstance = null;
}
