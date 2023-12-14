import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Character, NPC } from "~/data";
const initialState: BattleData = {
  round: 0,
  initiativeOrder: null,
  characters: [],
  npcs: [],
};
const battleDataSlice = createSlice({
  name: "battleData",
  initialState,
  reducers: {
    setRound: (state, action: PayloadAction<number>) => {
      state.round = action.payload;
    },
    setInitiativeOrder: (
      state,
      action: PayloadAction<(Character | NPC)[] | null>
    ) => {
      state.initiativeOrder = action.payload;
    },
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    setNPCs: (state, action: PayloadAction<NPC[]>) => {
      state.npcs = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setRound, setInitiativeOrder, setCharacters, setNPCs } =
  battleDataSlice.actions;
export default battleDataSlice.reducer;
