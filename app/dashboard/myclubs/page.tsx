import { auth } from "@/auth";
import userInstance from "@/services/User";
import InvitationModal from "./InvitationModal";

export default async function Page() {
  const session = await auth();

  const myClubs = await userInstance.getUserClubs(session?.user.id || "");


  return (
    <main className=" p-6  overflow-auto w-full">
   

      <div className=" grid grid-cols-3 gap-12 place-items-center">
        {myClubs.map((value, index) => (
          <div
            key={`club-${index}`}
            className=" w-[460px] min-h-72 bg-primary-foreground rounded-xl p-4 flex flex-col "
          >
            <div className=" flex-1 flex justify-center items-center">
              <p className=" text-primary text-4xl text-center">{value.name}</p>
            </div>

            <InvitationModal clubId={value.id} clubName={value.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
