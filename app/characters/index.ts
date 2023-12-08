export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface DnDCharacter {
  name: string;
  race: string;
  class: string;
  level: number;
  stats: CharacterStats;
}
// interfaces/Character.ts
export interface Character {
  id?: number;
  name: string;
  race: string;
  class: string;
  level: number;
  // Add other character attributes as needed
}
