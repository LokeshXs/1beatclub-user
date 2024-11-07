/*
  Warnings:

  - The primary key for the `Votes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Votes_pkey" PRIMARY KEY ("id");
