/*
  Warnings:

  - The primary key for the `npc` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bio` on the `npc` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `npc` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN "name" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
