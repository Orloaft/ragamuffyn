import { matchSorter } from "match-sorter";
import type {
  Prisma,
  campaign,
  character,
  encounter,
  item,
  location,
  npc,
} from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { debugLog } from "./utils/logger";
import type { ImageData } from "./components/images/ImageUpload";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import {
  createInitialCellProperties,
  type BattleGridState,
} from "./redux/encounterSlice";
export interface DataEntry {
  id: string;
  name?: string;
  data?: string;
  createdAt?: string;
  damageTrack?: any;
}
interface HasNotes {
  notes: string[];
}
export interface CharData extends HasNotes {
  [key: string]: any;
  name: string;
  level: number;
  race: string;
  class: string;
  items: string[];
}

export interface NoteData {
  [key: string]: any;
  name: string;
  images: ImageData[];
  text: string;
}
export interface ItemData extends HasNotes {
  [key: string]: any;
  name?: string;
  description?: string;
  type?: string;
}
export interface LocationData extends HasNotes {
  [key: string]: any;
  name: string;
  description: string;
  npcs: string[];
  encounters: string[];
}
export interface EncounterData extends HasNotes {
  id?: string;
  [key: string]: any;
  name: string;
  description: string;
  locations: string[];
  characters: string[];
  initiativeOrder: string[]; // Array of IDs to represent the order of turns
  currentTurn: string; // ID of the character/monster whose turn it is
  round: number; // Current round of the encounter
  npcs: string[];
  gridProps: BattleGridState | null;
}
export interface CampaignData extends HasNotes {
  [key: string]: any;
  name: string;
  characters: string[];
  players: string[];
  encounters: string[];
  locations: string[];
  plot: string;
}
export interface NPCdata extends HasNotes {
  [key: string]: any;
  name: string;
  bio: string;
  characterSheet?: string;
  items: string[];
}

const prisma = new PrismaClient();

// Define a mapping from model names to Prisma client methods
const modelAccessors = {
  character: prisma.character,
  item: prisma.item,
  npc: prisma.npc,
  campaign: prisma.campaign,
  encounter: prisma.encounter,
  location: prisma.location,
  note: prisma.note,
};

// A generic function to get data from any model with optional query and sorting
export async function getData<
  T extends character | item | npc | campaign | encounter | location | note
>(
  model: keyof typeof modelAccessors,
  query: string | null = null,
  sortKey: keyof T
): Promise<T[]> {
  let data: T[] = await modelAccessors[model].findMany();

  if (query) {
    data = matchSorter(data, query, { keys: [sortKey as string] });
  }

  return data.sort((a, b) => ("" + a[sortKey]).localeCompare("" + b[sortKey]));
}
export async function uploadBulkData(data: any) {
  const objArray = JSON.parse(data.get("data"));
  switch (data.get("model")) {
    case "characters":
      objArray.forEach((obj: CharData) => {
        createCharacter({
          id: "",
          name: obj.name,
          data: JSON.stringify(obj),
        });
      });
      break;
    case "items":
      objArray.forEach((obj: ItemData) => {
        createItem({
          id: "",
          name: obj.name,
          data: JSON.stringify(obj),
        });
      });
      break;
    case "npcs":
      objArray.forEach((obj: NPCdata) => {
        createNpc({
          id: "",
          name: obj.name,
          data: JSON.stringify(obj),
        });
      });
      break;
    case "locations":
      objArray.forEach((obj: LocationData) => {
        createLocation({
          id: "",
          name: obj.name,
          data: JSON.stringify(obj),
        });
      });
      break;
    case "campaigns":
      objArray.forEach((obj: CampaignData) => {
        createCampaign({
          id: "",
          name: obj.name,
          data: JSON.stringify(obj),
        });
      });
      break;
    case "encounters":
      objArray.forEach((obj: EncounterData) => {
        createEncounter({
          id: "",
          name: obj.name,
          data: JSON.stringify(obj),
        });
      });
      break;
    case "notes":
      objArray.forEach((obj: NoteData) => {
        createNote({
          id: "",
          name: obj.name,
          data: JSON.stringify(obj),
        });
      });
      break;
  }
}
export async function getDataByModel(model: string, q?: string | null) {
  switch (model) {
    case "characters":
      return getCharacters(q);
    case "items":
      return getItems(q);
    case "npcs":
      return getNpcs(q);
    case "locations":
      return getLocations(q);
    case "campaigns":
      return getCampaigns(q);
    case "encounters":
      return getEncounters(q);
    case "notes":
      return getNotes(q);
  }
}

export async function deleteDataEntry(id: string) {
  switch (id.charAt(0)) {
    case "H":
      return deleteCharacter(id);
      break;
    case "L":
      return deleteLocation(id);
      break;
    case "C":
      return deleteCampaign(id);
      break;
    case "E":
      return deleteEncounter(id);
      break;
    case "N":
      return deleteNpc(id);
      break;
    case "I":
      return deleteItem(id);
      break;
    case "O":
      return deleteNote(id);
      break;
  }
}
export async function fetchDataEntriesById(ids: string[]) {
  let dataArray = [];
  for await (const id of ids) {
    let data = await getDataById(id);

    dataArray.push(data);
  }
  return dataArray;
}
export async function createDataEntry(model: string) {
  switch (model) {
    case "characters":
      return createCharacter({
        id: "",
        name: "",
        data: JSON.stringify({
          name: "",
          level: 0,
          class: "",
          race: "",
          items: [],
        }),
      });
      break;
    case "notes":
      return createNote({
        id: "",
        name: "",
        data: JSON.stringify({
          name: "",
          images: [],
          text: "",
        }),
      });
      break;
    case "campaigns":
      return createCampaign({
        id: "",
        name: "",
        data: JSON.stringify({
          name: "",
          plot: "",
          encounters: [],
          locations: [],
          players: [],
          characters: [],
        }),
      });
      break;
    case "items":
      return createItem({
        id: "",
        name: "",
        data: JSON.stringify({
          name: "",
          description: "",
          type: "",
        }),
      });
      break;
    case "encounters":
      return createEncounter({
        id: "",
        name: "",
        data: JSON.stringify({
          name: "",
          description: "",
          locations: [],
          initiativeOrder: [],
          currentTurn: "",
          round: 0,
          notes: [],
          characters: [],
          npcs: [],
          gridProps: {
            highlighted: Array(28).fill(Array(28).fill(false)),
            gridSize: 10,
            zoomLevel: 1,
            selectedCell: null,
            cellProperties: createInitialCellProperties(10),
            bg: null,
            bgSize: 100,
            bgPosY: 50,
            bgPosX: 50,
            bgRotate: 0,
          },
        }),
      });
      break;
    case "locations":
      return createLocation({
        id: "",
        name: "",
        data: JSON.stringify({
          name: "",
          description: "",
          npcs: [],
          encounters: [],
        }),
      });
      break;
    case "npcs":
      return createNpc({
        id: "",
        name: "",
        data: JSON.stringify({
          name: "",
          bio: "",
          characterSheet: "",
          items: [],
        }),
      });
  }
  return { id: "" };
}
// Specific functions using the generic one
export async function getCharacters(
  query?: string | null
): Promise<DataEntry[]> {
  return getData<DataEntry>("character", query, "name");
}

export async function getCampaigns(
  query?: string | null
): Promise<DataEntry[]> {
  return getData<DataEntry>("campaign", query, "name");
}

export async function getItems(query?: string | null): Promise<DataEntry[]> {
  return getData<DataEntry>("item", query, "name");
}
export async function getLocations(
  query?: string | null
): Promise<DataEntry[]> {
  return getData<DataEntry>("location", query, "name");
}
export async function getNpcs(query?: string | null): Promise<DataEntry[]> {
  return getData<DataEntry>("npc", query, "name");
}
export async function getEncounters(query?: string | null): Promise<any[]> {
  return getData<any>("encounter", query, "name");
}
export async function getNotes(query?: string | null): Promise<any[]> {
  return getData<any>("note", query, "name");
}
export async function createNpc(data: DataEntry): Promise<DataEntry> {
  let id = uuidv4();
  debugLog("creating npc in db:", { ...data, id: `N${id}` });
  return await prisma.npc.create({
    data: { ...data, id: `N${id}` },
  });
}

export async function updateNpc(id: string, data: any): Promise<DataEntry> {
  let updates = { ...data };
  ["items", "notes"].forEach((a) => {
    if (!updates.hasOwnProperty(a)) {
      updates[a] = [];
    }
  });
  return await prisma.npc.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(updates) },
  });
}

export async function updateCampaign(
  id: string,
  updates: CampaignData
): Promise<DataEntry> {
  debugLog("updating campaign in db:", id, updates);
  let update = { ...updates };
  [
    "items",
    "players",
    "encounters",
    "locations",
    "characters",
    "notes",
  ].forEach((a) => {
    if (!update.hasOwnProperty(a)) {
      update[a] = [];
    }
  });

  return await prisma.campaign.update({
    where: { id },
    data: { name: updates.name, data: JSON.stringify(update) },
  });
}
export async function deleteNpc(id: string): Promise<DataEntry> {
  return await prisma.npc.delete({
    where: { id },
  });
}
export async function deleteCampaign(id: string): Promise<DataEntry> {
  return await prisma.campaign.delete({
    where: { id },
  });
}
export async function createItem(data: any): Promise<DataEntry> {
  let id = uuidv4();
  debugLog("creating item in db:", { ...data, id: `I${id}` });
  return await prisma.item.create({
    data: { ...data, id: `I${id}` },
  });
}
export async function createCampaign(data: any): Promise<DataEntry> {
  let id = uuidv4();
  debugLog("creating campaign in db:", { ...data, id: `C${id}` });
  return await prisma.campaign.create({
    data: { ...data, id: `C${id}` },
  });
}
export async function updateItem(
  id: string,
  data: DataEntry
): Promise<DataEntry> {
  debugLog("updating item in db:", { ...data, id: `I${id}` });
  return await prisma.item.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(data) },
  });
}
export async function getItem(id: string): Promise<DataEntry | null> {
  return await prisma.item.findUnique({
    where: { id },
  });
}
export async function getNpc(id: string): Promise<DataEntry | null> {
  return await prisma.npc.findUnique({
    where: { id },
  });
}
export async function getCharacter(id: string): Promise<DataEntry | null> {
  return await prisma.character.findUnique({
    where: { id },
  });
}
export async function getCampaign(id: string): Promise<DataEntry | null> {
  return await prisma.campaign.findUnique({
    where: { id },
  });
}
export async function deleteItem(id: string): Promise<DataEntry> {
  return await prisma.item.delete({
    where: { id },
  });
}
export async function createCharacter(data: DataEntry): Promise<DataEntry> {
  let id = uuidv4();
  debugLog("creating char in db:", { ...data, id: `H${id}` });
  return await prisma.character.create({
    data: { ...data, id: `H${id}` },
  });
}
export async function updateDataEntry(id: string, updates: any) {
  switch (id.charAt(0)) {
    case "H":
      return updateCharacter(id, updates);
      break;
    case "L":
      return updateLocation(id, updates);
      break;
    case "C":
      return updateCampaign(id, updates);
      break;
    case "E":
      return updateEncounter(id, updates);
      break;
    case "N":
      return updateNpc(id, updates);
      break;
    case "I":
      return updateItem(id, updates);
      break;
    case "O":
      return updateNote(id, updates);
      break;
  }
}
export async function getDataById(id: string) {
  let model = id.charAt(0);
  switch (model) {
    case "H":
      return getCharacter(id);
      break;
    case "L":
      return getLocation(id);
      break;
    case "C":
      return getCampaign(id);
      break;
    case "E":
      return getEncounter(id);
      break;
    case "N":
      return getNpc(id);
      break;
    case "I":
      return getItem(id);
      break;
    case "O":
      return getNote(id);
      break;
  }
}
export async function updateCharacter(
  id: string,
  data: CharData
): Promise<DataEntry> {
  debugLog("updating item in db:", id, data);
  let updates = { ...data };
  ["items", "notes"].forEach((a) => {
    if (!updates.hasOwnProperty(a)) {
      updates[a] = [];
    }
  });
  return await prisma.character.update({
    where: { id },
    data: {
      name: data.name,
      data: JSON.stringify(updates),
    },
  });
}

export async function deleteCharacter(id: string): Promise<any> {
  return await prisma.character.delete({
    where: { id },
  });
}

export async function deleteLocation(id: string): Promise<any> {
  return await prisma.location.delete({
    where: { id },
  });
}

// Create a new Location
export async function createLocation(data: any): Promise<
  Prisma.Prisma__locationClient<
    {
      id: string;
      name: string | null;
      data: string | null;
    },
    never,
    DefaultArgs
  >
> {
  let id = uuidv4();
  debugLog("creating location in db:", { ...data, id: `L${id}` });
  return await prisma.location.create({
    data: { ...data, id: `L${id}` },
  });
}

// Get a Location by ID
export async function getLocation(id: string): Promise<DataEntry> {
  return await prisma.location.findUnique({
    where: { id },
  });
}

// Update an existing Location
export async function updateLocation(
  id: string,
  data: LocationData
): Promise<DataEntry> {
  let updates = { ...data };
  ["npcs", "encounters", "notes"].forEach((a) => {
    if (!updates.hasOwnProperty(a)) {
      updates[a] = [];
    }
  });
  debugLog("updating location in db:", id, updates);
  return await prisma.location.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(updates) },
  });
}

export async function createNote(data: DataEntry): Promise<
  Prisma.Prisma__locationClient<
    {
      id: string;
      name: string | null;
      data: string | null;
    },
    never,
    DefaultArgs
  >
> {
  let id = uuidv4();
  debugLog("creating note in db:", { ...data, id: `O${id}` });
  return await prisma.note.create({
    data: { ...data, id: `O${id}` },
  });
}
// Create a new Encounter
export async function createEncounter(data: DataEntry): Promise<
  Prisma.Prisma__locationClient<
    {
      id: string;
      name: string | null;
      data: string | null;
    },
    never,
    DefaultArgs
  >
> {
  let id = uuidv4();
  console.log("creating encounter in db:", { ...data, id: `E${id}` });
  return await prisma.encounter.create({
    data: { ...data, id: `E${id}` },
  });
}

export async function getNote(id: string): Promise<DataEntry> {
  return await prisma.note.findUnique({
    where: { id },
  });
}
// Get an Encounter by ID
export async function getEncounter(id: string): Promise<DataEntry> {
  return await prisma.encounter.findUnique({
    where: { id },
  });
}

// Update an existing Encounter
export async function updateEncounter(
  id: string,
  data: EncounterData
): Promise<DataEntry> {
  debugLog("updating encounter in db:", id, data);
  let updates = { ...data };
  ["npcs", "initiativeOrder", "notes", "locations", "characters"].forEach(
    (a) => {
      if (!updates.hasOwnProperty(a)) {
        updates[a] = [];
      }
    }
  );
  return await prisma.encounter.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(updates) },
  });
}
export async function updateNote(
  id: string,
  data: NoteData
): Promise<DataEntry> {
  debugLog("updating note in db:", id, data);
  let updates = { ...data };
  ["images"].forEach((a) => {
    if (!updates.hasOwnProperty(a)) {
      updates[a] = [];
    }
  });
  return await prisma.note.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(updates) },
  });
}
// Delete an Encounter
export async function deleteEncounter(id: string): Promise<DataEntry> {
  return await prisma.encounter.delete({
    where: { id },
  });
}
export async function deleteNote(id: string): Promise<DataEntry> {
  return await prisma.note.delete({
    where: { id },
  });
}
