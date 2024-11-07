"use server";

import clubInstance from "@/services/Club";
import prisma from "@/lib/prisma";

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
  } catch (err:any) {
    return {
      status: "error",
      message: err.message ||"Cannot send invite, Try again!",
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
