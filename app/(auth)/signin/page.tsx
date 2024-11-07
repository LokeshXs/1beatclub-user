import { googleSignIn } from "@/actions/authentication";
import SignInForm from "@/components/authentication/SignInForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className=" text-2xl max-sm:text-xl text-center font-semibold">Sign In</h1>

      <p className=" text-base max-sm:text-sm  text-center font-normal">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
        dignissimos!
      </p>

      <div className=" flex flex-col items-center gap-4">
        <SignInForm />
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
