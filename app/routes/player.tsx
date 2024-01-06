import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import { Box, Grid, IconButton } from "@chakra-ui/react";
import Cell from "~/components/battleGrid/Cell";
import { DragHandleIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";

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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isPanningEnabled, setIsPanningEnabled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const onMouseDown = useCallback(
    (e) => {
      if (!isPanningEnabled) return;
      setIsDragging(true);
      setStartPos({
        x: e.clientX - containerRef.current.scrollLeft,
        y: e.clientY - containerRef.current.scrollTop,
      });
    },
    [isPanningEnabled]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging || !isPanningEnabled) return;
      containerRef.current.scrollLeft =
        startPos.x -
        (e.clientX - containerRef.current.getBoundingClientRect().left);
      containerRef.current.scrollTop =
        startPos.y -
        (e.clientY - containerRef.current.getBoundingClientRect().top);
    },
    [isDragging, isPanningEnabled, startPos]
  );
  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  useEffect(() => {
    socket.on("gridUpdate", (data) => {
      setSocketData(JSON.parse(data).gridProps);

      return () => {
        //   socket.off("gridUpdated");
        socket.disconnect();
      };
    });
  }, [socket]);

  const [zoom, setZoom] = useState(1);

  return (
    <Box
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
      style={{
        cursor: isDragging
          ? "grabbing"
          : isPanningEnabled
          ? "grab"
          : "crosshair",
      }}
      ref={containerRef}
      width={[
        socketData.gridSize * socketData.zoomLevel * 20 + "vw",
        socketData.gridSize * socketData.zoomLevel * 10 + "vw",
        socketData.gridSize * socketData.zoomLevel * 10 + "vw",
        socketData.gridSize * socketData.zoomLevel * 10 + "vw",
      ]}
      height={[
        socketData.gridSize * socketData.zoomLevel * 30 + "vh",
        socketData.gridSize * socketData.zoomLevel * 20 + "vh",
        socketData.gridSize * socketData.zoomLevel * 15 + "vh",
        socketData.gridSize * socketData.zoomLevel * 10 + "vh",
      ]}
      position="relative"
      overflow="auto"
      boxSizing="border-box"
      zIndex="10"
    >
      <Box position="fixed" zIndex="20">
        <IconButton
          aria-label="allow panning"
          colorScheme="grey"
          onClick={() => setIsPanningEnabled(() => !isPanningEnabled)}
          icon={<DragHandleIcon color={isPanningEnabled ? "white" : "black"} />}
        >
          enable panning
        </IconButton>
        {/* <IconButton
          colorScheme="grey"
          aria-label="Zoom in"
          icon={<AddIcon />}
          onClick={() => setZoom(() => zoom + 1)}
        />
        <IconButton
          colorScheme="grey"
          aria-label="Zoom out"
          icon={<MinusIcon />}
          onClick={() => setZoom(() => (zoom > 1 ? zoom - 1 : zoom - 0.2))}
        /> */}
      </Box>
      <Box h="100%" w="100%" position="absolute">
        <Box
          minHeight="100%"
          height="fit-content"
          minWidth="100%"
          width="fit-content"
          position="relative"
          transformOrigin="top center"
          transform={
            socketData.zoomLevel !== 1 ? `scale(${socketData.zoomLevel})` : ""
          }
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
