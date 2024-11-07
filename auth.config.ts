import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { signInFormSchema } from "./schema/schema";
import google from "next-auth/providers/google";
import userInstance from "@/services/User";

 
export default { providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },

      authorize: async (credentials) => {
        try {
          let user = null;

          const validateValues = signInFormSchema.safeParse(credentials);

          if (!validateValues.success) {
            throw new Error("Please check input values");
          }

          const { email, password } = validateValues.data;

          user = await userInstance.doesUserExist(email);

          if (!user) {
            throw new Error("User Not Found");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("User email or password incorrect");
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),

    google,
  ],
 } satisfies NextAuthConfig