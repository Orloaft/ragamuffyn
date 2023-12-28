// slices/itemsSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { DataEntry } from "~/data";

interface DataEntriesState {
  items: DataEntry[];
  loading: boolean;
}

const initialState: DataEntriesState = {
  items: [],
  loading: false,
};

export const dataEntriesSlice = createSlice({
  name: "dataEntries",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<DataEntry[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // additional reducers...
  },
  // extraReducers to handle async thunks (if needed)
});

export const { setItems, setLoading } = dataEntriesSlice.actions;

export default dataEntriesSlice.reducer;
