/*
  Warnings:

  - The primary key for the `Trophies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Name ` on the `Trophies` table. All the data in the column will be lost.
  - You are about to drop the column `Price ` on the `Ranks` table. All the data in the column will be lost.
  - Added the required column `name` to the `Trophies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Ranks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trophies" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "emoji" TEXT NOT NULL,
    "price" DECIMAL NOT NULL
);
INSERT INTO "new_Trophies" ("emoji", "price") SELECT "emoji", "price" FROM "Trophies";
DROP TABLE "Trophies";
ALTER TABLE "new_Trophies" RENAME TO "Trophies";
CREATE UNIQUE INDEX "Trophies_emoji_key" ON "Trophies"("emoji");
CREATE TABLE "new_Players" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "credits" DECIMAL DEFAULT 0,
    "trophy_name" TEXT,
    "rank_name" TEXT,
    CONSTRAINT "Players_trophy_name_fkey" FOREIGN KEY ("trophy_name") REFERENCES "Trophies" ("name") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Players_rank_name_fkey" FOREIGN KEY ("rank_name") REFERENCES "Ranks" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Players" ("credits", "rank_name", "trophy_name", "uid") SELECT "credits", "rank_name", "trophy_name", "uid" FROM "Players";
DROP TABLE "Players";
ALTER TABLE "new_Players" RENAME TO "Players";
CREATE TABLE "new_Ranks" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "price" DECIMAL NOT NULL
);
INSERT INTO "new_Ranks" ("name") SELECT "name" FROM "Ranks";
DROP TABLE "Ranks";
ALTER TABLE "new_Ranks" RENAME TO "Ranks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
