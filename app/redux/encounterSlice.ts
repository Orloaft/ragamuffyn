import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { CellProperties, CellProperty } from "~/components/battleGrid";
import type { EncounterData } from "~/data";

// Define a type for the slice state
export interface BattleGridState {
  highlighted: boolean[][];
  gridSize: number;
  zoomLevel: number;
  selectedCell: string | null;
  cellProperties: CellProperties;
  bg: any;
  bgSize: any;
  bgPosY: any;
  bgPosX: any;
  bgRotate: any;
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
const initialState: EncounterData = {
  name: "",
  description: "",
  locations: [],
  initiativeOrder: [],
  currentTurn: 0,
  round: 0,
  notes: [],
  npcs: [],
  gridProps: {
    highlighted: Array(28).fill(Array(28).fill(false)),
    gridSize: 10,
    zoomLevel: 1,
    selectedCell: null,
    cellProperties: createInitialCellProperties(10),
    bg: null,
    bgSize: 100,
    bgPosY: 50,
    bgPosX: 50,
    bgRotate: 0,
  },
};

export const encounterSlice = createSlice({
  name: "encounter",
  initialState,
  reducers: {
    setCurrentTurn: (state, action: PayloadAction<any>) => {
      state.currentTurn = action.payload;
    },
    setInitiativeOrder: (state, action: PayloadAction<any>) => {
      state.initiativeOrder = action.payload;
    },
    setNpcs: (state, action: PayloadAction<any>) => {
      state.npcs = action.payload;
    },
    // Reducer to set the grid size
    setGridSize: (state, action: PayloadAction<number>) => {
      state.gridProps && (state.gridProps.gridSize = action.payload);
    },

    // Reducer to set the zoom level
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.gridProps && (state.gridProps.zoomLevel = action.payload);
    },
    setHighlighted: (state, action: PayloadAction<boolean[][]>) => {
      state.gridProps && (state.gridProps.highlighted = action.payload);
    },
    setBg: (state, action: PayloadAction<any>) => {
      state.gridProps && (state.gridProps.bg = action.payload);
    },
    setBgSize: (state, action: PayloadAction<any>) => {
      state.gridProps && (state.gridProps.bgSize = action.payload);
    },
    setBgRotate: (state, action: PayloadAction<any>) => {
      state.gridProps && (state.gridProps.bgRotate = action.payload);
    },
    setBgPosX: (state, action: PayloadAction<any>) => {
      state.gridProps && (state.gridProps.bgPosX = action.payload);
    },
    setBgPosY: (state, action: PayloadAction<any>) => {
      state.gridProps && (state.gridProps.bgPosY = action.payload);
    },
    // Reducer to set the selected cell
    setSelectedCell: (state, action: PayloadAction<string | null>) => {
      state.gridProps && (state.gridProps.selectedCell = action.payload);
    },
    initializeCellProperties: (
      state,
      action: PayloadAction<{ [key: string]: CellProperty }>
    ) => {
      state.gridProps && (state.gridProps.cellProperties = action.payload);
    },
    updateCellProperties: (state, action: PayloadAction<any>) => {
      state.gridProps && (state.gridProps.cellProperties = action.payload);
    },
    updateCellProperty: (
      state,
      action: PayloadAction<UpdateCellPropertyPayload>
    ) => {
      const { cellKey, property, value } = action.payload;
      console.log("setting prop", property);
      // Update property with type checking
      if (property === "size" || property === "posX" || property === "posY") {
        state.gridProps &&
          (state.gridProps.cellProperties[cellKey][property] = value as number);
      } else if (property === "image") {
        state.gridProps &&
          (state.gridProps.cellProperties[cellKey][property] = value as
            | string
            | null);
      } else if (property === "moving") {
        state.gridProps &&
          (state.gridProps.cellProperties[cellKey][property] =
            value as boolean);
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
  setBg,
  setBgPosX,
  setBgRotate,
  setBgPosY,
  setBgSize,
  setCurrentTurn,
  setInitiativeOrder,
  setNpcs,
} = encounterSlice.actions;

export default encounterSlice.reducer;
