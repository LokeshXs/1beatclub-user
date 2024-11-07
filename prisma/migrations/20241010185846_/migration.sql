-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clubId" TEXT;

-- CreateTable
CREATE TABLE "MusicClub" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MusicClub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "MusicClub"("id") ON DELETE SET NULL ON UPDATE CASCADE;
