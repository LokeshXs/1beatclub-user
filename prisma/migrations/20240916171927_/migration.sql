/*
  Warnings:

  - Added the required column `videoId` to the `ListedSongs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListedSongs" ADD COLUMN     "videoId" TEXT NOT NULL;
