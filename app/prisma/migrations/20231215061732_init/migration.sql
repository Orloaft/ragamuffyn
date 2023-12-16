/*
  Warnings:

  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
