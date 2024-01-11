import {
  Box,
  Flex,
  UnorderedList,
  Text,
  ListItem,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Input,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import CustomModal from "../customModal";
import { CloseIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import EncounterElementsLookUp from "../EncounterElementsLookUp";
import { indexOf, max, min } from "lodash";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    setEditStates(
      initiativeOrder.map(() => ({ editing: false, inputValue: "" }))
    );
  }, [initiativeOrder]);
  return (
    <CustomModal
      width={"100%"}
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
                      justifyContent="space-around"
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
            <Flex direction={"column"}>
              <Text>Npcs</Text>
              <UnorderedList listStyleType={"none"}>
                {npcData.map((npc) => {
                  return (
                    <ListItem
                      key={npc.id}
                      onClick={() =>
                        setInitiativeOrder([
                          ...initiativeOrder,
                          { ...npc, damageTrack: 0, tag: npc.name },
                        ])
                      }
                    >
                      {npc.name}
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Flex>
            <Flex direction={"column"}>
              <Text>Characters</Text>
              <UnorderedList listStyleType={"none"}>
                {characterData.map((c) => {
                  return (
                    <ListItem
                      key={c.id}
                      onClick={() =>
                        setInitiativeOrder([
                          ...initiativeOrder,
                          { ...c, damageTrack: 0, tag: c.name },
                        ])
                      }
                    >
                      {c.name}
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Flex>
          </Flex>
        </Box>
      }
      title={"Encounter"}
      button={<ViewIcon />}
    />
  );
}
