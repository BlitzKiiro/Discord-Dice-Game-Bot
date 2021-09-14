/*
  Warnings:

  - You are about to alter the column `price` on the `Ranks` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `BigInt`.
  - You are about to alter the column `price` on the `Trophies` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ranks" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "price" BIGINT NOT NULL
);
INSERT INTO "new_Ranks" ("name", "price") SELECT "name", "price" FROM "Ranks";
DROP TABLE "Ranks";
ALTER TABLE "new_Ranks" RENAME TO "Ranks";
CREATE TABLE "new_Trophies" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "price" BIGINT NOT NULL
);
INSERT INTO "new_Trophies" ("name", "price") SELECT "name", "price" FROM "Trophies";
DROP TABLE "Trophies";
ALTER TABLE "new_Trophies" RENAME TO "Trophies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
