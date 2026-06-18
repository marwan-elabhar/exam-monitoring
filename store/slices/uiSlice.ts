import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState, ConnectionStatus } from "@/types";

const initialState: UIState = {
  selectedCandidateId: null,
  pendingTerminateCandidateId: null,
  isLoading: true,
  error: null,
  connectionStatus: "connecting",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedCandidate(state, action: PayloadAction<string | null>) {
      state.selectedCandidateId = action.payload;
    },
    setPendingTerminate(state, action: PayloadAction<string | null>) {
      state.pendingTerminateCandidateId = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setConnectionStatus(state, action: PayloadAction<ConnectionStatus>) {
      state.connectionStatus = action.payload;
    },
  },
});

export const {
  setSelectedCandidate,
  setPendingTerminate,
  setLoading,
  setError,
  setConnectionStatus,
} = uiSlice.actions;

export default uiSlice.reducer;
