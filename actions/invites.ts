"use server";

import clubInstance from "@/services/Club";
import prisma from "@/lib/prisma";
import { generateClubInviteUrl, getToken } from "@/lib/utils";
import { auth } from "@/auth";

export async function sendClubInvite(
  toUserId: string,
  clubId: string,
  adminId: string
) {
  try {
    // Checking if invite is already sent
    const isInviteSent = await clubInstance.getInvite(
      clubId,
      toUserId,
      adminId
    );

    if (isInviteSent) {
      if (
        isInviteSent.status === "ACCEPT" ||
        isInviteSent.status === "PENDING"
      ) {
        throw new Error("Invite is already sent!");
      } else if (isInviteSent.status === "DECLINE") {
        await clubInstance.updateInvite(clubId, toUserId, adminId, "PENDING");
      }
    } else {
      await clubInstance.sendClubInvite(clubId, toUserId, adminId);
    }

    return {
      status: "success",
      message: "Invite Sent Successfully!",
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err.message || "Cannot send invite, Try again!",
    };
  }
}

export async function acceptOrDeclineInvite(
  toUserId: string,
  clubId: string,
  adminId: string,
  status: "ACCEPT" | "DECLINE"
) {
  try {
    //todo: Add a transaction here to allow accept invite only if both queries are done
    const res = await prisma.invites.update({
      where: {
        inviteId: {
          clubId: clubId,
          toUserId: toUserId,
          adminId: adminId,
        },
      },
      data: {
        status: status,
      },
    });

    await prisma.musicClub.update({
      where: {
        id: res.clubId,
      },
      data: {
        users: {
          connect: {
            id: res.toUserId,
          },
        },
      },
    });

    const responseMessage =
      status === "ACCEPT" ? "Invite Accepted" : "Invite Declined";
    return {
      status: "success",
      message: responseMessage,
    };
  } catch (err) {
    return {
      status: "error",
      message: "Cannot send invite, Try again!",
    };
  }
}

export async function generateClubUrlInvite(clubId: string) {
  try {
    const tokenObj = getToken();

    const url = generateClubInviteUrl({
      clubid: clubId,
      token: tokenObj.token,
    });

    await prisma.clubInvitationUrl.create({
      data: {
        clubId: clubId,
        token: tokenObj.token,
      },
    });

    return {
      status: "success",
      url: url,
      message: "Club Invite Url is created successfully",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Cannot create the Invite Url",
    };
  }
}

export async function addUserToClub(clubId: string) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    // check if club exist

    const club = await clubInstance.getClub(clubId);

    if (!club) {
      return {
        status: "error",
        message: "Invalid club",
      };
    }

    // check if user is already a part of club

    const user = await prisma.musicClub.findFirst({
      where: {
        id: clubId,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (user) {
      return {
        status: "error",
        message: "Your are already a part of the club",
      };
    }

    // joint the user to club

    await prisma.musicClub.update({
      where: {
        id: clubId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      status: "success",
      message: "Keep your songs ready. You are now part of the club!",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Something went, cannot add you to club!",
    };
  }
}
