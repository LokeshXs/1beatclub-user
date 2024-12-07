import { auth } from "@/auth";
import userInstance from "@/services/User";
import InvitationModal from "./InvitationModal";
import { Metadata } from "next";


export const metadata:Metadata = {
  title:"Your Music Clubs",
  description:"View all your music clubs in one place"
}

export default async function Page() {
  const session = await auth();

  const myClubs = await userInstance.getUserClubs(session?.user.id || "");


  return (
    <main className=" p-6 max-sm:p-4   w-full ">
   

      <div className=" grid grid-cols-3 max-2xl:grid-cols-2 max-xl:grid-cols-1 gap-12 max-md:gap-6 place-items-center">
        {myClubs.map((value, index) => (
          <div
            key={`club-${index}`}
            className=" w-[400px]  max-lg:w-[360px] max-sm:w-full min-h-72 max-lg:min-h-60 max-sm:min-h-40 bg-primary-foreground rounded-xl p-4 flex flex-col "
          >
            <div className=" flex-1 flex justify-center items-center">
              <p className=" text-primary text-4xl max-md:text-2xl text-center">{value.name}</p>
            </div>

            <InvitationModal clubId={value.id} clubName={value.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
