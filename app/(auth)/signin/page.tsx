import { googleSignIn } from "@/actions/authentication";
import SignInForm from "@/components/authentication/SignInForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata:Metadata = {
  title:"Sign In to Your Soundtrack",
  description:"Log in to access your personalized music experience. Vote, list songs, and enjoy top-voted tracks with the community."
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { error } = await searchParams;
  let errorMessage = "";
  if (error === "OAuthAccountNotLinked") {
    errorMessage = "You are using manual email/password sign in";
  }

  return (
    <>
      <h1 className=" text-2xl max-sm:text-xl text-center font-semibold">
        Sign In
      </h1>

      <p className=" text-base max-sm:text-sm  text-center font-normal">
      Log in to join the ultimate music experience. Shape the soundtrack by voting for your favorite songs!
      </p>

      <div className=" flex flex-col items-center gap-4">
        <SignInForm />

        <span className="w-full">
        <Link href="/forgot-password" className=" text-start">
        Forgot Password ?
        </Link>
        </span>
        <span className=" text-sm text-start w-full">
          Not Signed In?{" "}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </span>

        <p>OR</p>

        <form
          action={async () => {
            "use server";
            await googleSignIn();
          }}
          className=" flex flex-col items-center gap-1"
        >
          <Button className=" flex gap-4 max-sm:gap-2  shadow-none  ">
            <Image
              src="/icons/google.png"
              alt="google icon"
              width={20}
              height={20}
            />
            <p>Continue with google</p>
          </Button>

          <div
            className={cn("", {
              " bg-red-600 p-2 rounded-lg text-white": errorMessage !== "",
            })}
          >
            <p>{errorMessage}</p>
          </div>
        </form>
      </div>
    </>
  );
}
