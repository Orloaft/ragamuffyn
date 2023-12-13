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
      <ul>
        {data.characters.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>

      <h2>NPCs</h2>
      <ul>
        {data.npcs.map((npc) => (
          <li key={npc.id}>{npc.name}</li>
        ))}
      </ul>
    </div>
  );
}
