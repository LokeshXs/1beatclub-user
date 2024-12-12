import prisma from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { error } from "console";

export class Club {
  private static clubInstance: Club;

  private constructor() {}

  static getInstance() {
    if (this.clubInstance) {
      return this.clubInstance;
    }
    this.clubInstance = new Club();

    return this.clubInstance;
  }


  // get a club

  async getClub(clubId:string){

    const club = await prisma.musicClub.findUnique({
      where:{
        id:clubId
      }
    });

    return club

  }

  //   Invite a user to club
  async inviteToClub(clubId: string, userId: string) {
    try {
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

      return true;
    } catch (err) {
      return false;
    }
  }

  //   send club invite

  async sendClubInvite(clubId: string, toUserId: string, adminId: string) {
    try {
      await prisma.invites.create({
        data: {
          status: "PENDING",
          clubId: clubId,
          toUserId: toUserId,
          adminId: adminId,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }
  //   get Invite

  async getInvite(clubId: string, toUserId: string, adminId: string) {
    try {
      const invite = await prisma.invites.findUnique({
        where: {
          inviteId: {
            clubId: clubId,
            toUserId: toUserId,
            adminId: adminId,
          },
        },
      });

      return invite;
    } catch (err) {
      return null;
    }
  }
  //   get Invite

  async updateInvite(
    clubId: string,
    toUserId: string,
    adminId: string,
    status: $Enums.InviteState
  ) {
    try {
      const invite = await prisma.invites.update({
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

      return invite;
    } catch (err) {
      return null;
    }
  }

  //Remove a song from club
  async removeSong(clubId: string, songId: string) {
    try {
      await prisma.musicClub.update({
        where: {
          id: clubId,
        },
        data: {
          songs: {
            delete: {
              id: songId,
            },
          },
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  // Update current playing song

  async updateCurrentSong(songId: string | null, clubId: string) {
    try {
      await prisma.musicClub.update({
        where: {
          id: clubId,
        },
        data: {
          currentlyPlayingSongId: songId,
        },
      });

      return {
        status: "success",
        message: "current song is updated",
      };
    } catch (err) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }
  }

  //GET current song in club

  async getCurrentSongInClub(clubId: string) {
    try {
      const res = await prisma.musicClub.findFirst({
        where: {
          id: clubId,
        },
        select: {
          currentlyPlayingSongId: true,
        },
      });

      if (!res) {
        throw new Error();
      }

      return {
        status: "success",
        message: "current song is updated",
        data: res.currentlyPlayingSongId,
      };
    } catch (err) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }
  }
}

export default Club.getInstance();
