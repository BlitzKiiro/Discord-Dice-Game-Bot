-- CreateTable
CREATE TABLE "Games Records" (
    "played" INTEGER DEFAULT 0,
    "won" INTEGER DEFAULT 0,
    "uid" TEXT NOT NULL,
    "sid" TEXT NOT NULL,

    PRIMARY KEY ("uid", "sid"),
    CONSTRAINT "Games Records_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Players" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Games Records_sid_fkey" FOREIGN KEY ("sid") REFERENCES "Servers" ("sid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Players" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "credits" DECIMAL DEFAULT 0,
    "trophy_name" TEXT,
    "rank_name" TEXT,
    CONSTRAINT "Players_trophy_name_fkey" FOREIGN KEY ("trophy_name") REFERENCES "Trophies " ("Name ") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Players_rank_name_fkey" FOREIGN KEY ("rank_name") REFERENCES "Ranks" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Servers" (
    "sid" TEXT NOT NULL PRIMARY KEY,
    "no of players" INTEGER DEFAULT 0,
    "no of games " INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "Ranks" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "Price " DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Trophies " (
    "Name " TEXT NOT NULL PRIMARY KEY,
    "emoji" TEXT NOT NULL,
    "price" DECIMAL NOT NULL
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Trophies _2" ON "Trophies "("emoji");
Pragma writable_schema=0;
