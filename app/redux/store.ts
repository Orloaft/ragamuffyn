import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    // Add other reducers here
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
