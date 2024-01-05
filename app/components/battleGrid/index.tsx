import type { ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
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
  Center,
} from "@chakra-ui/react";
import Cell from "./Cell";
import { ArrowUpDownIcon, DownloadIcon, SettingsIcon } from "@chakra-ui/icons";

import EncounterElementsLookUp from "../EncounterElementsLookUp";
import NotesImageLookUp from "../NotesImageLookUp";
import CustomModal from "../customModal";
import { useBattleGrid } from "./useBattleGrid";
import { useDispatch } from "react-redux";
import { setGridSize, setSelectedCell } from "~/redux/battleGridSlice";
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
const BattleGrid: React.FC<any> = () => {
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
  } = useBattleGrid();

  const [data, setData] = useState<any[]>([]);

  const [imageNoteIds, setImageNoteIds] = useState<string[]>([]);
  const dispatch = useDispatch();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollCenter = (container.scrollWidth - container.clientWidth) / 2;
      container.scrollLeft = scrollCenter;
    }
  }, []);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box
      ref={containerRef}
      width="100vw"
      height="100vh"
      position="relative"
      overflow="auto"
      boxSizing="border-box"
      zIndex="10"
    >
      {" "}
      <IconButton
        position="absolute"
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
        position="absolute"
        zIndex="20"
        top="20"
        colorScheme="grey"
        onClick={emitGridUpdate}
        icon={<DownloadIcon />}
      >
        update
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgImage="url(marble.avif)">
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
                  onChange={(val) => dispatch(setGridSize(val))}
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
                <Slider
                  value={cellProperties[selectedCell]?.size}
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
          <EncounterElementsLookUp
            addedData={data}
            addToForm={(c: any) => {
              setData([...data, c]);
            }}
          />

          <UnorderedList listStyleType={"none"} color="#dddddd">
            {data &&
              data.map((e) => {
                return (
                  <ListItem
                    key={e.id}
                    onClick={() => {
                      console.log("notes", JSON.parse(e.data).notes);
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
          height="100%"
          width="100%"
          position="relative"
          overflowY="scroll"
          transformOrigin="top center"
          border="teal 4px solid"
          transform={`scale(${zoomLevel}) `}
          zIndex="15"
          display="flex" // Added for flexbox layout
          alignItems="center" // Align children vertically center
          justifyContent="center" // Align children horizontally center
        >
          {" "}
          <Grid
            border="pink 4px solid"
            templateRows={`repeat(${gridSize}, 50px)`}
            templateColumns={`repeat(${gridSize}, 50px)`}
            gap={0}
            position="absolute"
            top="50%" // Center vertically
            left="50%" // Center horizontally
            transform="translate(-50%, -50%)" // Adjust for exact centering
          >
            {" "}
            <Box
              position="absolute"
              width="100%"
              height="100%"
              bgImage={bg}
              top={-bgPosY + 25 + "%"}
              bgPosition={`${bgPosX}% `}
              bgSize={`${10 + bgSize / 5}rem`} // 'cover' will ensure the background covers the entire box
              backgroundRepeat="no-repeat"
              transform={`rotate(${bgRotate * 10}deg) `}
              transformOrigin="center center"
              zIndex="-1"
            />
            {highlighted.map((row, rowIndex) =>
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
                        left={`-${cellProps.size * 50 + 40}%`}
                      >
                        <Flex flexDirection="column" gap="2">
                          <CustomModal
                            title="images"
                            content={
                              <>
                                {" "}
                                {selectedCell && (
                                  <Box>
                                    {" "}
                                    <Text>Selected Cell</Text>
                                    <Text>Image Size</Text>
                                    <Slider
                                      value={cellProperties[selectedCell]?.size}
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
                                    {cellProperties[selectedCell].image && (
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
                                  addedData={data}
                                  addToForm={(c: any) => {
                                    setData([...data, c]);
                                  }}
                                />{" "}
                                {data.length ? (
                                  <>
                                    {" "}
                                    <NotesImageLookUp
                                      noteIds={imageNoteIds}
                                      onChange={(img) => {
                                        updateCellPropertyHandler(
                                          "image",
                                          img,
                                          selectedCell
                                        );
                                      }}
                                    />
                                    <UnorderedList listStyleType="none">
                                      {data.map((e) => {
                                        return (
                                          <ListItem
                                            key={e.id}
                                            onClick={() => {
                                              setImageNoteIds(
                                                JSON.parse(e.data).notes
                                              );
                                            }}
                                          >
                                            {e.name}
                                          </ListItem>
                                        );
                                      })}{" "}
                                    </UnorderedList>
                                  </>
                                ) : (
                                  ""
                                )}
                              </>
                            }
                          />
                          <IconButton
                            height="50%"
                            left="10%"
                            zIndex="15"
                            aria-label="move"
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
