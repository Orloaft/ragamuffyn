import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Box,
  Grid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Center,
} from "@chakra-ui/react";
import Cell from "~/components/battleGrid/Cell";
export default function Index() {
  const socket = io("http://localhost:8080"); // Replace with your server URL and portx

  const [socketData, setSocketData] = useState({
    highlighted: [],
    gridSize: 0,
    zoomLevel: 1,
    selectedCell: null,
    cellProperties: {} as { [key: string]: any },
    bgPosX: 50,
    bgPosY: 50,
    bgRotate: 0,
    bgSize: 100,
    bg: "",
  });

  useEffect(() => {
    socket.on("gridUpdate", (data) => {
      console.log(data);
      setSocketData(data);

      return () => {
        //   socket.off("gridUpdated");
        socket.disconnect();
      };
    });
  }, [socket]);

  const handleZoomChange = (value) => {
    setSocketData((prev) => ({ ...prev, zoomLevel: value }));
  };

  // Destructure values from socketData
  const {
    selectedCell,

    highlighted,
  } = socketData;

  return (
    <Box width="100vw" height="100vh" position="relative" overflow="hidden">
      {" "}
      <Box position="absolute" zIndex="10" width="10rem" left="10" top="20">
        {" "}
        <Slider
          aria-label="zoom-level"
          min={0.5} // Minimum zoom level
          max={2} // Maximum zoom level
          step={0.1} // Step of each zoom change
          value={socketData.zoomLevel}
          onChange={handleZoomChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      <Box
        h="100vh"
        position="relative"
        overflow="hidden"
        transform={`scale(${socketData.zoomLevel})`}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bgImage={socketData.bg}
          bgPosition={`${socketData.bgPosX}% ${socketData.bgPosY}%`}
          bgSize="contain" // 'cover' will ensure the background covers the entire box
          backgroundRepeat="no-repeat"
          transform={`rotate(${socketData.bgRotate * 10}deg) scale(${
            socketData.bgSize / 100
          })`}
          transformOrigin="center center"
          zIndex="1"
        />

        <Center width="100%" height="100%">
          <Grid
            templateRows={`repeat(${socketData.gridSize}, 50px)`}
            templateColumns={`repeat(${socketData.gridSize}, 50px)`}
            gap={0}
            position="absolute"
            width="100%"
            height="100%"
            zIndex="20"
          >
            {highlighted.map((row: any, rowIndex) =>
              row.map((isHighlighted, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const cellProps = socketData.cellProperties[cellKey];

                return (
                  <Box key={cellKey} position="relative">
                    <Cell
                      isMoving={cellProps ? cellProps.moving : false}
                      cellProps={cellProps}
                      isSelected={selectedCell === cellKey}
                      onClick={() => {
                        // Define your click handler logic if needed
                      }}
                    />
                  </Box>
                );
              })
            )}
          </Grid>
        </Center>
      </Box>
    </Box>
  );
}
