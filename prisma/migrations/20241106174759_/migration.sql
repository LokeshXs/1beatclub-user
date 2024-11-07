/*
  Warnings:

  - Changed the type of `status` on the `Invites` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InviteState" AS ENUM ('ACCEPT', 'DECLINE', 'PENDING');

-- AlterTable
ALTER TABLE "Invites" DROP COLUMN "status",
ADD COLUMN     "status" "InviteState" NOT NULL;
