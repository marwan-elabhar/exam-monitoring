import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Candidate, RealtimeEvent } from "@/types";

interface CandidatesState {
  items: Candidate[];
  totalCount: number;
}

const initialState: CandidatesState = {
  items: [],
  totalCount: 0,
};

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    setCandidates(state, action: PayloadAction<Candidate[]>) {
      state.items = action.payload;
      state.totalCount = action.payload.length;
    },
    applyRealtimeEvent(state, action: PayloadAction<RealtimeEvent>) {
      const { candidateId, payload } = action.payload;
      const index = state.items.findIndex((c) => c.id === candidateId);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...payload };
      }
    },
    terminateSession(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((c) => c.id === action.payload);
      if (index !== -1) {
        state.items[index].status = "terminated";
      }
    },
  },
});

export const { setCandidates, applyRealtimeEvent, terminateSession } =
  candidatesSlice.actions;

export default candidatesSlice.reducer;
