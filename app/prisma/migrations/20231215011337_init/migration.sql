/*
  Warnings:

  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `character` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `campaign` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `npc` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "icon" TEXT
);
INSERT INTO "new_item" ("description", "icon", "id", "name") SELECT "description", "icon", "id", "name" FROM "item";
DROP TABLE "item";
ALTER TABLE "new_item" RENAME TO "item";
CREATE TABLE "new_character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "race" TEXT,
    "class" TEXT,
    "level" INTEGER,
    "data" TEXT
);
INSERT INTO "new_character" ("class", "data", "id", "level", "name", "race") SELECT "class", "data", "id", "level", "name", "race" FROM "character";
DROP TABLE "character";
ALTER TABLE "new_character" RENAME TO "character";
CREATE TABLE "new_campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT
);
INSERT INTO "new_campaign" ("data", "id") SELECT "data", "id" FROM "campaign";
DROP TABLE "campaign";
ALTER TABLE "new_campaign" RENAME TO "campaign";
CREATE TABLE "new_npc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "race" TEXT,
    "bio" TEXT,
    "data" TEXT
);
INSERT INTO "new_npc" ("bio", "data", "id", "name", "race") SELECT "bio", "data", "id", "name", "race" FROM "npc";
DROP TABLE "npc";
ALTER TABLE "new_npc" RENAME TO "npc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
