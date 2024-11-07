/*
  Warnings:

  - You are about to drop the column `votes` on the `ListedSongs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ListedSongs" DROP COLUMN "votes";

-- CreateTable
CREATE TABLE "Votes" (
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("songId")
);

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_songId_fkey" FOREIGN KEY ("songId") REFERENCES "ListedSongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
