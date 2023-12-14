-- CreateTable
CREATE TABLE "character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "race" TEXT,
    "class" TEXT,
    "level" INTEGER,
    "data" TEXT
);

-- CreateTable
CREATE TABLE "npc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "race" TEXT,
    "bio" TEXT,
    "data" TEXT
);

-- CreateTable
CREATE TABLE "item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "icon" TEXT
);

-- CreateTable
CREATE TABLE "campaign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT
);
