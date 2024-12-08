"use server";
import {
  forgotPasswordFormSchema,
  resetPasswordFormSchema,
  signInFormSchema,
  signupFormSchema,
} from "@/schema/schema";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import userInstance from "@/services/User";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { BASE_URL } from "@/lib/config";
import bcrypt from "bcryptjs";

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


    // todo: LATER verfication

  //   const token = uuidv4();
  // // token expires after 5 mins
  // const expires = new Date(new Date().getTime() + (15*60 * 1000));

  // const existingToken = await prisma.emailVerificationToken.findFirst({
  //   where: {
  //     email: email,
  //   },
  // });

  // if (existingToken) {
  //   await prisma.emailVerificationToken.delete({
  //     where: {
  //       id: existingToken.id,
  //     },
  //   });
  // }

  // const newEmailVerificationToken = await prisma.emailVerificationToken.create({
  //   data: {
  //     email: email,
  //     token: token,
  //     expires: expires,
  //   },
  // });

  // const emailVerificationLink = `${BASE_URL}/verify-account?token=${newEmailVerificationToken.token}`;


    return {
      status: "success",
      message: "Signed Up Successfully!",
    //   verificationLink:emailVerificationLink,
    //  name:name
      
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
    const validateValues = signInFormSchema.safeParse(values);

    if (!validateValues.success) {
      throw new Error("Please check input values");
    }

    const { email, password } = validateValues.data;

    let user = await userInstance.doesUserExist(email);

    if (!user) {
      throw new Error("User Not Found");
    }

    // if (!user.emailVerified) {

      


    // const token = uuidv4();
    // // token expires after 5 mins
    // const expires = new Date(new Date().getTime() + (15*60 * 1000));
  
    // const existingToken = await prisma.emailVerificationToken.findFirst({
    //   where: {
    //     email: email,
    //   },
    // });
  
    // if (existingToken) {
    //   await prisma.emailVerificationToken.delete({
    //     where: {
    //       id: existingToken.id,
    //     },
    //   });
    // }
  
    // const newEmailVerificationToken = await prisma.emailVerificationToken.create({
    //   data: {
    //     email: email,
    //     token: token,
    //     expires: expires,
    //   },
    // });
  
    // const emailVerificationLink = `${BASE_URL}/verify-account?token=${newEmailVerificationToken.token}`;
    //   return {
    //     status: "success",
    //     message: "Confirmation email sent!",
    //     verificationLink:emailVerificationLink,
    //     name:user.name
    //   };
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password || "");

    if (!isPasswordValid) {
      throw new Error("User email or password incorrect");
    }

    await signIn("credentials", {
      ...values,
      redirectTo: "/dashboard",
    });

    return {
      status: "success",
      message: "Welcome dude!",
    };
  } catch (error: any) {
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
        message: error.message || "something went wrong",
      };
    }
  }
}

export async function googleSignIn() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    } else {
      return {
        status: "error",
        message: "something went wrong",
      };
    }
  }
}

export async function forgotPasswordAction(
  values: z.infer<typeof forgotPasswordFormSchema>
) {
  try {
    const validateInput = forgotPasswordFormSchema.safeParse(values);

    if (!validateInput.success) {
      return {
        status: "error",
        message: "Invalid inputs!",
      };
    }

    const { email } = validateInput.data;

    const user = await userInstance.getUserByEmail(email);

    if (!user) {
      return {
        status: "error",
        message: "No user found!",
      };
    }

    if (!user.password) {
      return {
        status: "error",
        message: "You are using google sign in!",
      };
    }

    const token = uuidv4();

    // token expires after 5 mins
    const expires = new Date(new Date().getTime() + (15*60 * 1000));

    const existingToken = await prisma.passwordResetToken.findFirst({
      where: {
        email: email,
      },
    });

    if (existingToken) {
      await prisma.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const newPasswordResetToken = await prisma.passwordResetToken.create({
      data: {
        email: email,
        token: token,
        expires: expires,
      },
    });

    const passwordResetLink = `${BASE_URL}/reset-password?token=${newPasswordResetToken.token}`;

    return {
      name: user.name,
      status: "success",
      link: passwordResetLink,
      message: "Reset Password email sent, valid for 15 mins!",
    };
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
}

export async function resetPasswordAction(
  values: z.infer<typeof resetPasswordFormSchema>,
  email: string
) {
  try {
    const validateInput = resetPasswordFormSchema.safeParse(values);

    if (!validateInput.success) {
      return {
        status: "error",
        message: "Invalid Input!",
      };
    }

    const { password } = validateInput.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    await userInstance.updateUser(email, { password: hashedPassword });

    return {
      status: "success",
      message: "Password is resetted successfully",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Cannot update the password, try again after some time!",
    };
  }
}
