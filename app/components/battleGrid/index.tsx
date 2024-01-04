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
} from "@chakra-ui/react";
import Cell from "./Cell";
import { ArrowUpDownIcon, SettingsIcon } from "@chakra-ui/icons";

import EncounterElementsLookUp from "../EncounterElementsLookUp";
import NotesImageLookUp from "../NotesImageLookUp";
import CustomModal from "../customModal";
export interface CellProperty {
  size: number;
  posX: number;
  posY: number;
  image: string | null;
  moving: boolean;
}

interface CellProperties {
  [key: string]: CellProperty;
}
const BattleGrid: React.FC<any> = () => {
  const [highlighted, setHighlighted] = useState<boolean[][]>(
    Array(28).fill(Array(28).fill(false))
  );
  const [data, setData] = useState<any[]>([]);
  const [gridSize, setGridSize] = useState(10); // Initial grid size
  const [bg, setBg] = useState<any>();
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [cellProperties, setCellProperties] = useState<CellProperties>({});
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageNoteIds, setImageNoteIds] = useState<string[]>([]);
  const handleZoomChange = (value: number) => {
    setZoomLevel(value);
  };
  // Update the highlighted state based on the gridSize
  useEffect(() => {
    setHighlighted(Array(gridSize).fill(Array(gridSize).fill(false)));
  }, [gridSize]);

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
  // Rest of your component
  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    const isNewCellSelected = cellKey !== selectedCell;
    let movingData = { image: null, size: 1, posX: 0, posY: 0 };

    if (selectedCell && cellProperties[selectedCell]?.moving) {
      movingData.image = cellProperties[selectedCell].image;
      movingData.size = cellProperties[selectedCell].size;
      movingData.posX = cellProperties[selectedCell].posX;
      movingData.posY = cellProperties[selectedCell].posY;
      setCellProperties((prev) => ({
        ...prev,
        [selectedCell]: {
          ...prev[selectedCell],
          image: null,
          moving: false,
        },
      }));
    }

    if (isNewCellSelected) {
      setCellProperties((prev) => ({
        ...prev,
        [cellKey]: {
          size: movingData.size || prev[cellKey]?.size || 1,
          posX: movingData.posX || 0,
          posY: movingData.posY || 50,
          image: movingData.image || prev[cellKey]?.image || null,
          moving: false,
        },
      }));
      setSelectedCell(cellKey);
    } else {
      setSelectedCell(null);
    }

    const newHighlighted = highlighted.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((col, cIdx) => (cIdx === colIndex ? !col : col))
        : row
    );
    setHighlighted(newHighlighted);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [bgSize, setBgSize] = useState(100); // Initial background size (in percentage)
  const [bgPosX, setBgPosX] = useState(50); // Initial X position (in percentage)
  const [bgPosY, setBgPosY] = useState(50); // Initial Y position (in percentage)
  const [bgRotate, setBgRotate] = useState(0);
  console.log(
    "selectedcell props",
    cellProperties[selectedCell !== null ? selectedCell : ""]
  );
  const handleCellImageChange = (e, cellKey) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCellProperty("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateCellProperty = (
    property: keyof CellProperty,
    value: number | string | boolean
  ) => {
    console.log("selected cell", selectedCell);
    if (selectedCell) {
      setCellProperties((prev) => ({
        ...prev,
        [selectedCell]: {
          ...prev[selectedCell],
          [property]: value,
        },
      }));
    }
  };
  return (
    <Box
      h="100vh"
      position="relative"
      overflow="hidden"
      transform={`scale(${zoomLevel}) `}
    >
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
                  min={15}
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
                <Text>Cell Size</Text>
                <Slider
                  value={cellProperties[selectedCell]?.size}
                  min={0.15}
                  step={0.1}
                  max={10}
                  onChange={(val) => updateCellProperty("size", val)}
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
                  onChange={(val) => updateCellProperty("posX", val)}
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
                  onChange={(val) => updateCellProperty("posY", val)}
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
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        maxHeight="100%"
        bgImage={bg}
        bgPosition={`${bgPosX}% ${bgPosY}%`}
        bgSize={`${bgSize}%`}
        backgroundRepeat="no-repeat"
        transform={`rotate(${bgRotate * 10}deg)`}
        transformOrigin="center center"
        zIndex="1"
      />

      <Box
        height="100vh"
        position="relative"
        overflowY="hidden"
        transformOrigin="center center"
        zIndex="15"
      >
        <Grid
          templateRows={`repeat(${gridSize}, 1fr)`}
          templateColumns={`repeat(${gridSize}, 1fr)`}
          gap={0}
          position="absolute"
          w="full"
          h="100%"
        >
          {highlighted.map((row, rowIndex) =>
            row.map((isHighlighted, colIndex) => {
              const cellKey = `${rowIndex}-${colIndex}`;
              const cellProps = cellProperties[cellKey];
              console.log("cell props", cellProps);
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
                                  <Text>Cell Size</Text>
                                  <Slider
                                    value={cellProperties[selectedCell]?.size}
                                    min={0.15}
                                    step={0.1}
                                    max={10}
                                    onChange={(val) =>
                                      updateCellProperty("size", val)
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
                                      updateCellProperty("posX", val)
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
                                      updateCellProperty("posY", val)
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
                                    onChange={updateCellProperty}
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
                          buttonLabel="images"
                        />
                        <IconButton
                          height="50%"
                          left="10%"
                          zIndex="15"
                          aria-label="move"
                          colorScheme="grey"
                          icon={<ArrowUpDownIcon />}
                          onClick={() => {
                            updateCellProperty("moving", true);
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
  );
};

export default BattleGrid;
