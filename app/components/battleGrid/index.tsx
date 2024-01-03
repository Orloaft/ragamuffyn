import type { ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import Cell from "./Cell";
import { ArrowUpDownIcon, SettingsIcon } from "@chakra-ui/icons";
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
const BattleGrid: React.FC<any> = ({ background }: any) => {
  const [highlighted, setHighlighted] = useState<boolean[][]>(
    Array(28).fill(Array(28).fill(false))
  );
  const [gridSize, setGridSize] = useState(10); // Initial grid size
  const [bg, setBg] = useState<any>();
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [cellProperties, setCellProperties] = useState<CellProperties>({});
  const [zoomLevel, setZoomLevel] = useState(1);
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
    let movingData = { image: null, size: 1 };

    if (selectedCell && cellProperties[selectedCell]?.moving) {
      movingData.image = cellProperties[selectedCell].image;
      movingData.size = cellProperties[selectedCell].size;
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
          posX: prev[cellKey]?.posX || 50,
          posY: prev[cellKey]?.posY || 50,
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
    <Box h="100vh" position="relative">
      <IconButton
        position="absolute"
        ref={btnRef}
        zIndex="10"
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
                  min={0.5}
                  max={20}
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
                  defaultValue={50}
                  min={0}
                  max={100}
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
                  defaultValue={50}
                  min={0}
                  max={100}
                  orientation="horizontal"
                  onChange={(val) => updateCellProperty("posY", val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                {/* File input for cell image */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCellImageChange(e, selectedCell)}
                />
              </Box>
            )}
          </Box>
        </DrawerContent>
      </Drawer>

      <Box
        bgPosition={`${bgPosX}% ${bgPosY}%`}
        bgImage={bg}
        bgSize={`${bgSize}%`}
        backgroundRepeat="no-repeat"
        height="100vh"
        position="relative"
        overflowY="hidden"
        transform={`scale(${zoomLevel})`}
        transformOrigin="center center"
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
                      zIndex="10"
                      position="absolute"
                      top="0"
                      left={`-${cellProps.size * 50 + 40}%`}
                    >
                      <Flex flexDirection="column" gap="2">
                        <IconButton
                          left="10%"
                          height="50%"
                          aria-label="settings"
                          colorScheme="grey"
                          icon={<SettingsIcon />}
                          onClick={onOpen}
                        />{" "}
                        <IconButton
                          height="50%"
                          left="10%"
                          zIndex="10"
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
