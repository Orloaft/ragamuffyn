/*
  Warnings:

  - The primary key for the `campaign` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateTable
CREATE TABLE "encounter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "data" TEXT
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "data" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "data" TEXT
);
INSERT INTO "new_campaign" ("data", "id") SELECT "data", "id" FROM "campaign";
DROP TABLE "campaign";
ALTER TABLE "new_campaign" RENAME TO "campaign";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
