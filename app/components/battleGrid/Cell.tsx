import { AspectRatio, Image, Box } from "@chakra-ui/react";
import type { CellProperty } from ".";

export interface CellProps {
  cellKey: string;
  cellProps: CellProperty;
  isSelected: boolean;
  onClick: () => void;
}

export default function Cell({ cellKey, cellProps, isSelected, onClick }) {
  return (
    <Box key={cellKey} w="100%" onClick={onClick}>
      <AspectRatio ratio={1}>
        <Box
          border="1px"
          borderColor="gray.200"
          opacity={isSelected ? "1" : ".45"}
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
}
