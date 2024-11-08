import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      isPremiumMember: boolean;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  callbacks: {
    jwt: async ({ token, account }) => {
     

      if (!token.sub) {
        return token;
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        select: {
          role: true,
          isPremiumMember: true,
        },
      });

      token.role = existingUser?.role;
      token.isPremiumMember = existingUser?.isPremiumMember;
      return token;
    },

    session: async ({ token, session, user }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
        session.user.isPremiumMember = token.isPremiumMember as boolean;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),
});
