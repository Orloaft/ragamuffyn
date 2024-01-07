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
} from "../../redux/encounterSlice";
import type { CellProperty } from ".";
import { io } from "socket.io-client";

import { useFetcher } from "@remix-run/react";
export const useBattleGrid = (data?: any) => {
  const dispatch = useDispatch();
  const encounterData = JSON.parse(data.data);

  const gridData = encounterData.gridProps;
  const reduxState = useSelector((state) => state.encounter);
  const fetcher = useFetcher();
  const socket = io("http://localhost:8080");
  useEffect(() => {
    if (data) {
      console.log("re despatch on useEffect");
      dispatch(setNpcs(encounterData.npcs));
      dispatch(setInitiativeOrder(encounterData.initiativeOrder));
      dispatch(setGridSize(gridData.gridSize || reduxState.gridProps.gridSize));
      dispatch(
        setZoomLevel(gridData.zoomLevel || reduxState.gridProps.zoomLevel)
      );
      // dispatch(
      //   setSelectedCell(
      //     gridData.selectedCell || reduxState.gridProps.selectedCell
      //   )
      // );
      dispatch(
        setHighlighted(gridData.highlighted || reduxState.gridProps.highlighted)
      );
      dispatch(setBg(gridData.bg || reduxState.gridProps.bg));
      dispatch(setBgSize(gridData.bgSize || reduxState.gridProps.bgSize));
      dispatch(setBgPosY(gridData.bgPosY || reduxState.gridProps.bgPosY));
      dispatch(setBgPosX(gridData.bgPosX || reduxState.gridProps.bgPosX));
      dispatch(setBgRotate(gridData.bgRotate || reduxState.gridProps.bgRotate));
      if (gridData.cellProperties) {
        dispatch(
          updateCellProperties(
            gridData.cellProperties || reduxState.gridProps.cellProperties
          )
        );
      }
    }
  }, [dispatch, data.data]);
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
  const { gridProps } = reduxState;
  const emitGridUpdate = useCallback(() => {
    console.log("emitty", data.id);
    fetcher.submit(
      {
        id: data.id,
        updates: reduxState,
      },
      { method: "post", action: "/api/updateData", encType: "application/json" }
    );
    socket.emit("updateGrid", reduxState);
  }, [reduxState, socket]);

  const handleZoomChange = (value: number) => {
    dispatch(setZoomLevel(value));
  };

  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;

    const isNewCellSelected = cellKey !== reduxState.selectedCell;

    let movingData = { image: null, size: 1, posX: 0, posY: 0, moving: false };

    if (
      gridProps.selectedCell &&
      gridProps.cellProperties[gridProps.selectedCell].moving
    ) {
      movingData.image = gridProps.cellProperties[gridProps.selectedCell].image;
      movingData.size = gridProps.cellProperties[gridProps.selectedCell].size;
      movingData.posX = gridProps.cellProperties[gridProps.selectedCell].posX;
      movingData.posY = gridProps.cellProperties[gridProps.selectedCell].posY;
      movingData.moving = true;
      dispatch(
        updateCellProperties({
          ...gridProps.cellProperties,
          [gridProps.selectedCell]: {
            ...gridProps.cellProperties[gridProps.selectedCell],
            image: null,
            moving: false,
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
  };
};
