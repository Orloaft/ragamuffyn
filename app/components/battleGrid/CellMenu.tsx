import { EditIcon, ArrowUpDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Button,
  IconButton,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  Text,
  SliderTrack,
  Image,
} from "@chakra-ui/react";

import React from "react";
import EncounterElementsLookUp from "../EncounterElementsLookUp";
import NotesImageLookUp from "../NotesImageLookUp";
import CustomModal from "../customModal";
// Import other necessary components and icons here

const CellMenu = ({
  zoomLevel,
  cellProperties,
  selectedCell,
  showTagInput,
  setShowTagInput,
  tagInput,
  setTagInput,
  updateCellPropertyHandler,
  handleCellImageChange,
  noteIdArray,
  npcs,
  setNpcs,
  characters,
  setCharacters,
}) => {
  return (
    <Box
      zIndex="15"
      position="absolute"
      top="0"
      left={`-${zoomLevel * 50 + 40}%`}
    >
      <Flex flexDirection="column" gap="2">
        <CustomModal
          title="images"
          width={"20%"}
          button={<EditIcon />}
          content={
            <>
              {" "}
              {cellProperties[selectedCell] && (
                <Box>
                  {" "}
                  <Text>Selected Cell</Text>
                  <Box color={"#dddddd"}>
                    <Flex>
                      <Button
                        onClick={() => {
                          showTagInput &&
                            updateCellPropertyHandler(
                              "tag",
                              tagInput,
                              selectedCell
                            );
                          setShowTagInput(() => !showTagInput);
                          setTagInput("");
                        }}
                      >
                        Set tag
                      </Button>
                      {cellProperties[selectedCell].tag}
                    </Flex>

                    {showTagInput && (
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(() => e.target.value)}
                        placeholder="Tag"
                        mt={4}
                      />
                    )}
                  </Box>
                  <Text>Image Size</Text>
                  <Slider
                    value={cellProperties[selectedCell].size}
                    min={0.15}
                    step={0.1}
                    max={10}
                    onChange={(val) =>
                      updateCellPropertyHandler("size", val, selectedCell)
                    }
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {/* Slider for adjusting X coordinate */}
                  <Text>X Position</Text>
                  <Slider
                    defaultValue={0}
                    min={-50}
                    max={50}
                    orientation="horizontal"
                    onChange={(val) =>
                      updateCellPropertyHandler("posX", val, selectedCell)
                    }
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {/* Slider for adjusting Y coordinate */}
                  <Text>Y Position</Text>
                  <Slider
                    defaultValue={0}
                    min={-50}
                    max={50}
                    orientation="horizontal"
                    onChange={(val) =>
                      updateCellPropertyHandler("posY", val, selectedCell)
                    }
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <NotesImageLookUp
                    onChange={(i: string | number | boolean | null) =>
                      updateCellPropertyHandler("image", i, selectedCell)
                    }
                    noteIds={noteIdArray}
                  />
                  <Text>Image</Text>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCellImageChange(e, selectedCell)}
                  />
                  {cellProperties[selectedCell] && (
                    <Image
                      zIndex="10"
                      alt="Cell Image"
                      src={cellProperties[selectedCell].image as string}
                    />
                  )}
                </Box>
              )}
              <EncounterElementsLookUp
                addToForm={(c: any, model: any) => {
                  switch (model) {
                    case "npcs":
                      setNpcs([...npcs, c]);
                      break;
                    case "characters":
                      setCharacters([...characters, c]);
                      break;
                  }
                }}
              />{" "}
            </>
          }
        />
        <IconButton
          left="10%"
          zIndex="15"
          aria-label="move"
          background={"black"}
          colorScheme="grey"
          icon={<ArrowUpDownIcon />}
          onClick={() => {
            updateCellPropertyHandler("moving", true, selectedCell);
          }}
        />
      </Flex>
    </Box>
  );
};

export default CellMenu;
