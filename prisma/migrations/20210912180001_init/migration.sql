/*
  Warnings:

  - You are about to alter the column `credits` on the `Players` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Players" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "credits" BIGINT DEFAULT 0,
    "trophy_name" TEXT,
    "rank_name" TEXT,
    CONSTRAINT "Players_trophy_name_fkey" FOREIGN KEY ("trophy_name") REFERENCES "Trophies" ("name") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Players_rank_name_fkey" FOREIGN KEY ("rank_name") REFERENCES "Ranks" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Players" ("credits", "rank_name", "trophy_name", "uid") SELECT "credits", "rank_name", "trophy_name", "uid" FROM "Players";
DROP TABLE "Players";
ALTER TABLE "new_Players" RENAME TO "Players";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
