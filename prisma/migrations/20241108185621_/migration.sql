/*
  Warnings:

  - You are about to drop the column `expirest_at` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "expirest_at",
ADD COLUMN     "expires_at" INTEGER;
