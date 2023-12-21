import { matchSorter } from "match-sorter";
import type { character, item, npc } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { debugLog } from "./utils/logger";
export interface Character {
  id: string;
  name?: string;
  data?: string;
}
interface Player {
  firstName: string;
  lastName: string;
}
export interface CharData {
  [key: string]: any;
  name: string;
  level: number;
  race: string;
  class: string;
  items: string[];
}
export interface Item {
  id: string;
  name?: string;
  data?: string;
}
export interface NPC {
  id?: string;
  name?: string;
  data?: string;
}
export interface encounterData {
  name: string;
  description: string;
  location: string;
  initiativeOrder: number[]; // Array of IDs to represent the order of turns
  currentTurn: number; // ID of the character/monster whose turn it is
  round: number; // Current round of the encounter
  notes: string; // Additional notes or observations
}
export interface CampaignData {
  [key: string]: any;
  name: string;
  characters: string[];
  players: Player[];
  encounters: string[];
  locations: string[];
  plot: string;
}
export interface Campaign {
  id?: string;
  name?: string | null;
  data?: string | null;
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
};

// A generic function to get data from any model with optional query and sorting
export async function getData<T extends character | item | npc>(
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
export async function getDataByModel(model: string, q?: string | null) {
  switch (model) {
    case "characters":
      return getCharacters(q);
  }
}
export async function createDataEntry(model: string) {
  switch (model) {
    case "characters":
      return createCharacter({
        id: "",
        name: "no name",
        data: JSON.stringify({
          name: "no name",
          level: 0,
          class: "",
          race: "",
          items: [],
        }),
      });
      break;
  }
  return { id: "" };
}
// Specific functions using the generic one
export async function getCharacters(
  query?: string | null
): Promise<Character[]> {
  return getData<Character>("character", query, "name");
}

export async function getCampaigns(query?: string | null): Promise<Campaign[]> {
  return getData<Campaign>("campaign", query, "name");
}

export async function getItems(query?: string | null): Promise<Item[]> {
  return getData<Item>("item", query, "name");
}
export async function getLocations(query?: string | null): Promise<any[]> {
  return getData<any>("location", query, "name");
}
export async function getNpcs(query?: string | null): Promise<NPC[]> {
  return getData<NPC>("npc", query, "name");
}
export async function getEncounters(query?: string | null): Promise<any[]> {
  return getData<any>("encounter", query, "name");
}
export async function createNpc(data: NPC): Promise<NPC> {
  let id = uuidv4();
  debugLog("creating npc in db:", { ...data, id: `N${id}` });
  return await prisma.npc.create({
    data: { ...data, id: `N${id}` },
  });
}

export async function updateNpc(id: string, data: any): Promise<NPC> {
  return await prisma.npc.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(data) },
  });
}

export async function updateCampaign(id: string, updates: any): Promise<any> {
  debugLog("updating campaign in db:", id, updates);
  let update = { ...updates };
  ["items", "players", "encounters", "locations", "characters"].forEach((a) => {
    if (!update.hasOwnProperty(a)) {
      update[a] = [];
    }
  });

  return await prisma.campaign.update({
    where: { id },
    data: { name: updates.name, data: JSON.stringify(updates) },
  });
}
export async function deleteNpc(id: string): Promise<NPC> {
  return await prisma.npc.delete({
    where: { id },
  });
}
export async function deleteCampaign(id: string): Promise<Campaign> {
  return await prisma.campaign.delete({
    where: { id },
  });
}
export async function createItem(data: any): Promise<Item> {
  let id = uuidv4();
  debugLog("creating item in db:", { ...data, id: `I${id}` });
  return await prisma.item.create({
    data: { ...data, id: `I${id}` },
  });
}
export async function createCampaign(data: any): Promise<Campaign> {
  let id = uuidv4();
  debugLog("creating campaign in db:", { ...data, id: `C${id}` });
  return await prisma.campaign.create({
    data: { ...data, id: `C${id}` },
  });
}
export async function updateItem(id: string, data: any): Promise<Item> {
  debugLog("creating item in db:", { ...data, id: `I${id}` });
  return await prisma.item.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(data) },
  });
}
export async function getItem(id: string): Promise<Item | null> {
  return await prisma.item.findUnique({
    where: { id },
  });
}
export async function getNpc(id: string): Promise<NPC | null> {
  return await prisma.npc.findUnique({
    where: { id },
  });
}
export async function getCharacter(id: string): Promise<Character | null> {
  return await prisma.character.findUnique({
    where: { id },
  });
}
export async function getCampaign(id: string): Promise<Campaign | null> {
  return await prisma.campaign.findUnique({
    where: { id },
  });
}
export async function deleteItem(id: string): Promise<Item> {
  return await prisma.item.delete({
    where: { id },
  });
}
export async function createCharacter(data: Character): Promise<Character> {
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
  }
}
export async function updateCharacter(
  id: string,
  data: CharData
): Promise<Character> {
  debugLog("updating item in db:", id, data);
  let updates = { ...data };
  ["items"].forEach((a) => {
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

export async function deleteCharacter(id: string): Promise<Character> {
  return await prisma.character.delete({
    where: { id },
  });
}

export async function deleteLocation(id: string): Promise<Location> {
  return await prisma.location.delete({
    where: { id },
  });
}

// Create a new Location
export async function createLocation(data: any): Promise<any> {
  let id = uuidv4();
  debugLog("creating location in db:", { ...data, id: `L${id}` });
  return await prisma.location.create({
    data: { data: JSON.stringify({ ...data }), id: `L${id}` },
  });
}

// Get a Location by ID
export async function getLocation(id: string): Promise<any | null> {
  return await prisma.location.findUnique({
    where: { id },
  });
}

// Update an existing Location
export async function updateLocation(id: string, data: any): Promise<any> {
  debugLog("updating location in db:", id, data);
  return await prisma.location.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(data) },
  });
}

// Create a new Encounter
export async function createEncounter(data: any): Promise<any> {
  let id = uuidv4();
  debugLog("creating encounter in db:", { ...data, id: `E${id}` });
  return await prisma.encounter.create({
    data: { data: JSON.stringify({ ...data }), id: `E${id}` },
  });
}

// Get an Encounter by ID
export async function getEncounter(id: string): Promise<Encounter | null> {
  return await prisma.encounter.findUnique({
    where: { id },
  });
}

// Update an existing Encounter
export async function updateEncounter(
  id: string,
  data: Encounter
): Promise<Encounter> {
  debugLog("updating encounter in db:", id, data);
  return await prisma.encounter.update({
    where: { id },
    data,
  });
}

// Delete an Encounter
export async function deleteEncounter(id: string): Promise<Encounter> {
  return await prisma.encounter.delete({
    where: { id },
  });
}
async function updateModel(modelId: string, newData: string): Promise<void> {
  const modelType = modelId.charAt(0);

  switch (modelType) {
    case "C":
      await updateCampaign(modelId, newData);
      break;
    case "L":
      await updateLocation(modelId, newData);
      break;
    case "E":
      await updateEncounter(modelId, newData);
      break;
    case "H":
      await updateCharacter(modelId, newData);
      break;
    default:
      throw new Error("Invalid model type");
  }
}

export const addToDataModel = async (dataId: string, modelId: string) => {
  let oldData;
  const modelType = modelId.charAt(0);
  const dataType = dataId.charAt(0);

  // Determine model type
  switch (modelType) {
    case "C":
      oldData = await getCampaign(modelId);
      break;
    case "L":
      oldData = await getLocation(modelId);
      break;
    case "E":
      oldData = await getEncounter(modelId);
      break;
    case "H":
      oldData = await getCharacter(modelId);
      break;
    default:
      throw new Error("Invalid model type");
  }

  if (!oldData) return;

  let newData;
  let { data } = oldData as any; // Assuming 'data' is a common property

  // Determine data type and update accordingly
  data = JSON.parse(data);
  switch (dataType) {
    case "H":
      newData = {
        ...data,
        characters: data.characters
          ? [...data.characters, await getCharacter(dataId)]
          : [await getCharacter(dataId)],
      };
      break;
    case "N":
      newData = JSON.stringify({
        ...data,
        npcs: [...data.npcs, await getNpc(dataId)],
      });
      break;
    case "I":
      newData = JSON.stringify({
        ...data,
        items: [...data.items, data],
      });
      break;
    case "L":
      newData = JSON.stringify({
        ...data,
        locations: [...data.locations, await getLocation(dataId)],
      });
      break;
    default:
      throw new Error("Invalid data type");
  }

  // Update the model with new data
  await updateModel(modelId, newData);
};
