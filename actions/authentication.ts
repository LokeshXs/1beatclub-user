"use server";
import { signInFormSchema, signupFormSchema } from "@/schema/schema";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import userInstance from "@/services/User";

export async function signUpAction(values: z.infer<typeof signupFormSchema>) {
  try {
    const validateValues = signupFormSchema.safeParse(values);

    if (!validateValues.success) {
      return {
        status: "error",
        message: "Values are invalid",
      };
    }

    const { name, email, password } = validateValues.data;

    const isUserAlreadyExist = await userInstance.doesUserExist(email);

    if (isUserAlreadyExist) {
      return {
        status: "error",
        message: "User Already Exist",
      };
    }

    await userInstance.createUser({ name, email, password });

    return {
      status: "success",
      message: "User is successfully signed up",
    };
  } catch (error) {
    return {
      status: "error",
      message: "something went wrong",
    };
  }
}

export async function signInAction(values: z.infer<typeof signInFormSchema>) {
  try {
     await signIn("credentials", {
      ...values,
      redirectTo: "/dashboard",
    });

    return {
      status: "success",
      message: "Welcome dude!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", message: "Invalid Credentials" };

        case "CredentialsSignin":
          throw error;

        default:
          return {
            status: "error",
            message: "something went wrong",
          };
      }
    } else if (isRedirectError(error)) {
      throw error;
    } else {
      return {
        status: "error",
        message: "something went wrong",
      };
    }
  }
}

export async function googleSignIn() {
  await signIn("google", { redirectTo: "/dashboard" });
}
