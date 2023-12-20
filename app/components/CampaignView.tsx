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

const CampaignView: React.FC<{ data: any; id: string }> = ({ data, id }) => {
  // Set the initial state of the form
  const [campaign, setCampaign] = useState<campaignData>(data);

  // Handle changes in form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCampaign({ ...campaign, [name]: value });
  };

  // Handle form submission

  return (
    <div>
      <div>
        <label htmlFor="name">Name:</label>
        <input name="name" value={campaign.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="players">Players:</label>
        <input
          name="players"
          value={campaign.players}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="plot">Plot:</label>
        <textarea name="plot" value={campaign.plot} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="locations">Locations:</label>
        <textarea
          name="locations"
          value={campaign.locations}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="npcs">NPCs:</label>
        <textarea name="npcs" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="characters">characters:</label>
        <CharacterList characters={campaign.characters} modelId={id} />
        <select name="characters"></select>
      </div>

      <div>
        <label htmlFor="encounters">encounters:</label>
        <Encounters encounters={campaign.encounters} />
      </div>
    </div>
  );
};

export default CampaignView;
