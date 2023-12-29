import { ListItem, UnorderedList } from "@chakra-ui/react";
import type { character, npc } from "@prisma/client";

export interface battleData {
  round: number;
  initiativeOrder: null | (character | npc)[];
  characters: character[];
  npcs: npc[];
}

export default function BattleView({ data }: { data: battleData }) {
  return (
    <div>
      <h2>Characters</h2>
      <UnorderedList
        backgroundImage={"url('/marble.avif')"}
        style={{ listStyle: "none", padding: "10px" }}
        color="#dddddd"
      >
        {data.characters.map((character) => (
          <ListItem key={character.id}>{character.name}</ListItem>
        ))}
      </UnorderedList>

      <h2>NPCs</h2>
      <UnorderedList
        backgroundImage={"url('/marble.avif')"}
        style={{ listStyle: "none", padding: "10px" }}
        color="#dddddd"
      >
        {data.npcs.map((npc) => (
          <ListItem key={npc.id} as={undefined}>
            {npc.name}
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
}
