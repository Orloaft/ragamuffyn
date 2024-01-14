import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  UnorderedList,
  Text,
  ListItem,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import CustomModal from "../customModal"; // Adjust this import based on your file structure
import EncounterElementsLookUp from "../EncounterElementsLookUp"; // Adjust this import based on your file structure

export default function BattleGridMenu({
  initiativeOrder,
  npcData,
  characterData,
  addCharacter,
  addNpc,
  setInitiativeOrder,
}) {
  const [editStates, setEditStates] = useState(
    initiativeOrder.map(() => ({ editing: false, inputValue: "" }))
  );
  const [selectedNpc, setSelectedNpc] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    setEditStates(
      initiativeOrder.map(() => ({ editing: false, inputValue: "" }))
    );
  }, [initiativeOrder]);

  const handleNpcClick = (npc) => {
    setSelectedNpc(npc);
    setSelectedCharacter(null); // Deselect character if an NPC is selected
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setSelectedNpc(null); // Deselect NPC if a character is selected
  };

  const addSelectedItem = () => {
    if (selectedNpc) {
      setInitiativeOrder([
        ...initiativeOrder,
        { ...selectedNpc, damageTrack: 0, tag: selectedNpc.name },
      ]);
    } else if (selectedCharacter) {
      setInitiativeOrder([
        ...initiativeOrder,
        { ...selectedCharacter, damageTrack: 0, tag: selectedCharacter.name },
      ]);
    }
  };

  const removeSelectedItem = () => {
    setInitiativeOrder(
      initiativeOrder.filter(
        (item) => item !== selectedNpc && item !== selectedCharacter
      )
    );
  };

  return (
    <CustomModal
      size={"full"}
      title={"Encounter"}
      button={<ViewIcon />}
      content={
        <Box color={"#dddddd"}>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text>Initiative order</Text>
              <UnorderedList listStyleType="none">
                {initiativeOrder.map((el, index) => {
                  return (
                    <ListItem
                      key={el.name + el.tag + index}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {editStates[index] && editStates[index].editing ? (
                        <Input
                          value={editStates[index].inputValue}
                          onChange={(e) => {
                            const newEditStates = [...editStates];
                            newEditStates[index].inputValue = e.target.value;
                            setEditStates(() => newEditStates);
                          }}
                        />
                      ) : (
                        <Text>{el.tag ? el.tag : el.name}</Text>
                      )}

                      <Flex>
                        {" "}
                        <NumberInput
                          width={"30%"}
                          value={el.damageTrack || 0} // Use el.damageTrack if it exists, otherwise default to 0
                          onChange={(valueAsString) => {
                            const newOrder = initiativeOrder.map(
                              (item, idx) => {
                                if (idx === index) {
                                  // Create a new object with updated damageTrack
                                  return {
                                    ...item,
                                    damageTrack: parseInt(valueAsString),
                                  };
                                }
                                return item;
                              }
                            );
                            setInitiativeOrder(newOrder);
                          }}
                          min={-9999}
                          max={9999}
                          step={1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <IconButton
                          onClick={() => {
                            const newOrder = initiativeOrder.filter(
                              (_, idx) => idx !== index
                            );
                            setInitiativeOrder(newOrder);
                          }}
                          aria-label="remove"
                          icon={<CloseIcon />}
                        />
                        <IconButton
                          aria-label="edit"
                          icon={<EditIcon />}
                          onClick={() => {
                            const newEditStates = [...editStates];
                            if (
                              newEditStates[index].editing &&
                              newEditStates[index].inputValue
                            ) {
                              const newOrder = [...initiativeOrder];
                              newOrder[index] = {
                                ...newOrder[index],
                                tag: newEditStates[index].inputValue,
                              };
                              setInitiativeOrder(newOrder);
                            }
                            newEditStates[index].editing =
                              !newEditStates[index].editing;
                            setEditStates(newEditStates);
                          }}
                        />
                      </Flex>
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Box>
            <EncounterElementsLookUp
              addToForm={(c, model) => {
                switch (model) {
                  case "npcs":
                    addNpc(c.id);
                    break;
                  case "characters":
                    addCharacter(c.id);
                    break;
                }
              }}
            />
            <Box border="1px solid gray" padding="10px" borderRadius="md">
              <Flex direction={"column"}>
                <Text>Characters</Text>
                <UnorderedList listStyleType={"none"}>
                  {characterData.map((character) => (
                    <ListItem
                      key={character.id}
                      onClick={() => handleCharacterClick(character)}
                      bg={
                        selectedCharacter === character
                          ? "lightgray"
                          : "transparent"
                      }
                      cursor="pointer"
                    >
                      {character.name}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Flex>
            </Box>
            <Box border="1px solid gray" padding="10px" borderRadius="md">
              <Flex direction={"column"} marginBottom="10px">
                <Text>NPCs</Text>
                <UnorderedList listStyleType={"none"}>
                  {npcData.map((npc) => (
                    <ListItem
                      key={npc.id}
                      onClick={() => handleNpcClick(npc)}
                      bg={selectedNpc === npc ? "lightgray" : "transparent"}
                      cursor="pointer"
                    >
                      {npc.name}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Flex>
            </Box>{" "}
            <Flex marginTop="10px">
              <Button
                colorScheme="blue"
                onClick={addSelectedItem}
                marginRight="5px"
              >
                Add
              </Button>
              <Button colorScheme="blue" onClick={removeSelectedItem}>
                Remove
              </Button>
            </Flex>
          </Flex>
        </Box>
      }
    />
  );
}
