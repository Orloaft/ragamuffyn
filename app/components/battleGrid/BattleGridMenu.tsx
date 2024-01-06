import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Box,
  Button,
  DrawerCloseButton,
  ListItem,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  UnorderedList,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  setBgRotate,
  setGridSize,
  setBgSize,
  setBgPosX,
  setBgPosY,
  setSelectedCell,
} from "~/redux/encounterSlice";
import EncounterElementsLookUp from "../EncounterElementsLookUp";

export default function BattleGridMenu() {
  const dispatch = useDispatch();
  // Add other necessary hooks and states

  // Add or modify necessary handlers

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
          {!selectedCell && (
            <>
              <Text minWidth="100px">Battle Map:</Text>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <Image zIndex="10" alt="Cell Image" src={bg} />
              <Text>Zoom</Text>
              <Slider
                aria-label="zoom-level"
                min={0.5} // Minimum zoom level
                max={2} // Maximum zoom level
                step={0.1} // Step of each zoom change
                value={zoomLevel}
                onChange={handleZoomChange}
              >
                <SliderTrack />
                <SliderFilledTrack />
                <SliderThumb />
              </Slider>
              <Text>Rotate</Text>
              <Slider
                aria-label="rotate"
                min={0} // Minimum zoom level
                max={25} // Maximum zoom level
                step={1} // Step of each zoom change
                value={bgRotate}
                onChange={(e) => {
                  setBgRotate(e);
                }}
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
                onChange={(val) => dispatch(setGridSize(val))}
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
              </Slider>{" "}
            </>
          )}
          {selectedCell && (
            <Box>
              {" "}
              <Text>Selected Cell</Text>
              <Button
                onClick={() => {
                  dispatch(setSelectedCell(null));
                }}
              >
                Unselect
              </Button>
              <Text>Cell Size</Text>
              <Slider
                value={cellProperties[selectedCell]?.size}
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
              {/* <NotesImageLookUp data={data} /> */}
              <Text>Image</Text>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleCellImageChange(e, selectedCell)}
              />
              {cellProperties[selectedCell].image && (
                <Image
                  zIndex="10"
                  alt="Cell Image"
                  src={cellProperties[selectedCell].image as string}
                />
              )}
            </Box>
          )}
        </Box>
        <EncounterElementsLookUp
          addedData={data}
          addToForm={(c: any) => {
            setData([...data, c]);
          }}
        />

        <UnorderedList listStyleType={"none"} color="#dddddd">
          {data &&
            data.map((e) => {
              return (
                <ListItem
                  key={e.id}
                  onClick={() => {
                    console.log("notes", JSON.parse(e.data).notes);
                    setImageNoteIds(JSON.parse(e.data).notes);
                  }}
                >
                  {e.name}
                </ListItem>
              );
            })}
        </UnorderedList>
      </DrawerContent>
    </Drawer>
  );
}
