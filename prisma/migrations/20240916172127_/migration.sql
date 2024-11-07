/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `ListedSongs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ListedSongs_videoId_key" ON "ListedSongs"("videoId");
