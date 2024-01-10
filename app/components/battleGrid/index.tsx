import type { ChangeEvent } from "react";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
  Image,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";
import Cell from "./Cell";
import {
  AddIcon,
  ArrowUpDownIcon,
  DownloadIcon,
  EditIcon,
  MinusIcon,
  SettingsIcon,
  ViewIcon,
} from "@chakra-ui/icons";

import EncounterElementsLookUp from "../EncounterElementsLookUp";
import CustomModal from "../customModal";
import { useBattleGrid } from "./useBattleGrid";
import { useDispatch } from "react-redux";
import { setSelectedCell, setZoomLevel } from "~/redux/encounterSlice";
import useDataLookUp from "./useDataLookUp";
import BattleGridMenu from "./BattleGridMenu";
import NotesImageLookUp from "../NotesImageLookUp";
export interface CellProperty {
  size: number;
  posX: number;
  posY: number;
  image: string | null;
  moving: boolean;
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
    handleZoomChange,
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
    setCharacters,
    setInitiativeOrder,
  } = useBattleGrid();
  const containerSize =
    zoomLevel > 1 ? zoomLevel * gridSize * 50 : gridSize * 50;
  const [imageNoteIds, setImageNoteIds] = useState<string[]>([]);
  const dispatch = useDispatch();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { data: npcEntries, loading: npcLoading } = useDataLookUp(npcs);
  let npcData = npcLoading ? null : npcEntries;
  const { data: characterEntries, loading: characterLoading } =
    useDataLookUp(characters);
  let characterData = characterLoading ? null : characterEntries;
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
  const btnRef = React.useRef();

  return (
    <Box
      style={{
        cursor: "crosshair",
      }}
      ref={containerRef}
      // width={[
      //   gridSize * (zoomLevel >= 1 ? zoomLevel : 1) * 20 + "vw",
      //   gridSize * (zoomLevel >= 1 ? zoomLevel : 1) * 10 + "vw",
      //   gridSize * (zoomLevel >= 1 ? zoomLevel : 1) * 10 + "vw",
      //   gridSize * (zoomLevel >= 1 ? zoomLevel : 1) * 10 + "vw",
      // ]}
      // height={[
      //   gridSize * (zoomLevel >= 1 ? zoomLevel : 1) * 30 + "vh",
      //   gridSize * (zoomLevel >= 1 ? zoomLevel : 1) * 20 + "vh",
      //   gridSize * (zoomLevel >= 1 ? zoomLevel : 1) * 15 + "vh",
      //   gridSize * (zoomLevel >= 1 ? zoomLevel : 1) * 10 + "vh",
      // ]}
      width={`${containerSize * 1.5}px`}
      height={`${containerSize * 1.5}px`}
      position="relative"
      overflow="auto"
      boxSizing="border-box"
      zIndex="10"
    >
      <Box position="fixed" zIndex="20">
        <IconButton
          ref={btnRef}
          zIndex="20"
          colorScheme="grey"
          onClick={onOpen}
          icon={<SettingsIcon />}
        >
          Settings
        </IconButton>
        <IconButton
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
          aria-label="Zoom in"
          icon={<AddIcon />}
          onClick={handleZoomIn}
        />
        <IconButton
          colorScheme="grey"
          aria-label="Zoom out"
          icon={<MinusIcon />}
          onClick={handleZoomOut}
        />
        {npcData && characterData && (
          <BattleGridMenu
            initiativeOrder={initiativeOrder}
            characterData={characterData}
            addCharacter={(c) => setCharacters([...characters, c])}
            npcData={npcData}
            addNpc={(c) => setNpcs([...npcs, c])}
            setInitiativeOrder={setInitiativeOrder}
          />
        )}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgImage="url(/marble.avif)">
          <DrawerCloseButton />
          <Box
            width="10rem"
            height="fit-content"
            borderRadius=".25rem"
            padding=".5rem"
            color="#dddddd"
            zIndex="10"
          >
            {!selectedCell && (
              <>
                <Text minWidth="100px">Battle Map:</Text>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Image zIndex="10" alt="Cell Image" src={bg} />
                <Text>Zoom</Text>
                <Slider
                  aria-label="zoom-level"
                  min={0.5} // Minimum zoom level
                  max={2} // Maximum zoom level
                  step={0.1} // Step of each zoom change
                  value={zoomLevel}
                  onChange={handleZoomChange}
                >
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb />
                </Slider>
                <Text>Rotate</Text>
                <Slider
                  aria-label="rotate"
                  min={0} // Minimum zoom level
                  max={25} // Maximum zoom level
                  step={1} // Step of each zoom change
                  value={bgRotate}
                  onChange={(e) => {
                    setBgRotate(e);
                  }}
                >
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb />
                </Slider>
                <Text minWidth="100px">Grid Size:</Text>
                <Slider
                  defaultValue={10}
                  min={10}
                  max={40}
                  step={1}
                  onChange={(val) => setGridSize(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text>Size</Text>
                <Slider
                  defaultValue={100}
                  min={50} // Minimum size (in percentage)
                  max={200} // Maximum size (in percentage)
                  onChange={(val) => setBgSize(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                {/* Slider for adjusting X coordinate */}
                <Text>X Position</Text>
                <Slider
                  defaultValue={50}
                  min={0}
                  max={100}
                  orientation="horizontal"
                  onChange={(val) => setBgPosX(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                {/* Slider for adjusting Y coordinate */}
                <Text>Y Position</Text>
                <Slider
                  defaultValue={50}
                  min={0}
                  max={100}
                  orientation="horizontal"
                  onChange={(val) => setBgPosY(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>{" "}
              </>
            )}
            {selectedCell && (
              <Box>
                {" "}
                <Text>Selected Cell</Text>
                <Button
                  onClick={() => {
                    dispatch(setSelectedCell(null));
                  }}
                >
                  Unselect
                </Button>
                <Text>Cell Size</Text>
                {cellProperties[selectedCell] && (
                  <Slider
                    value={cellProperties[selectedCell].size}
                    min={0.15}
                    step={0.1}
                    max={10}
                    onChange={(val) =>
                      updateCellPropertyHandler("size", val, selectedCell)
                    }
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                )}
                {/* Slider for adjusting X coordinate */}
                <Text>X Position</Text>
                <Slider
                  defaultValue={0}
                  min={-50}
                  max={50}
                  orientation="horizontal"
                  onChange={(val) =>
                    updateCellPropertyHandler("posX", val, selectedCell)
                  }
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                {/* Slider for adjusting Y coordinate */}
                <Text>Y Position</Text>
                <Slider
                  defaultValue={0}
                  min={-50}
                  max={50}
                  orientation="horizontal"
                  onChange={(val) =>
                    updateCellPropertyHandler("posY", val, selectedCell)
                  }
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                {/* <NotesImageLookUp data={data} /> */}
                <Text>Image</Text>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCellImageChange(e, selectedCell)}
                />
                {cellProperties[selectedCell].image && (
                  <Image
                    zIndex="10"
                    alt="Cell Image"
                    src={cellProperties[selectedCell].image as string}
                  />
                )}
              </Box>
            )}
          </Box>
          {npcs && (
            <EncounterElementsLookUp
              addedData={npcs}
              addToForm={(c: any) => {
                setNpcs([...npcs, c]);
              }}
            />
          )}

          <UnorderedList listStyleType={"none"} color="#dddddd">
            {npcData &&
              npcData.map((e) => {
                return (
                  <ListItem
                    key={e.id}
                    onClick={() => {
                      setImageNoteIds(JSON.parse(e.data).notes);
                    }}
                  >
                    {e.name}
                  </ListItem>
                );
              })}
          </UnorderedList>
        </DrawerContent>
      </Drawer>
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
          //   display="flex" // Added for flexbox layout
          //   alignItems="center" // Align children vertically center
          // Align children horizontally center
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
              highlighted.map((row, rowIndex) =>
                row.map((isHighlighted, colIndex) => {
                  const cellKey = `${rowIndex}-${colIndex}`;
                  const cellProps = cellProperties[cellKey];

                  return (
                    <Box key={cellKey} position="relative">
                      {selectedCell === cellKey && (
                        <Box
                          zIndex="15"
                          position="absolute"
                          top="0"
                          left={`-${zoomLevel * 50 + 40}%`}
                        >
                          <Flex flexDirection="column" gap="2">
                            <CustomModal
                              title="images"
                              width={"20%"}
                              button={<EditIcon />}
                              content={
                                <>
                                  {" "}
                                  {cellProperties[selectedCell] && (
                                    <Box>
                                      {" "}
                                      <Text>Selected Cell</Text>
                                      <Text>Image Size</Text>
                                      <Slider
                                        value={
                                          cellProperties[selectedCell].size
                                        }
                                        min={0.15}
                                        step={0.1}
                                        max={10}
                                        onChange={(val) =>
                                          updateCellPropertyHandler(
                                            "size",
                                            val,
                                            selectedCell
                                          )
                                        }
                                      >
                                        <SliderTrack>
                                          <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                      </Slider>
                                      {/* Slider for adjusting X coordinate */}
                                      <Text>X Position</Text>
                                      <Slider
                                        defaultValue={0}
                                        min={-50}
                                        max={50}
                                        orientation="horizontal"
                                        onChange={(val) =>
                                          updateCellPropertyHandler(
                                            "posX",
                                            val,
                                            selectedCell
                                          )
                                        }
                                      >
                                        <SliderTrack>
                                          <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                      </Slider>
                                      {/* Slider for adjusting Y coordinate */}
                                      <Text>Y Position</Text>
                                      <Slider
                                        defaultValue={0}
                                        min={-50}
                                        max={50}
                                        orientation="horizontal"
                                        onChange={(val) =>
                                          updateCellPropertyHandler(
                                            "posY",
                                            val,
                                            selectedCell
                                          )
                                        }
                                      >
                                        <SliderTrack>
                                          <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                      </Slider>
                                      {/* <NotesImageLookUp data={data} /> */}
                                      <Text>Image</Text>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                          handleCellImageChange(e, selectedCell)
                                        }
                                      />
                                      {cellProperties[selectedCell] && (
                                        <Image
                                          zIndex="10"
                                          alt="Cell Image"
                                          src={
                                            cellProperties[selectedCell]
                                              .image as string
                                          }
                                        />
                                      )}
                                    </Box>
                                  )}
                                  <EncounterElementsLookUp
                                    addedData={npcs}
                                    addToForm={(c: any) => {
                                      // add logic for adding things to encounter
                                    }}
                                  />{" "}
                                </>
                              }
                            />
                            <IconButton
                              left="10%"
                              zIndex="15"
                              aria-label="move"
                              background={"black"}
                              colorScheme="grey"
                              icon={<ArrowUpDownIcon />}
                              onClick={() => {
                                updateCellPropertyHandler(
                                  "moving",
                                  true,
                                  selectedCell
                                );
                              }}
                            />
                          </Flex>
                        </Box>
                      )}{" "}
                      <Cell
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
