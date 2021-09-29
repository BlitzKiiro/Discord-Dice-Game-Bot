-- CreateTable
CREATE TABLE "Games Records" (
    "played" INTEGER DEFAULT 0,
    "won" INTEGER DEFAULT 0,
    "uid" TEXT NOT NULL,
    "sid" TEXT NOT NULL,

    CONSTRAINT "Games Records_pkey" PRIMARY KEY ("uid","sid")
);

-- CreateTable
CREATE TABLE "Players" (
    "uid" TEXT NOT NULL,
    "credits" BIGINT DEFAULT 0,
    "trophy_name" TEXT,
    "rank_name" TEXT,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Ranks" (
    "name" TEXT NOT NULL,
    "price" BIGINT NOT NULL,

    CONSTRAINT "Ranks_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Trophies" (
    "name" TEXT NOT NULL,
    "price" BIGINT NOT NULL,

    CONSTRAINT "Trophies_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Games Records" ADD CONSTRAINT "Games Records_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Players"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_trophy_name_fkey" FOREIGN KEY ("trophy_name") REFERENCES "Trophies"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_rank_name_fkey" FOREIGN KEY ("rank_name") REFERENCES "Ranks"("name") ON DELETE SET NULL ON UPDATE CASCADE;
