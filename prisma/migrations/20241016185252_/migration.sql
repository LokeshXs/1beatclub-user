/*
  Warnings:

  - You are about to drop the column `clubId` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `ListedSongs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_songId_fkey";

-- AlterTable
ALTER TABLE "ListedSongs" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clubId";

-- CreateTable
CREATE TABLE "_songsinclub" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_musicclubs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_songsinclub_AB_unique" ON "_songsinclub"("A", "B");

-- CreateIndex
CREATE INDEX "_songsinclub_B_index" ON "_songsinclub"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_musicclubs_AB_unique" ON "_musicclubs"("A", "B");

-- CreateIndex
CREATE INDEX "_musicclubs_B_index" ON "_musicclubs"("B");

-- AddForeignKey
ALTER TABLE "ListedSongs" ADD CONSTRAINT "ListedSongs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_songId_fkey" FOREIGN KEY ("songId") REFERENCES "ListedSongs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicClub" ADD CONSTRAINT "MusicClub_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_songsinclub" ADD CONSTRAINT "_songsinclub_A_fkey" FOREIGN KEY ("A") REFERENCES "ListedSongs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_songsinclub" ADD CONSTRAINT "_songsinclub_B_fkey" FOREIGN KEY ("B") REFERENCES "MusicClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_musicclubs" ADD CONSTRAINT "_musicclubs_A_fkey" FOREIGN KEY ("A") REFERENCES "MusicClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_musicclubs" ADD CONSTRAINT "_musicclubs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
