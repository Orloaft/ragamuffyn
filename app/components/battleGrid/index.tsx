import type { ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Grid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
interface CellProperty {
  size: number;
  posX: number;
  posY: number;
  image: string | null;
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
    if (cellKey === selectedCell) {
      setSelectedCell(null);
      setCellProperties((prev) => ({
        ...prev,
        [cellKey]: {
          size: prev[cellKey]?.size || 100, // default size
          posX: prev[cellKey]?.posX || 50, // default X position
          posY: prev[cellKey]?.posY || 50, // default Y position
          image: null,
        },
      }));
    } else {
      setSelectedCell(cellKey);

      setCellProperties((prev) => ({
        ...prev,
        [cellKey]: {
          size: prev[cellKey]?.size || 100, // default size
          posX: prev[cellKey]?.posX || 50, // default X position
          posY: prev[cellKey]?.posY || 50, // default Y position
          image: prev[cellKey]?.image || null,
        },
      }));
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
    value: number | string
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
      <Button
        position="absolute"
        ref={btnRef}
        zIndex="10"
        colorScheme="teal"
        onClick={onOpen}
      >
        Setting
      </Button>
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
            {" "}
            <input type="file" accept="image/*" onChange={handleFileChange} />
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
            {selectedCell && (
              <Box>
                {" "}
                <Text>Selected Cell</Text>
                <Text>Cell Size</Text>
                <Slider
                  value={cellProperties[selectedCell]?.size}
                  min={10}
                  max={200}
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
        h="100%" // Adjust the height as needed
        position="relative"
        overflowY="hidden"
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

              return (
                <Box key={cellKey} w="100%">
                  <AspectRatio ratio={1}>
                    <Box
                      onClick={() => handleSquareClick(rowIndex, colIndex)}
                      border="1px"
                      borderColor="gray.200"
                      opacity={selectedCell === cellKey ? "1" : ".45"}
                      position="relative"
                    >
                      {cellProps && cellProps.image && (
                        <Image
                          src={cellProps.image}
                          alt="Cell Image"
                          position="absolute"
                          zIndex="10"
                          borderRadius="50%"
                          opacity="1"
                        />
                      )}
                    </Box>
                  </AspectRatio>
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
