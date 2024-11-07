-- CreateTable
CREATE TABLE "Invites" (
    "id" SERIAL NOT NULL,
    "clubId" TEXT NOT NULL,
    "clubName" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "Invites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
