import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { CellProperties, CellProperty } from "~/components/battleGrid";

// Define a type for the slice state
interface BattleGridState {
  highlighted: boolean[][];
  gridSize: number;
  zoomLevel: number;
  selectedCell: string | null;
  cellProperties: CellProperties;
}
// Define a type for the cell property update action
interface UpdateCellPropertyPayload {
  cellKey: string;
  property: keyof CellProperty;
  value: number | string | boolean | null;
}
const createInitialCellProperties = (gridSize: number): CellProperties => {
  const cellProperties: CellProperties = {};
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cellKey = `${row}-${col}`;
      cellProperties[cellKey] = {
        size: 1, // Default size
        posX: 0, // Default X position
        posY: 0, // Default Y position
        image: null, // No image initially
        moving: false, // Not moving initially
      };
    }
  }
  return cellProperties;
};

// Define the initial state using that type
const initialState: BattleGridState = {
  highlighted: Array(28).fill(Array(28).fill(false)),
  gridSize: 10,
  zoomLevel: 1,
  selectedCell: null,
  cellProperties: createInitialCellProperties(10),
};

export const battleGridSlice = createSlice({
  name: "battleGrid",
  initialState,
  reducers: {
    // Reducer to set the grid size
    setGridSize: (state, action: PayloadAction<number>) => {
      state.gridSize = action.payload;
    },

    // Reducer to set the zoom level
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel = action.payload;
    },
    setHighlighted: (state, action: PayloadAction<boolean[][]>) => {
      state.highlighted = action.payload;
    },
    // Reducer to set the selected cell
    setSelectedCell: (state, action: PayloadAction<string | null>) => {
      state.selectedCell = action.payload;
    },
    initializeCellProperties: (
      state,
      action: PayloadAction<{ [key: string]: CellProperty }>
    ) => {
      state.cellProperties = action.payload;
    },
    updateCellProperties: (state, action: PayloadAction<any>) => {
      state.cellProperties = action.payload;
    },
    updateCellProperty: (
      state,
      action: PayloadAction<UpdateCellPropertyPayload>
    ) => {
      const { cellKey, property, value } = action.payload;
      console.log("setting prop", property);
      // Update property with type checking
      if (property === "size" || property === "posX" || property === "posY") {
        state.cellProperties[cellKey][property] = value as number;
      } else if (property === "image") {
        state.cellProperties[cellKey][property] = value as string | null;
      } else if (property === "moving") {
        state.cellProperties[cellKey][property] = value as boolean;
      }
    },
  },
});

// Action creators are generated for each reducer function
export const {
  setGridSize,
  setZoomLevel,
  setSelectedCell,
  updateCellProperty,
  updateCellProperties,
  setHighlighted,
} = battleGridSlice.actions;

export default battleGridSlice.reducer;
