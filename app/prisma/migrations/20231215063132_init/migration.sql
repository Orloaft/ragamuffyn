/*
  Warnings:

  - You are about to drop the column `description` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT
);
INSERT INTO "new_item" ("id") SELECT "id" FROM "item";
DROP TABLE "item";
ALTER TABLE "new_item" RENAME TO "item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
