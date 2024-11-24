// FUNCTION BEGINS HERE

import { googleSignIn } from "@/actions/authentication";
import SignUpForm from "@/components/authentication/SignUpForm";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata:Metadata = {
  title:"Sign Up to Your Soundtrack",
  description:"Log in to access your personalized music experience. Vote, list songs, and enjoy top-voted tracks with the community."
}

export default function Page() {
  return (
    <>
      <h1 className=" text-2xl max-sm:text-xl text-center font-semibold">Sign Up</h1>

      <p className=" text-base max-sm:text-sm text-center font-normal">
      Sign up to start voting on songs and shaping playlists with your community
      </p>

      <div className=" flex flex-col gap-4 items-center">
        <SignUpForm />
        <span className=" text-sm text-start w-full">
          Signed In?  {" "}
          <Link href="/signin" className="underline">
             Sign In
          </Link>
        </span>
        <p>OR</p>

        <form
          action={async () => {
            "use server";
            await googleSignIn();
          }}
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
        </form>
      </div>
    </>
  );
}
