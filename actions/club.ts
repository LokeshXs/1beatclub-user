"use server";

import { createClubFormSchema } from "@/schema/schema";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import clubInstance from "@/services/Club";

export const createClubAction = async (
  values: z.infer<typeof createClubFormSchema>
) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Not logged in");
    }
    const userId = session.user.id!;
    const validateInput = createClubFormSchema.safeParse(values);
    if (!validateInput.success) {
      return {
        status: "error",
        message: "Inputs are not valid",
      };
    }

    const { name } = validateInput.data;

    const newClub = await prisma.musicClub.create({
      data: {
        name: name,
        adminId: userId,
      },
    });

    await prisma.musicClub.update({
      where: {
        id: newClub.id,
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
      message: "Club successfully created!",
    };
  } catch (err) {
    // console.log(err);

    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          status: "error",
          message: "Cannot create more than one club!",
        };
      }
    }
    return {
      status: "error",
      message: "something went wrong",
    };
  }
};

export const removeSongfromClub = async (songId: string, clubId: string) => {
  try {
    const res = await clubInstance.removeSong(clubId, songId);

    if (!res) {
      throw new Error("Cannot remove song from backend");
    }

    return {
      status: "success",
      message: "Song removed successfully",
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err.message ? err.message : "Something went wrong",
    };
  }
};

export const updateCurrentlyPlayingSong = async (
  songId: string | null,
  clubId: string
) => {
  try {
    const res = await clubInstance.updateCurrentSong(songId, clubId);

    if (res.status === "error") {
      throw new Error("Cannot update current song");
    }

    return {
      status: "success",
      message: "Current song updated successfully",
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err.message ? err.message : "Something went wrong",
    };
  }
};

export const getCurrentSongInClub = async (clubId: string) => {
  try {
    const res = await clubInstance.getCurrentSongInClub(clubId);

    if (res.status === "error") {
      throw new Error("clubid is incorrect");
    }

    return {
      status: "success",
      message: "Fetched the current song successfully",
      data: res.data,
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err.message ? err.message : "Something went wrong",
    };
  }
};
