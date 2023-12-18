import { matchSorter } from "match-sorter";
import type { character, item, npc } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
export interface Character {
  id: string;
  name?: string;
  data?: string;
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
  return await prisma.item.create({
    data: { ...data, id: `I${id}` },
  });
}
export async function createCampaign(data: any): Promise<Campaign> {
  let id = uuidv4();
  return await prisma.campaign.create({
    data: { id: `C${id}`, name: data.name, data: JSON.stringify(data) },
  });
}
export async function updateItem(id: string, data: any): Promise<Item> {
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
  return await prisma.character.create({
    data: { ...data, id: `H${id}` },
  });
}

export async function updateCharacter(
  id: string,
  data: any
): Promise<Character> {
  console.log("updating character:", data);
  return await prisma.character.update({
    where: { id },
    data: {
      name: data.name,
      data: JSON.stringify(data),
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
  return await prisma.location.update({
    where: { id },
    data: { name: data.name, data: JSON.stringify(data) },
  });
}

// Create a new Encounter
export async function createEncounter(data: any): Promise<any> {
  let id = uuidv4();
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
  console.log("new data:", newData);
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
  console.log("getting old data: ", oldData);
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
