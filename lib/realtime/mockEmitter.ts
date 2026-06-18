import { RealtimeEvent, SessionStatus, RiskLevel } from "@/types";

const STATUSES: SessionStatus[] = [
  "active",
  "idle",
  "reconnecting",
  "terminated",
  "completed",
];
const RISKS: RiskLevel[] = ["high", "medium", "low"];
const EVENT_TYPES: RealtimeEvent["type"][] = [
  "status_change",
  "risk_change",
  "flag",
  "connection_drop",
  "reconnect",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

let candidateIds: string[] = [];

export function registerCandidateIds(ids: string[]) {
  candidateIds = ids;
}

// Posts a generated event to the Next.js route handler which forwards
// it to Pusher. Pusher then delivers it to all subscribed clients via
// WebSocket — completing the full realtime loop without a separate backend.
async function postEvent(event: RealtimeEvent): Promise<void> {
  try {
    await fetch("/api/pusher/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  } catch (err) {
    // Silently drop — the emitter is best-effort, not critical
    console.warn("[MockEmitter] Failed to post event:", err);
  }
}

function buildEvent(): RealtimeEvent | null {
  if (candidateIds.length === 0) return null;

  const type = randomItem(EVENT_TYPES);
  const candidateId = randomItem(candidateIds);
  const timestamp = new Date().toISOString();

  let payload: RealtimeEvent["payload"] = {};

  switch (type) {
    case "status_change":
    case "connection_drop":
    case "reconnect":
      payload = { status: randomItem(STATUSES) };
      break;
    case "risk_change":
      payload = { riskLevel: randomItem(RISKS) };
      break;
    case "flag":
      payload = {};
      break;
  }

  return { type, candidateId, payload, timestamp };
}

export function startMockEmitter(): () => void {
  if (candidateIds.length === 0) {
    console.warn("[MockEmitter] No candidate ids registered yet.");
  }

  const tick = () => {
    const event = buildEvent();
    if (event) postEvent(event);
  };

  const interval = setInterval(tick, 1500 + Math.random() * 1500);
  return () => clearInterval(interval);
}
