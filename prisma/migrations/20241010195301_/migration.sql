/*
  Warnings:

  - Added the required column `clubId` to the `ListedSongs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListedSongs" ADD COLUMN     "clubId" TEXT NOT NULL;
