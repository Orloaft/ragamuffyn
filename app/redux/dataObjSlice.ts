// slices/itemsSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  CampaignData,
  CharData,
  ItemData,
  LocationData,
  NPCdata,
  NoteData,
} from "~/data";

interface DataObjState {
  dataObj:
    | CampaignData
    | ItemData
    | NPCdata
    | CharData
    | LocationData
    | NoteData
    | null;
  loading: boolean;
}

const initialState: DataObjState = {
  dataObj: null,
  loading: false,
};

export const dataObjSlice = createSlice({
  name: "dataObj",
  initialState,
  reducers: {
    setDataObj: (
      state,
      action: PayloadAction<
        CampaignData | ItemData | NPCdata | CharData | LocationData | NoteData
      >
    ) => {
      state.dataObj = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetData: (state) => {
      state.dataObj = null;
    },
    // additional reducers...
  },
  // extraReducers to handle async thunks (if needed)
});

export const { setDataObj, setLoading, resetData } = dataObjSlice.actions;

export default dataObjSlice.reducer;
