import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  setGridSize,
  setZoomLevel,
  setSelectedCell,
  setHighlighted,
  updateCellProperties,
  updateCellProperty,
  setBg,
  setBgPosX,
  setBgPosY,
  setBgRotate,
  setBgSize,
  setNpcs,
  setInitiativeOrder,
  setCharacters,
  setCurrentTurn,
} from "../../redux/encounterSlice";
import type { CellProperty } from ".";

import { useFetcher } from "@remix-run/react";
import { useToast } from "@chakra-ui/react";
export const useBattleGrid = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state.encounter);
  const fetcher = useFetcher();

  const { gridProps } = reduxState;
  const emitGridUpdate = useCallback(() => {
    fetcher.submit(
      {
        updates: reduxState,
      },
      { method: "post", action: "/api/updateData", encType: "application/json" }
    );
    toast({
      title: "Upload",
      description: "Encounter data saved.",
      status: "success",
      duration: 1500,
      isClosable: false,
    });
    // socket.emit("updateGrid", reduxState);
  }, [reduxState, fetcher]);

  const handleZoomChange = (value: number) => {
    dispatch(setZoomLevel(value));
  };
  console.log(reduxState, "reduxiooo");
  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;

    const isNewCellSelected = cellKey !== reduxState.selectedCell;

    let movingData = {
      image: null,
      size: 1,
      posX: 0,
      posY: 0,
      moving: false,
      tag: "",
    };

    if (
      gridProps.selectedCell &&
      gridProps.cellProperties[gridProps.selectedCell].moving
    ) {
      movingData.image = gridProps.cellProperties[gridProps.selectedCell].image;
      movingData.size = gridProps.cellProperties[gridProps.selectedCell].size;
      movingData.posX = gridProps.cellProperties[gridProps.selectedCell].posX;
      movingData.posY = gridProps.cellProperties[gridProps.selectedCell].posY;
      movingData.moving = true;
      movingData.tag = gridProps.cellProperties[gridProps.selectedCell].tag;
      dispatch(
        updateCellProperties({
          ...gridProps.cellProperties,
          [gridProps.selectedCell]: {
            ...gridProps.cellProperties[gridProps.selectedCell],
            image: null,
            moving: false,
            tag: "",
          },
        })
      );
    }

    if (isNewCellSelected) {
      dispatch(
        updateCellProperties({
          ...gridProps.cellProperties,
          [cellKey]: movingData.moving
            ? { ...movingData, moving: false }
            : { ...gridProps.cellProperties[cellKey] },
        })
      );
      if (movingData.moving) {
        updateCellPropertyHandler("moving", false, gridProps.selectedCell);
        updateCellPropertyHandler("image", null, gridProps.selectedCell);
        updateCellPropertyHandler("tag", "", gridProps.selectedCell);
      }

      dispatch(setSelectedCell(cellKey));
    } else {
      dispatch(setSelectedCell(null));
    }

    const newHighlighted = gridProps.highlighted.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((col, cIdx) => (cIdx === colIndex ? !col : col))
        : row
    );
    dispatch(setHighlighted(newHighlighted));
  };
  useEffect(() => {
    const newHighlighted = Array(gridProps.gridSize).fill(
      Array(gridProps.gridSize).fill(false)
    );
    dispatch(setHighlighted(newHighlighted));
  }, [dispatch, gridProps.gridSize]);

  const handleCellImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cellKey: string
  ) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCellPropertyHandler("image", reader.result as string, cellKey);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateCellPropertyHandler = (
    property: keyof CellProperty,
    value: number | string | boolean | null,
    cellKey: string
  ) => {
    if (cellKey) {
      // Assuming updateCellProperty is a Redux action to update the properties of a cell
      dispatch(updateCellProperty({ cellKey, property, value }));
    }
  };

  return {
    highlighted: gridProps.highlighted,
    gridSize: gridProps.gridSize,
    setGridSize: (s: any) => dispatch(setGridSize(s)),
    zoomLevel: gridProps.zoomLevel,
    selectedCell: gridProps.selectedCell,
    cellProperties: gridProps.cellProperties,
    bgSize: gridProps.bgSize,
    setBgSize: (size: any) => dispatch(setBgSize(size)),
    bgPosX: gridProps.bgPosX,
    setBgPosX: (v: any) => dispatch(setBgPosX(v)),
    bgPosY: gridProps.bgPosY,
    setBgPosY: (v: any) => dispatch(setBgPosY(v)),
    bgRotate: gridProps.bgRotate,
    setBgRotate: (v: any) => dispatch(setBgRotate(v)),
    handleZoomChange,
    handleSquareClick,
    handleCellImageChange,
    updateCellPropertyHandler,
    emitGridUpdate,
    bg: gridProps.bg,
    setBg: (v: any) => dispatch(setBg(v)),
    npcs: reduxState.npcs,
    setNpcs: (v: any) => dispatch(setNpcs(v)),
    initiativeOrder: reduxState.initiativeOrder,
    setInitiativeOrder: (v) => dispatch(setInitiativeOrder(v)),
    characters: reduxState.characters,
    setCharacters: (v: any) => dispatch(setCharacters(v)),
    currentTurn: reduxState.currentTurn,
    setCurrentTurn: (v) => dispatch(setCurrentTurn(v)),
  };
};
