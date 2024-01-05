import { configureStore } from "@reduxjs/toolkit";
import dataEntrySlice from "./dataEntrySlice";
import dataObjSlice from "./dataObjSlice";
import battleGridSlice from "./battleGridSlice";

export const store = configureStore({
  reducer: {
    dataEntries: dataEntrySlice,
    dataObj: dataObjSlice,
    battleGrid: battleGridSlice,
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
