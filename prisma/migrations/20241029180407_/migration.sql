/*
  Warnings:

  - Added the required column `currentlyPlayingSongId` to the `MusicClub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MusicClub" ADD COLUMN     "currentlyPlayingSongId" TEXT NOT NULL;
