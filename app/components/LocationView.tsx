import type { character, npc } from "@prisma/client";
import { useState } from "react";
import { Encounters } from "./Encounters";
import CharacterList from "./CharacterList";

export interface encounter {
  id: number;
  name: string;
  description: string;
  location: string;
  initiativeOrder: number[]; // Array of IDs to represent the order of turns
  currentTurn: number; // ID of the character/monster whose turn it is
  round: number; // Current round of the encounter
  notes: string; // Additional notes or observations
}
export interface campaignData {
  name: string;
  characters: character[];
  hooks: string[];
  maps: any[];
  npcs: npc[];
  encounters: encounter[];
  players: string[];
  plot: string;
  locations: string[];
}

const LocationView: React.FC<{ data: any; id: string }> = ({ data, id }) => {
  // Set the initial state of the form
  const [location, setLocation] = useState<any>(data);

  // Handle changes in form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };
  // Handle form submission

  return (
    <div>
      {location && (
        <>
          <div>
            <label htmlFor="name">Name:</label>
            <input name="name" value={location.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="characters">characters:</label>
            <CharacterList characters={location.characters} modelId={id} />
            <select name="characters"></select>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationView;
