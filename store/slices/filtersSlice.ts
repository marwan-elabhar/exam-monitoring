import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState, RiskLevel, SessionStatus } from "@/types";

const initialState: FiltersState = {
  search: "",
  risk: "all",
  status: "all",
  sortDirection: "desc", // newest first by default
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setRisk(state, action: PayloadAction<RiskLevel | "all">) {
      state.risk = action.payload;
    },
    setStatus(state, action: PayloadAction<SessionStatus | "all">) {
      state.status = action.payload;
    },
    toggleSort(state) {
      state.sortDirection = state.sortDirection === "desc" ? "asc" : "desc";
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearch, setRisk, setStatus, toggleSort, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
