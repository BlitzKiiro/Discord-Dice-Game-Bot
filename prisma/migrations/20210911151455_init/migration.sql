/*
  Warnings:

  - You are about to drop the column `emoji` on the `Trophies` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Trophies_emoji_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trophies" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "price" DECIMAL NOT NULL
);
INSERT INTO "new_Trophies" ("name", "price") SELECT "name", "price" FROM "Trophies";
DROP TABLE "Trophies";
ALTER TABLE "new_Trophies" RENAME TO "Trophies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
