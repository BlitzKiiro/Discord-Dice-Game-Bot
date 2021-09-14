/*
  Warnings:

  - You are about to drop the column `no of games ` on the `Servers` table. All the data in the column will be lost.
  - You are about to drop the column `no of players` on the `Servers` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Servers" (
    "sid" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Servers" ("sid") SELECT "sid" FROM "Servers";
DROP TABLE "Servers";
ALTER TABLE "new_Servers" RENAME TO "Servers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
