/*
  Warnings:

  - You are about to drop the column `class` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `npc` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `npc` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "campaign" ADD COLUMN "name" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "data" TEXT
);
INSERT INTO "new_character" ("data", "id", "name") SELECT "data", "id", "name" FROM "character";
DROP TABLE "character";
ALTER TABLE "new_character" RENAME TO "character";
CREATE TABLE "new_item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "data" TEXT
);
INSERT INTO "new_item" ("id", "name") SELECT "id", "name" FROM "item";
DROP TABLE "item";
ALTER TABLE "new_item" RENAME TO "item";
CREATE TABLE "new_npc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "data" TEXT
);
INSERT INTO "new_npc" ("data", "id", "name") SELECT "data", "id", "name" FROM "npc";
DROP TABLE "npc";
ALTER TABLE "new_npc" RENAME TO "npc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
