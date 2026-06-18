import {createSlice, createEntityAdapter, PayloadAction} from "@reduxjs/toolkit";
import {Candidate, RealtimeEvent} from "@/types";

const candidatesAdapter = createEntityAdapter<Candidate>();

const candidatesSlice = createSlice({
    name: "candidates",
    initialState: candidatesAdapter.getInitialState({totalCount: 0}),
    reducers: {
        setCandidates(state, action: PayloadAction<Candidate[]>) {
            candidatesAdapter.setAll(state, action.payload);
            state.totalCount = action.payload.length;
        },

        applyRealtimeEvent(state, action: PayloadAction<RealtimeEvent>) {
            const {candidateId, payload} = action.payload;
            if (state.entities[candidateId]) {
                candidatesAdapter.updateOne(state, {
                    id: candidateId,
                    changes: payload as Partial<Candidate>,
                });
            }
        },

        terminateSession(state, action: PayloadAction<string>) {
            const id = action.payload;
            if (state.entities[id]) {
                candidatesAdapter.updateOne(state, {
                    id,
                    changes: {status: "terminated"},
                });
            }
        },
    },
});

export const {setCandidates, applyRealtimeEvent, terminateSession} =
    candidatesSlice.actions;

export const candidatesSelectors = candidatesAdapter.getSelectors();

export default candidatesSlice.reducer;
