/*
  Warnings:

  - You are about to drop the column `isEmailVerfied` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isEmailVerfied",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
