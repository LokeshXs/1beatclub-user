"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function upvoteInDB(songId: string) {
  const session = await auth();

  try {
    await prisma.votes.create({
      data: {
        songId: songId,
        userId: session?.user.id!,
      },
    });

    return {
      status: "success",
      message: "upvoted",
    };
  } catch (err) {
    return {
      status: "error",
      message: "something went wrong",
    };
  }
}
export async function DownVoteInDB(songId: string) {
  const session = await auth();

  try {
    await prisma.votes.delete({
      where: {
        songId_userId: {
          songId: songId,
          userId: session?.user.id!,
        },
      },
    });

    return {
      status: "success",
      message: "downvoted",
    };
  } catch (err) {
    return {
      status: "error",
      message: "something went wrong",
    };
  }
}

export async function removeSongInDB(songId: string) {
  try {


    await prisma.listedSongs.delete({
      where: {
        id: songId,
      },
    });

    return {
      status: "success",
      message: "downvoted",
    };
  } catch (err) {
    return {
      status: "error",
      message: "something went wrong",
    };
  }
}
