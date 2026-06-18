export type RiskLevel = "high" | "medium" | "low";

export type SessionStatus =
  | "active"
  | "idle"
  | "reconnecting"
  | "terminated"
  | "completed";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  riskLevel: RiskLevel;
  status: SessionStatus;
  lastActiveAt: string; // ISO string
  searchKey: string;    // precomputed lowercase "name email" for fast filtering
}

export interface RealtimeEvent {
  type:
    | "status_change"
    | "risk_change"
    | "flag"
    | "connection_drop"
    | "reconnect"
    | "proctor_note";
  candidateId: string;
  payload: Partial<Candidate> & { note?: string };
  timestamp: string;
}

export type ActivityEventType =
  | "status_change"
  | "risk_change"
  | "flag"
  | "connection_drop"
  | "reconnect"
  | "proctor_note"
  | "session_start";

export interface CandidateActivity {
  id: string;
  candidateId: string;
  type: ActivityEventType;
  description: string;
  timestamp: string; // ISO string
}

export type SortDirection = "asc" | "desc";

export interface FiltersState {
  search: string;
  risk: RiskLevel | "all";
  status: SessionStatus | "all";
  sortDirection: SortDirection;
}

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "failed";

export interface UIState {
  selectedCandidateId: string | null;
  pendingTerminateCandidateId: string | null;
  isLoading: boolean;
  error: string | null;
  connectionStatus: ConnectionStatus;
}
