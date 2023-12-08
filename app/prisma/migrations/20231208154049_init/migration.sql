-- CreateTable
CREATE TABLE "Npc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "race" TEXT,
    "bio" TEXT
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "race" TEXT,
    "class" TEXT,
    "level" INTEGER
);
INSERT INTO "new_Character" ("class", "id", "level", "name", "race") SELECT "class", "id", "level", "name", "race" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
