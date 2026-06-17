import { configureStore } from "@reduxjs/toolkit";
import candidatesReducer from "./slices/candidatesSlice";
import filtersReducer from "./slices/filtersSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
