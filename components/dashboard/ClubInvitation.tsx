import { useEffect, useState, useTransition } from "react";
import animationData from "@/public/lottie/club-joined.json";

import {
  AlertDialog,
  AlertDialogContent,

} from "@/components/ui/alert-dialog";
import Lottie from "react-lottie";
import { addUserToClub } from "@/actions/invites";
import { toast } from "sonner";
import Loader from "../ui/loader/loader3/Loader";
import { Button } from "../ui/button";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function ClubInvitation() {
  const [invitedClubId, setInvitedClubId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [statusObj, setStatusObj] = useState({ status: "", msg: "" });

  useEffect(() => {
    const clubIdInvited = localStorage.getItem("invitedClubId");

    setInvitedClubId(clubIdInvited);
  }, []);

  useEffect(() => {
    if (invitedClubId) {
      startTransition(async () => {
        const res = await addUserToClub(invitedClubId);

        if (res.status === "success") {
          toast.success(res.message);
          setStatusObj({ status: "success", msg: res.message });
        } else {
          toast.error(res.message);

          setStatusObj({ status: "error", msg: res.message });
          setInvitedClubId(null);
        }

        localStorage.removeItem("invitedClubId");
      });
    }
  }, [invitedClubId]);

  return (
    <AlertDialog open={invitedClubId !== null}>
      <AlertDialogContent className=" max-w-[800px] h-[500px] bg-primary p-12 flex flex-col gap-12 max-sm:gap-6 items-center justify-center">
        {isPending && <Loader />}

        {statusObj.status === "success" && (
          <div className=" w-[300px] max-2xl:w-[360px] max-md:w-[300px] max-sm:w-[200px] ">
            <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
          </div>
        )}
        {isPending && (
          <p className=" text-xl max-sm:text-lg text-primary-foreground text-center">
            Adding you to the club...
          </p>
        )}

        {statusObj.status === "error" && (
          <p className=" text-xl max-sm:text-lg text-red-600 text-center">{statusObj.msg}</p>
        )}
        {statusObj.status === "success" && (
          <div className=" flex flex-col items-center gap-4">
            <p className=" text-xl max-sm:text-lg text-primary-foreground text-center">
              {statusObj.msg}
            </p>
            <Button onClick={()=>setInvitedClubId(null)} className=" bg-primary-foreground text-primary mx-auto hover:bg-primary-foreground/90">
              Close
            </Button>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
