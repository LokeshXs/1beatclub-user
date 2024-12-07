import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { signInFormSchema } from "./schema/schema";
import Google from "next-auth/providers/google";
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
          const validateValues = signInFormSchema.safeParse(credentials);

          if (!validateValues.success) {
            throw new Error("Please check input values");
          }
      
          const { email } = validateValues.data;
          
          let user = await userInstance.doesUserExist(email);
       

          return user;
        } catch (error) {
          return null;
        }
      },
    }),

    Google,
  ],
 } satisfies NextAuthConfig