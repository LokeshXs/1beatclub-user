// Singleton User class
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export class User {
  private static userInstance: User;

  private constructor() {}

  static getInstance() {
    if (this.userInstance) {
      return this.userInstance;
    }

    this.userInstance = new User();

    return this.userInstance;
  }

  //   TO CHECK IF USER EXIST ALREADY
  async doesUserExist(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  //   TO CREATE A USER

  async createUser({ name, email, password }: Record<string, string>) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  // GET USER BY ID

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  // GET USER BY EMAIL

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    return user;
  }

  //GET CLUBS FOR A USER
  async getUserClubs(id: string) {
    const clubs = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        myMusicClub: {
          select: {
            id: true,
            name: true,
            adminId: true,
          },
        },
      },
    });

    return clubs?.myMusicClub || [];
  }
  //GET CLUBS USER PART OF
  async getClubsUserPartOf(id: string) {
    const clubs = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        musicClubs: {
          select: {
            id: true,
            name: true,
            adminId: true,
          },
        },
      },
    });

    return clubs?.musicClubs || [];
  }

  // To check if user is a premium user
  async isAPremiumUser(id: string) {
    const res = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        isPremiumMember: true,
      },
    });

    return res?.isPremiumMember || false;
  }

  // To Subscribe user to premium
  async makeUserPremium(id: string) {
    const res = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isPremiumMember: true,
      },
      select: {
        isPremiumMember: true,
      },
    });

    return res?.isPremiumMember || false;
  }

  // To get user invites
  async getInvites(id: string) {
    const res = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        receivedInvites: {
          where: {
            status: "PENDING",
          },
          select: {
            adminId:true,
            clubId:true,
            toUserId:true,
            Club: {
              select: {
                name: true,
              },
            },
            admin: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });


    return res;
  }


 
}

export default User.getInstance();
