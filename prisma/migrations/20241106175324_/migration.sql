/*
  Warnings:

  - The primary key for the `Invites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Invites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invites" DROP CONSTRAINT "Invites_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Invites_pkey" PRIMARY KEY ("clubId", "toUserId", "adminId");
