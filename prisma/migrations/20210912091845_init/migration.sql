/*
  Warnings:

  - You are about to drop the `Servers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Servers";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Games Records" (
    "played" INTEGER DEFAULT 0,
    "won" INTEGER DEFAULT 0,
    "uid" TEXT NOT NULL,
    "sid" TEXT NOT NULL,

    PRIMARY KEY ("uid", "sid"),
    CONSTRAINT "Games Records_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Players" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Games Records" ("played", "sid", "uid", "won") SELECT "played", "sid", "uid", "won" FROM "Games Records";
DROP TABLE "Games Records";
ALTER TABLE "new_Games Records" RENAME TO "Games Records";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
