import PasswordResetForm from "@/components/authentication/ResetPasswordForm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Password Reset",
  description: "Reset your password",
};

export default async function Page({
  searchParams,

}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  let content;

  const tokenDetails = await prisma.passwordResetToken.findUnique({
    where: {
      token: token || "",
    },
  });

  const tokenIsExpired =
    new Date().getTime() > (tokenDetails?.expires || new Date()).getTime();

  if (!tokenDetails || tokenIsExpired) {
    content = (
      <div>
        <p className=" text-center text-red-500 font-medium">
          Invalid Token or Token in Expired!
        </p>
      </div>
    );
  }

  if (tokenDetails && !tokenIsExpired) {
    content = (
      <div className="space-y-2">
        <h1 className=" text-2xl max-sm:text-xl text-center font-semibold text-secondary">
          Forgot Password
        </h1>

        <p className=" text-base max-sm:text-sm  text-center font-normal text-secondary/90 ">
          Type in New Password!
        </p>

        <PasswordResetForm email={tokenDetails.email} />
      </div>
    );
  }

  return <>{content}</>;
}
