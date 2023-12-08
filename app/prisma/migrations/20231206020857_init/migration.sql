-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "level" INTEGER NOT NULL
);
