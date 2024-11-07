/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `MusicClub` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `MusicClub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MusicClub" ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MusicClub_adminId_key" ON "MusicClub"("adminId");
