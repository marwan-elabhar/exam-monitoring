import Pusher from "pusher";
import {NextRequest, NextResponse} from "next/server";
import {RealtimeEvent} from "@/types";


const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu",
    useTLS: true,
});

export async function POST(request: NextRequest) {
    let event: RealtimeEvent;

    try {
        event = await request.json();
    } catch {
        return NextResponse.json(
            {error: "Invalid JSON body"},
            {status: 400}
        );
    }

    // Validate required fields before forwarding to Pusher
    if (!event.type || !event.candidateId || !event.timestamp) {
        return NextResponse.json(
            {error: "Missing required fields: type, candidateId, timestamp"},
            {status: 422}
        );
    }

    try {
        await pusher.trigger("exam-monitoring", "candidate-event", event);
        return NextResponse.json({ok: true});
    } catch (err) {
        console.error("[Pusher trigger] Failed to send event:", err);
        return NextResponse.json(
            {error: "Failed to trigger event"},
            {status: 502}
        );
    }
}
