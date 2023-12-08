import { matchSorter } from "match-sorter";
import type { character, item, npc } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export interface Character {
  id?: number;
  name?: string;
  race?: string;
  class?: string;
  level?: number | string;
  // Add other character attributes as needed
}

export interface Item {
  id?: number;
  name?: string;
  description?: string;
}
export interface NPC {
  id?: number;
  name?: string;
  race?: string;
  bio?: string;
}
const prisma = new PrismaClient();

// Define a mapping from model names to Prisma client methods
const modelAccessors = {
  character: prisma.character,
  item: prisma.item,
  npc: prisma.npc,
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
  return getData<Character>("character", query, "level");
}

export async function getItems(query?: string | null): Promise<Item[]> {
  return getData<Item>("item", query, "name");
}

export async function getNpcs(query?: string | null): Promise<NPC[]> {
  return getData<NPC>("npc", query, "name");
}
export async function createNpc(data: NPC): Promise<NPC> {
  return await prisma.npc.create({
    data,
  });
}

export async function updateNpc(id: number, data: NPC): Promise<NPC> {
  return await prisma.npc.update({
    where: { id },
    data,
  });
}

export async function deleteNpc(id: number): Promise<NPC> {
  return await prisma.npc.delete({
    where: { id },
  });
}
export async function createItem(data: Item): Promise<Item> {
  return await prisma.item.create({
    data,
  });
}

export async function updateItem(id: number, data: Item): Promise<Item> {
  return await prisma.item.update({
    where: { id },
    data,
  });
}
export async function getItem(id: number): Promise<Item | null> {
  return await prisma.item.findUnique({
    where: { id },
  });
}
export async function getNpc(id: number): Promise<NPC | null> {
  return await prisma.npc.findUnique({
    where: { id },
  });
}
export async function getCharacter(id: number): Promise<Character | null> {
  return await prisma.character.findUnique({
    where: { id },
  });
}

export async function deleteItem(id: number): Promise<Item> {
  return await prisma.item.delete({
    where: { id },
  });
}
export async function createCharacter(data: Character): Promise<Character> {
  return await prisma.character.create({
    data,
  });
}

export async function updateCharacter(
  id: number,
  data: Character
): Promise<Character> {
  return await prisma.character.update({
    where: { id },
    data: { ...data, level: parseInt(data.level, 10) },
  });
}

export async function deleteCharacter(id: number): Promise<Character> {
  return await prisma.character.delete({
    where: { id },
  });
}
