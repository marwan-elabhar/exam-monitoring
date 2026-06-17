import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "@/types";

const initialState: UIState = {
  selectedCandidateId: null,
  isLoading: true,
  error: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedCandidate(state, action: PayloadAction<string | null>) {
      state.selectedCandidateId = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setSelectedCandidate, setLoading, setError } = uiSlice.actions;

export default uiSlice.reducer;
