-- CreateTable
CREATE TABLE "ClubInvitationUrl" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubInvitationUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClubInvitationUrl_token_key" ON "ClubInvitationUrl"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ClubInvitationUrl_clubId_token_key" ON "ClubInvitationUrl"("clubId", "token");
