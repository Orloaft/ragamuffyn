import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  setGridSize,
  setZoomLevel,
  setSelectedCell,
  setHighlighted,
  updateCellProperties,
  updateCellProperty,
} from "../../redux/battleGridSlice";
import type { CellProperty } from ".";
import { io } from "socket.io-client";

export const useBattleGrid = () => {
  const dispatch = useDispatch();
  const { highlighted, gridSize, zoomLevel, selectedCell, cellProperties } =
    useSelector((state) => state.battleGrid);
  const [bgSize, setBgSize] = useState(100); // Background size
  const [bgPosX, setBgPosX] = useState(50); // Background X position
  const [bgPosY, setBgPosY] = useState(50); // Background Y position
  const [bgRotate, setBgRotate] = useState(0); // Background rotation
  const [bg, setBg] = useState<any>();
  const socket = io("http://localhost:8080");

  useEffect(() => {
    // socket.on("gridUpdated", (data) => {
    //   // Handle incoming grid updates
    //   // Possibly dispatch a Redux action to update the state
    // });

    // Cleanup function to close the socket connection
    return () => {
      //   socket.off("gridUpdated");
      socket.disconnect();
    };
  }, [socket]); // Include socket in the dependency array

  const emitGridUpdate = useCallback(() => {
    const currentProps = {
      highlighted,
      gridSize,
      zoomLevel,
      selectedCell,
      cellProperties,
      bgPosX,
      bgPosY,
      bgRotate,
      bgSize,
      bg,
    };
    socket.emit("updateGrid", currentProps);
  }, [
    highlighted,
    gridSize,
    zoomLevel,
    selectedCell,
    cellProperties,
    bgPosX,
    bgPosY,
    bgRotate,
    bgSize,
    bg,
    socket,
  ]);
  useEffect(() => {
    // This is an example. You might have different logic in your useEffect.
    dispatch(setGridSize(10)); // Set initial grid size or based on some logic
  }, [dispatch]);

  const handleZoomChange = (value: number) => {
    dispatch(setZoomLevel(value));
  };

  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;

    const isNewCellSelected = cellKey !== selectedCell;

    let movingData = { image: null, size: 1, posX: 0, posY: 0, moving: false };

    if (selectedCell && cellProperties[selectedCell].moving) {
      movingData.image = cellProperties[selectedCell].image;
      movingData.size = cellProperties[selectedCell].size;
      movingData.posX = cellProperties[selectedCell].posX;
      movingData.posY = cellProperties[selectedCell].posY;
      movingData.moving = true;
      dispatch(
        updateCellProperties({
          ...cellProperties,
          [selectedCell]: {
            ...cellProperties[selectedCell],
            image: null,
            moving: false,
          },
        })
      );
    }

    if (isNewCellSelected) {
      dispatch(
        updateCellProperties({
          ...cellProperties,
          [cellKey]: movingData.moving
            ? { ...movingData, moving: false }
            : { ...cellProperties[cellKey] },
        })
      );
      if (movingData.moving) {
        updateCellPropertyHandler("moving", false, selectedCell);
        updateCellPropertyHandler("image", null, selectedCell);
      }

      dispatch(setSelectedCell(cellKey));
    } else {
      dispatch(setSelectedCell(null));
    }

    const newHighlighted = highlighted.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((col, cIdx) => (cIdx === colIndex ? !col : col))
        : row
    );
    dispatch(setHighlighted(newHighlighted));
  };
  useEffect(() => {
    const newHighlighted = Array(gridSize).fill(Array(gridSize).fill(false));
    dispatch(setHighlighted(newHighlighted));
  }, [dispatch, gridSize]);

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
    highlighted,
    gridSize,
    zoomLevel,
    selectedCell,
    cellProperties,
    bgSize,
    setBgSize,
    bgPosX,
    setBgPosX,
    bgPosY,
    setBgPosY,
    bgRotate,
    setBgRotate,
    handleZoomChange,
    handleSquareClick,
    handleCellImageChange,
    updateCellPropertyHandler,
    emitGridUpdate,
    bg,
    setBg,
  };
};
