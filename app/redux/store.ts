import { configureStore } from "@reduxjs/toolkit";
import dataEntrySlice from "./dataEntrySlice";
import dataObjSlice from "./dataObjSlice";
import encounterSlice from "./encounterSlice";

export const store = configureStore({
  reducer: {
    dataEntries: dataEntrySlice,
    dataObj: dataObjSlice,
    encounter: encounterSlice,
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
