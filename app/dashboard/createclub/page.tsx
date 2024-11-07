import Image from "next/image";
import SubscribeToPremium from "./SubsribeToPremiumModal";
import CreateClubForm from "./CreateClubForm";
import userInstance from "@/services/User";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  const isPremiumUser = await userInstance.isAPremiumUser(
    session?.user.id || ""
  );

  return (
    <main className=" relative flex justify-center gap-20 items-center w-full ">
      <div className="  flex flex-col items-center gap-20">
        <h1 className=" text-center text-primary-foreground text-5xl font-bold capitalize">
          Create a Music Club Now
        </h1>
        <CreateClubForm />
      </div>

      <Image src="/images/my-club.svg" alt="My Club" width={800} height={800} />

      {!isPremiumUser && <SubscribeToPremium isPremiumUser={isPremiumUser} />}
    </main>
  );
}
