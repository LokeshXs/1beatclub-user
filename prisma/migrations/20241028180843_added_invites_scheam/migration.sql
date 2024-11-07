/*
  Warnings:

  - You are about to drop the column `clubName` on the `Invites` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invites" DROP COLUMN "clubName",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "MusicClub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
