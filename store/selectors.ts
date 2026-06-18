import {RootState} from "@/store";
import {Candidate, CandidateActivity} from "@/types";
import {createSelector} from "@reduxjs/toolkit";

const selectAllCandidates = (state: RootState) => state.candidates.items;
const selectSearch = (state: RootState) => state.filters.search;
const selectRisk = (state: RootState) => state.filters.risk;
const selectStatus = (state: RootState) => state.filters.status;
const selectSort = (state: RootState) => state.filters.sortDirection;

export const selectFilteredCandidates = createSelector(
    [selectAllCandidates, selectSearch, selectRisk, selectStatus, selectSort],
    (candidates, search, risk, status, sortDirection): Candidate[] => {
        const searchTerm = search.toLowerCase();
        const noSearch = searchTerm === "";
        const noRisk = risk === "all";
        const noStatus = status === "all";

        const filtered =
            noSearch && noRisk && noStatus
                ? candidates
                : candidates.filter((c) => {
                    if (!noSearch && !c.searchKey.includes(searchTerm)) return false;
                    if (!noRisk && c.riskLevel !== risk) return false;
                    if (!noStatus && c.status !== status) return false;
                    return true;
                });

        // Sort by lastActiveAt, slice first to avoid mutating the original array
        return [...filtered].sort((a, b) => {
            const diff =
                new Date(a.lastActiveAt).getTime() -
                new Date(b.lastActiveAt).getTime();
            return sortDirection === "desc" ? -diff : diff;
        });
    }
);

export const selectTotalCount = (state: RootState) =>
    state.candidates.totalCount;

export const selectIsLoading = (state: RootState) => state.ui.isLoading;
export const selectError = (state: RootState) => state.ui.error;
export const selectSelectedCandidateId = (state: RootState) => state.ui.selectedCandidateId;
export const selectPendingTerminateCandidateId = (state: RootState) => state.ui.pendingTerminateCandidateId;
export const selectConnectionStatus = (state: RootState) => state.ui.connectionStatus;
export const selectSortDirection = (state: RootState) => state.filters.sortDirection;

export const selectSelectedCandidate = createSelector(
    [(state: RootState) => state.candidates.items, selectSelectedCandidateId],
    (items, id): Candidate | null =>
        id ? (items.find((c) => c.id === id) ?? null) : null
);

export const selectPendingTerminateCandidate = createSelector(
    [(state: RootState) => state.candidates.items, selectPendingTerminateCandidateId],
    (items, id): Candidate | null =>
        id ? (items.find((c) => c.id === id) ?? null) : null
);

export const selectCandidateActivity = createSelector(
    [(state: RootState) => state.activity.byCandidate, selectSelectedCandidateId],
    (byCandidate, id): CandidateActivity[] =>
        id ? (byCandidate[id] ?? []) : []
);
