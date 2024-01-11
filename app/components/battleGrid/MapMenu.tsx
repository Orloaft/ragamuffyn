import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const MapMenu = ({
  isOpen,
  onClose,

  handleFileChange,
  bg,

  bgRotate,
  setBgRotate,
  setGridSize,
  setBgSize,
  setBgPosX,
  setBgPosY,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgImage="url(/marble.avif)">
        <DrawerCloseButton />
        <Box
          width="10rem"
          height="fit-content"
          borderRadius=".25rem"
          padding=".5rem"
          color="#dddddd"
          zIndex="10"
        >
          <Text minWidth="100px">Battle Map:</Text>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Image zIndex="10" alt="Cell Image" src={bg} />

          <Text>Rotate</Text>
          <Slider
            aria-label="rotate"
            min={0}
            max={25}
            step={1}
            value={bgRotate}
            onChange={(e) => setBgRotate(e)}
          >
            <SliderTrack />
            <SliderFilledTrack />
            <SliderThumb />
          </Slider>
          <Text minWidth="100px">Grid Size:</Text>
          <Slider
            defaultValue={10}
            min={10}
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
            min={50}
            max={200}
            onChange={(val) => setBgSize(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
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
      </DrawerContent>
    </Drawer>
  );
};

export default MapMenu;
