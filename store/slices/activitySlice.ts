import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CandidateActivity, ActivityEventType, RealtimeEvent} from "@/types";

interface ActivityState {
    // store activity for candidates that have been viewed
    byCandidate: Record<string, CandidateActivity[]>;
}

const initialState: ActivityState = {
    byCandidate: {},
};

function describeEvent(event: RealtimeEvent): string {
    switch (event.type) {
        case "status_change":
            return `Status changed to ${event.payload.status ?? "unknown"}`;
        case "risk_change":
            return `Risk level changed to ${event.payload.riskLevel ?? "unknown"}`;
        case "flag":
            return "Suspicious activity flagged";
        case "connection_drop":
            return "Connection dropped";
        case "reconnect":
            return "Reconnected to session";
        case "proctor_note":
            return event.payload.note
                ? `Warning sent: "${event.payload.note}"`
                : "Warning sent by proctor";
        default:
            return "Activity recorded";
    }
}

function makeId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function seedActivity(candidateId: string): CandidateActivity[] {
    const now = Date.now();
    const types: Array<{ type: ActivityEventType; description: string; offset: number }> = [
        {type: "session_start", description: "Session started", offset: 60},
        {type: "status_change", description: "Status changed to active", offset: 55},
        {type: "risk_change", description: "Risk level changed to medium", offset: 40},
        {type: "flag", description: "Suspicious activity flagged", offset: 25},
        {type: "connection_drop", description: "Connection dropped", offset: 15},
        {type: "reconnect", description: "Reconnected to session", offset: 14},
    ];

    return types.map(({type, description, offset}) => ({
        id: makeId(),
        candidateId,
        type,
        description,
        timestamp: new Date(now - offset * 60 * 1000).toISOString(),
    }));
}

const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        // Called when a candidate panel is opened
        initCandidateActivity(state, action: PayloadAction<string>) {
            const candidateId = action.payload;
            if (!state.byCandidate[candidateId]) {
                state.byCandidate[candidateId] = seedActivity(candidateId);
            }
        },

        // Called when a realtime event arrives and the panel is open
        addActivityEvent(state, action: PayloadAction<RealtimeEvent>) {
            const {candidateId} = action.payload;
            if (!state.byCandidate[candidateId]) return;

            const entry: CandidateActivity = {
                id: makeId(),
                candidateId,
                type: action.payload.type as ActivityEventType,
                description: describeEvent(action.payload),
                timestamp: action.payload.timestamp,
            };

            // new events are viewed first
            state.byCandidate[candidateId].unshift(entry);

            // Cap at 50 entries per candidate to avoid unbounded growth
            if (state.byCandidate[candidateId].length > 50) {
                state.byCandidate[candidateId].pop();
            }
        },

        // Called when proctor sends a warning from the panel
        addWarningEvent(
            state,
            action: PayloadAction<{ candidateId: string; note: string }>
        ) {
            const {candidateId, note} = action.payload;
            if (!state.byCandidate[candidateId]) return;

            state.byCandidate[candidateId].unshift({
                id: makeId(),
                candidateId,
                type: "proctor_note",
                description: `Warning sent: "${note}"`,
                timestamp: new Date().toISOString(),
            });
        },
    },
});

export const {initCandidateActivity, addActivityEvent, addWarningEvent} =
    activitySlice.actions;

export default activitySlice.reducer;
