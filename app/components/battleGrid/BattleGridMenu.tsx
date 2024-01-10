import { Box, Flex, UnorderedList, Text, ListItem } from "@chakra-ui/react";
import CustomModal from "../customModal";
import { ViewIcon } from "@chakra-ui/icons";
import EncounterElementsLookUp from "../EncounterElementsLookUp";

export default function BattleGridMenu({
  initiativeOrder,
  npcData,
  characterData,
  addCharacter,
  addNpc,
  setInitiativeOrder,
}) {
  return (
    <CustomModal
      width={"70%"}
      content={
        <Box color={"#dddddd"}>
          <Flex>
            <Box>
              <Text>Initiative order</Text>
              <UnorderedList listStyleType={"none"}>
                {initiativeOrder.map((el) => {
                  return <ListItem key={el.id}>{el.name}</ListItem>;
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
                        setInitiativeOrder([...initiativeOrder, npc])
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
                        setInitiativeOrder([...initiativeOrder, c])
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
