import Image from "next/image";
import SubscribeToPremium from "./SubsribeToPremiumModal";
import CreateClubForm from "./CreateClubForm";
import userInstance from "@/services/User";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Create Your Music Club",
  description:"Start your own club, invite others, and curate playlists together. Your music community starts here."
}

export default async function Page() {
  // const session = await auth();

  // const isPremiumUser = await userInstance.isAPremiumUser(
  //   session?.user.id || ""
  // );

  return (
    <main className=" relative flex max-lg:flex-col justify-center gap-20 max-md:gap-12 items-center w-full h-full p-12 max-sm:p-4 ">
      <div className="  flex flex-col items-center max-sm:w-full gap-20 max-md:gap-12">
        <h1 className=" text-center text-primary-foreground text-5xl max-md:text-3xl max-sm:text-2xl font-bold capitalize">
          Create Music Club Now
        </h1>

        <CreateClubForm />
      </div>

      <Image src="/images/my-club.svg" alt="My Club" width={800} height={800} className=" max-2xl:w-[500px] max-xl:w-[360px] " />

      {/* {!isPremiumUser && <SubscribeToPremium isPremiumUser={isPremiumUser} />} */}
    </main>
  );
}
