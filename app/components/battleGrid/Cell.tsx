import { AspectRatio, Image, Box, IconButton, Flex } from "@chakra-ui/react";
import type { CellProperty } from ".";

export interface CellProps {
  cellKey: string;
  cellProps: CellProperty;
  isSelected: boolean;
  onClick: () => void;
}

export default function Cell({ cellProps, isSelected, onClick, isMoving }) {
  return (
    <Box position="relative" w="100%" onClick={onClick}>
      {cellProps && cellProps.image && (
        <Image
          src={cellProps.image}
          alt="Cell Image"
          position="absolute"
          bottom={cellProps.posY}
          right={cellProps.posX}
          zIndex="10"
          borderRadius="50%"
          opacity="1"
          transform={`scale(${cellProps.size})`}
        />
      )}

      <AspectRatio ratio={1}>
        <Box
          border="1px"
          borderColor={isMoving ? "red.200" : "gray.200"}
          opacity={isSelected ? "1" : ".25"}
          position="relative"
        ></Box>
      </AspectRatio>
    </Box>
  );
}
