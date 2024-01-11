import { AspectRatio, Image, Box } from "@chakra-ui/react";
import type { CellProperty } from ".";

export interface CellProps {
  cellKey: string;
  cellProps: CellProperty;
  isSelected: boolean;
  onClick: () => void;
}

export default function Cell({
  cellProps,
  isSelected,
  onClick,
  isMoving,
  currentTurn,
}) {
  return (
    <Box
      position="relative"
      w="100%"
      onClick={onClick}
      width="50px"
      height="50px"
    >
      {cellProps && cellProps.image && (
        <Box
          position="absolute"
          bottom={cellProps.posY}
          right={cellProps.posX}
          zIndex="10"
          width={cellProps.size + "rem"}
          height={cellProps.size + "rem"}
          borderRadius="50%"
          background={"white"}
          border={
            currentTurn === cellProps.tag
              ? (4 - cellProps.size / 2.5) / 2 +
                `px ${isMoving ? "dashed" : "solid"} gold`
              : isSelected
              ? (4 - cellProps.size / 2.5) / 2 +
                `px ${isMoving ? "dashed" : "solid"} cyan`
              : ""
          }
        >
          <Image
            src={cellProps.image}
            alt="Cell Image"
            borderRadius="full"
            boxSize="100%"
            objectFit="contain"
            opacity="1"
            objectPosition={"center"}
          />
        </Box>
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
