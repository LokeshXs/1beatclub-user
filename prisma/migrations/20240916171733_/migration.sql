-- CreateTable
CREATE TABLE "ListedSongs" (
    "id" TEXT NOT NULL,
    "songTitle" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,

    CONSTRAINT "ListedSongs_pkey" PRIMARY KEY ("id")
);
