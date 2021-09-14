/*
  Warnings:

  - You are about to drop the `Trophies ` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "sqlite_autoindex_Trophies _2";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Trophies ";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Trophies" (
    "Name " TEXT NOT NULL PRIMARY KEY,
    "emoji" TEXT NOT NULL,
    "price" DECIMAL NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Players" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "credits" DECIMAL DEFAULT 0,
    "trophy_name" TEXT,
    "rank_name" TEXT,
    CONSTRAINT "Players_trophy_name_fkey" FOREIGN KEY ("trophy_name") REFERENCES "Trophies" ("Name ") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Players_rank_name_fkey" FOREIGN KEY ("rank_name") REFERENCES "Ranks" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Players" ("credits", "rank_name", "trophy_name", "uid") SELECT "credits", "rank_name", "trophy_name", "uid" FROM "Players";
DROP TABLE "Players";
ALTER TABLE "new_Players" RENAME TO "Players";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Trophies _2" ON "Trophies"("emoji");
Pragma writable_schema=0;
