import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Grid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
  Text,
} from "@chakra-ui/react";

const BattleGrid: React.FC<any> = ({ background }: any) => {
  const [highlighted, setHighlighted] = useState<boolean[][]>(
    Array(28).fill(Array(28).fill(false))
  );
  const [gridSize, setGridSize] = useState(10); // Initial grid size

  // Update the highlighted state based on the gridSize
  useEffect(() => {
    setHighlighted(Array(gridSize).fill(Array(gridSize).fill(false)));
  }, [gridSize]);

  // Rest of your component
  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    // Toggle the highlighted state for the clicked square
    const newHighlighted = highlighted.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((col, cIdx) => (cIdx === colIndex ? !col : col))
        : row
    );
    setHighlighted(newHighlighted);
  };
  const [bgSize, setBgSize] = useState(100); // Initial background size (in percentage)
  const [bgPosX, setBgPosX] = useState(50); // Initial X position (in percentage)
  const [bgPosY, setBgPosY] = useState(50); // Initial Y position (in percentage)

  return (
    <Box h="100vh" position="relative">
      <Box
        bgImage="url(marble.avif)"
        width="10rem"
        height="fit-content"
        borderRadius=".25rem"
        padding=".5rem"
        color="#dddddd"
        position="absolute"
        zIndex="10"
      >
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
        </Slider>
      </Box>
      <Box
        bgPosition={`${bgPosX}% ${bgPosY}%`}
        bgImage="url(gridtest.png)"
        bgSize={`${bgSize}%`}
        backgroundRepeat="no-repeat"
        h="100%" // Adjust the height as needed
        position="relative"
        overflowY="auto"
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
            row.map((isHighlighted, colIndex) => (
              <Box key={`${rowIndex}-${colIndex}`} w="100%">
                <AspectRatio ratio={1}>
                  <Box
                    bg={isHighlighted ? "green.200" : "transparent"}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    border="1px"
                    borderColor="gray.200"
                    opacity=".45"
                  />
                </AspectRatio>
              </Box>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default BattleGrid;
