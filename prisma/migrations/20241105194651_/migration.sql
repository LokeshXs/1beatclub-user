/*
  Warnings:

  - Made the column `currentlyPlayingSongId` on table `MusicClub` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MusicClub" ALTER COLUMN "currentlyPlayingSongId" SET NOT NULL,
ALTER COLUMN "currentlyPlayingSongId" SET DEFAULT '';
