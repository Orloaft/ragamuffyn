import React, { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import { Box, Grid, IconButton } from "@chakra-ui/react";
import Cell from "~/components/battleGrid/Cell";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = () => {
  return { socketUrl: process.env.PUBLIC_SOCKET_URL };
};

export default function Index() {
  const data = useLoaderData();
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

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const containerSize =
    zoomLevel > 1
      ? zoomLevel * socketData.gridSize * 50
      : socketData.gridSize * 50;
  useEffect(() => {
    // Establish connection
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    // Handle incoming messages
    newSocket.on("gridUpdate", (data) => {
      console.log("data", data);
      setSocketData(() => data.gridProps);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <Box
      style={{
        cursor: "crosshair",
      }}
      ref={containerRef}
      width={containerSize * 1.5 + "px"}
      height={containerSize * 1.5 + "px"}
      position="relative"
      overflow="auto"
      boxSizing="border-box"
      zIndex="10"
    >
      <Box position="fixed" zIndex="20">
        <IconButton
          colorScheme="grey"
          aria-label="Zoom in"
          icon={<AddIcon />}
          onClick={() => setZoomLevel(() => zoomLevel + 0.2)}
        />
        <IconButton
          colorScheme="grey"
          aria-label="Zoom out"
          icon={<MinusIcon />}
          onClick={() =>
            setZoomLevel(() =>
              zoomLevel > 1 ? zoomLevel - 0.2 : zoomLevel - 0.2
            )
          }
        />
      </Box>
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
          <Grid
            templateRows={`repeat(${socketData.gridSize}, 50px)`}
            templateColumns={`repeat(${socketData.gridSize}, 50px)`}
            gap={0}
            overflow="hidden"
            position="absolute"
            top="50%" // Center vertically
            left="50%" // Center horizontally
            transform="translate(-50%, -50%)" // Adjust for exact centering
          >
            {" "}
            <Box
              position="absolute"
              height={socketData.bgSize * 10}
              width={socketData.bgSize * 10}
              bgImage={socketData.bg}
              top={-socketData.bgPosY + 25 + "%"}
              bgPosition={`${socketData.bgPosX}% `}
              bgSize={`contain`} // 'cover' will ensure the background covers the entire box
              backgroundRepeat="no-repeat"
              transform={`rotate(${socketData.bgRotate * 10}deg) `}
              transformOrigin="center center"
              zIndex="-1"
            />
            {socketData.highlighted.map((row: any, rowIndex) =>
              row.map((isHighlighted, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const cellProps = socketData.cellProperties[cellKey];

                return (
                  <Box key={cellKey} position="relative">
                    <Cell
                      isMoving={cellProps ? cellProps.moving : false}
                      cellProps={cellProps}
                      isSelected={socketData.selectedCell === cellKey}
                      onClick={() => {
                        // handleSquareClick(rowIndex, colIndex);
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
}
