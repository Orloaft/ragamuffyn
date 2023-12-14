import { configureStore } from "@reduxjs/toolkit";
import battleDataSlice from "./battleDataSlice";

export const store = configureStore({
  reducer: {
    battleData: battleDataSlice,
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
