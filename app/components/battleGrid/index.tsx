import type { ChangeEvent } from "react";
import React, { useMemo, useState } from "react";

import {
  Box,
  Flex,
  Grid,
  IconButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import Cell from "./Cell";
import {
  AddIcon,
  DownloadIcon,
  MinusIcon,
  SettingsIcon,
  TimeIcon,
} from "@chakra-ui/icons";

import { useBattleGrid } from "./useBattleGrid";
import { useDispatch } from "react-redux";
import { setZoomLevel } from "~/redux/encounterSlice";
import useDataLookUp from "./useDataLookUp";
import BattleGridMenu from "./BattleGridMenu";

import MapMenu from "./MapMenu";
import InitiativeTracker from "./InitiativeTracker";
import CellMenu from "./CellMenu";

export interface CellProperty {
  size: number;
  posX: number;
  posY: number;
  image: string | null;
  moving: boolean;
  tag?: string;
}

export interface CellProperties {
  [key: string]: CellProperty;
}
const BattleGrid: React.FC<any> = ({ socketUrl }) => {
  const {
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
    handleSquareClick,
    handleCellImageChange,
    updateCellPropertyHandler,
    emitGridUpdate,
    bg,
    setBg,
    npcs,
    setGridSize,
    setNpcs,
    initiativeOrder,
    characters,
    currentTurn,
    setCurrentTurn,
    setCharacters,
    setInitiativeOrder,
  } = useBattleGrid();
  const containerSize =
    zoomLevel > 1 ? zoomLevel * gridSize * 50 : gridSize * 50;
  const dispatch = useDispatch();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const { data: npcEntries, loading: npcLoading } = useDataLookUp(npcs);
  let npcData: any = npcLoading ? null : npcEntries;
  const { data: characterEntries, loading: characterLoading } =
    useDataLookUp(characters);
  let characterData: any = characterLoading ? null : characterEntries;
  const noteIdArray = useMemo(() => {
    let tempNoteIdArray: any[] = [];

    npcData &&
      npcData.forEach((d: { data: string }) => {
        tempNoteIdArray = [...tempNoteIdArray, ...JSON.parse(d.data).notes];
      });
    characterData &&
      characterData.forEach((d: { data: string }) => {
        tempNoteIdArray = [...tempNoteIdArray, ...JSON.parse(d.data).notes];
      });
    return tempNoteIdArray;
  }, [npcData, characterData]);
  function getNextTurnTag(): string {
    const currentIndex = initiativeOrder.findIndex(
      (item: { tag: any }) => item.tag === currentTurn
    );

    // If currentTurn is not found, return an empty string or handle as needed
    if (currentIndex === -1) return initiativeOrder[0].tag;

    // Calculate the index of the next item, wrapping to the first item if at the end of the array
    const nextIndex = (currentIndex + 1) % initiativeOrder.length;

    // Return the tag of the next item
    return initiativeOrder[nextIndex].tag;
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleZoomIn = () => {
    dispatch(setZoomLevel(Math.min(zoomLevel + 0.1, 2))); // Assuming 2 is the max zoom level
  };

  const handleZoomOut = () => {
    dispatch(setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))); // Assuming 0.5 is the min zoom level
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      style={{
        cursor: "crosshair",
      }}
      // background={[`url("/parchment.jpg")`, "", "", ""]}
      ref={containerRef}
      width={`${containerSize * 1.5}px`}
      height={`${containerSize * 1.5}px`}
      position="relative"
      overflow="auto"
      boxSizing="border-box"
      zIndex="10"
    >
      <Box position="fixed" zIndex="20" display={"flex"} alignItems={"center"}>
        <IconButton
          background="black"
          border={"1px solid #dddddd"}
          aria-label="settings"
          zIndex="20"
          colorScheme="grey"
          onClick={onOpen}
          icon={<SettingsIcon />}
        >
          Settings
        </IconButton>
        <IconButton
          background="black"
          border={"1px solid #dddddd"}
          aria-label="update"
          zIndex="20"
          colorScheme="grey"
          onClick={emitGridUpdate}
          icon={<DownloadIcon />}
        >
          update
        </IconButton>
        <IconButton
          colorScheme="grey"
          background="black"
          border={"1px solid #dddddd"}
          aria-label="Zoom in"
          icon={<AddIcon />}
          onClick={handleZoomIn}
        />
        <IconButton
          background="black"
          border={"1px solid #dddddd"}
          colorScheme="grey"
          aria-label="Zoom out"
          icon={<MinusIcon />}
          onClick={handleZoomOut}
        />
        {(npcData && characterData && (
          <BattleGridMenu
            initiativeOrder={initiativeOrder}
            characterData={characterData}
            addCharacter={(c: any) => setCharacters([...characters, c])}
            npcData={npcData}
            addNpc={(c: any) => setNpcs([...npcs, c])}
            setInitiativeOrder={setInitiativeOrder}
          />
        )) || <Spinner size="lg" />}{" "}
        <IconButton
          aria-label="next turn"
          background="black"
          border={"1px solid #dddddd"}
          zIndex="20"
          colorScheme="grey"
          onClick={() => {
            setCurrentTurn(getNextTurnTag());
          }}
          icon={<TimeIcon />}
        >
          next turn
        </IconButton>
      </Box>{" "}
      <Flex zIndex={"20"} position={"fixed"} right={"0"} top={"10%"}>
        <InitiativeTracker
          setInitiativeOrder={setInitiativeOrder}
          initiativeOrder={initiativeOrder}
          currentTurn={currentTurn}
        />
      </Flex>
      <MapMenu
        onClose={onClose}
        isOpen={isOpen}
        handleFileChange={handleFileChange}
        bg={bg}
        bgRotate={bgRotate}
        setBgRotate={setBgRotate}
        setBgSize={setBgSize}
        setGridSize={setGridSize}
        setBgPosX={setBgPosX}
        setBgPosY={setBgPosY}
        bgPosX={bgPosX}
        bgPosY={bgPosY}
        bgSize={bgSize}
        gridSize={gridSize}
      />
      <Box h="100%" w="100%" position="absolute">
        <Box
          minHeight="100%"
          height="fit-content"
          minWidth="100%"
          width="fit-content"
          position="relative"
          transformOrigin="top center"
          transform={zoomLevel !== 1 ? `scale(${zoomLevel})` : ""}
          zIndex="15"
        >
          {" "}
          <Grid
            templateRows={`repeat(${gridSize}, 50px)`}
            templateColumns={`repeat(${gridSize}, 50px)`}
            gap={0}
            overflow="hidden"
            position="absolute"
            top="50%" // Center vertically
            left={50 + (zoomLevel - 1) * 8 + "%"} // Center horizontally
            transform="translate(-50%, -50%)" // Adjust for exact centering
          >
            {" "}
            <Box
              position="absolute"
              height={bgSize * 10}
              width={bgSize * 10}
              bgImage={bg}
              top={-bgPosY + 25 + "%"}
              bgPosition={`${bgPosX}% `}
              bgSize={`contain`} // 'cover' will ensure the background covers the entire box
              backgroundRepeat="no-repeat"
              transform={`rotate(${bgRotate * 10}deg) `}
              transformOrigin="center center"
              zIndex="-1"
            />
            {highlighted &&
              highlighted.map((row: any[], rowIndex: number) =>
                row.map((isHighlighted: any, colIndex: number) => {
                  const cellKey = `${rowIndex}-${colIndex}`;
                  const cellProps = cellProperties[cellKey];

                  return (
                    <Box key={cellKey} position="relative">
                      {selectedCell === cellKey && (
                        <CellMenu
                          setCharacters={setCharacters}
                          handleCellImageChange={handleCellImageChange}
                          updateCellPropertyHandler={updateCellPropertyHandler}
                          tagInput={tagInput}
                          setTagInput={setTagInput}
                          setShowTagInput={setShowTagInput}
                          showTagInput={showTagInput}
                          selectedCell={selectedCell}
                          zoomLevel={zoomLevel}
                          cellProperties={cellProperties}
                          npcs={npcs}
                          setNpcs={setNpcs}
                          noteIdArray={noteIdArray}
                          characters={characters}
                        />
                      )}
                      <Cell
                        currentTurn={currentTurn}
                        isMoving={cellProps ? cellProps.moving : false}
                        cellProps={cellProps}
                        isSelected={selectedCell === cellKey}
                        onClick={() => {
                          handleSquareClick(rowIndex, colIndex);
                        }}
                      />
                    </Box>
                  );
                })
              )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default BattleGrid;
