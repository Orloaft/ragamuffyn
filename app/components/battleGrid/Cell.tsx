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
    <Box position="relative" onClick={onClick} width="50px" height="50px">
      {cellProps && cellProps.image && (
        <Box
          position="absolute"
          bottom={cellProps.posY}
          right={cellProps.posX}
          width={cellProps.size + "rem"}
          height={cellProps.size + "rem"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {" "}
          <Image
            background={"white"}
            src={cellProps.image}
            alt="Cell Image"
            width={cellProps.size - 0.5 + "rem"}
            height={cellProps.size - 0.5 + "rem"}
            objectFit="contain"
            opacity="1"
            borderRadius={"50%"}
            objectPosition={"center"}
            position="relative"
            bottom={cellProps.posY}
            right={cellProps.posX}
            zIndex="4" // Ensure image is above the background but below the border
          />
          <Box
            boxSizing="border-box"
            position="absolute"
            bottom={cellProps.posY}
            right={cellProps.posX}
            zIndex="5"
            borderRadius={"50%"}
            width="100%" // Match wrapper size
            height="100%" // Match wrapper size
            border={
              currentTurn === cellProps.tag
                ? `0.2rem ${isMoving ? "dashed" : "solid"} gold`
                : isSelected
                ? `0.2rem ${isMoving ? "dashed" : "solid"} cyan`
                : "none"
            }
          >
            {" "}
          </Box>
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
