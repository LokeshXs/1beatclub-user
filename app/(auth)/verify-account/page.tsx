import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Verify Account",
  description:"Verify your account"
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  const tokenDetails = await prisma.emailVerificationToken.findUnique({
    where: {
      token: token,
    },
  });

  const tokenIsExpired =
    new Date().getTime() > (tokenDetails?.expires || new Date()).getTime();

  let content;

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
    try {
      await prisma.user.update({
        where: {
          email: tokenDetails.email,
        },
        data: {
          emailVerified:new Date()
        },
      });
    } catch (err) {
      throw new Error("Something went wrong");
    }

    content = (
      <div>
        <p className=" text-center text-green-600 font-medium">
          Your Account is verified successfully 🎉
        </p>
      </div>
    );
  }

  return (
    <>{ content }</>
  );
}
