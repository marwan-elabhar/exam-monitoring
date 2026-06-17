import { RootState } from "@/store";
import { Candidate } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

const selectAllCandidates = (state: RootState) => state.candidates.items;
const selectFilters = (state: RootState) => state.filters;

export const selectFilteredCandidates = createSelector(
  [selectAllCandidates, selectFilters],
  (candidates, filters): Candidate[] => {
    return candidates.filter((c) => {
      const matchesSearch =
        filters.search === "" ||
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesRisk =
        filters.risk === "all" || c.riskLevel === filters.risk;

      const matchesStatus =
        filters.status === "all" || c.status === filters.status;

      return matchesSearch && matchesRisk && matchesStatus;
    });
  }
);

export const selectTotalCount = (state: RootState) =>
  state.candidates.totalCount;

export const selectIsLoading = (state: RootState) => state.ui.isLoading;
export const selectError = (state: RootState) => state.ui.error;
export const selectSelectedCandidateId = (state: RootState) =>
  state.ui.selectedCandidateId;
