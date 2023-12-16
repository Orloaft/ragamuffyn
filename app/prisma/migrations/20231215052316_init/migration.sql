/*
  Warnings:

  - You are about to drop the `encounter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `campaign` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `campaign` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `campaign` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `item` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `item` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `npc` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `npc` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "encounter";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "location";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_campaign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT
);
INSERT INTO "new_campaign" ("data", "id") SELECT "data", "id" FROM "campaign";
DROP TABLE "campaign";
ALTER TABLE "new_campaign" RENAME TO "campaign";
CREATE TABLE "new_item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "icon" TEXT
);
INSERT INTO "new_item" ("id", "name") SELECT "id", "name" FROM "item";
DROP TABLE "item";
ALTER TABLE "new_item" RENAME TO "item";
CREATE TABLE "new_npc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "race" TEXT,
    "bio" TEXT,
    "data" TEXT
);
INSERT INTO "new_npc" ("data", "id", "name") SELECT "data", "id", "name" FROM "npc";
DROP TABLE "npc";
ALTER TABLE "new_npc" RENAME TO "npc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
