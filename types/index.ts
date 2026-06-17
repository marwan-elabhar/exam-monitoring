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

export interface FiltersState {
  search: string;
  risk: RiskLevel | "all";
  status: SessionStatus | "all";
}

export interface UIState {
  selectedCandidateId: string | null;
  isLoading: boolean;
  error: string | null;
}
