import { acceptOrDeclineInvite } from "@/actions/invites";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { InvitesType } from "@/types/types";

import {
  IconBellFilled,
  IconCircleXFilled,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function Invites() {
  const [invites, setInvites] = useState<InvitesType>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await axios.get("/api/user/invites");

        if (res.data.status !== "success") {
          return toast.error(res.data.message);
        }
        const invites: InvitesType = res.data.invites;

        setInvites(invites);
      } catch (err) {
        toast.error("Something went wrong!");
      }
    };

    fetchInvites();
  }, []);

  const acceptOrDeclineInviteHandler = async (
    adminId: string,
    clubId: string,
    toUserId: string,
    status: "ACCEPT" | "DECLINE"
  ) => {
    startTransition(async () => {
      const res = await acceptOrDeclineInvite(
        toUserId,
        clubId,
        adminId,
        status
      );
      if (res.status === "success") {
        setInvites((prev) => prev.filter((value) => value.clubId !== clubId));
        toast.success(res.message);
      } else if (res.status === "error") {
        toast.error(res.message);
      }
    });
  };

  return (
    <InvitesLayout invites={invites}>
      {invites.length === 0 ? (
        <div className="   items-center justify-center">
          <Image
            src="/images/no-invites.svg"
            alt="No invites"
            width={500}
            height={500}
            className=" absolute -bottom-14 -left-36   rotate-12"
          />
          <p className=" text-center text-3xl font-semibold text-pretty text-primary mt-12">
            No Invites
          </p>
        </div>
      ) : (
        invites.map((value, index) => (
          <div
            key={`invite-${index}`}
            className=" text-primary-foreground bg-primary px-4 py-1 rounded-xl flex justify-between gap-6 items-center"
          >
            <span>
              <p>{value.Club.name}</p>
              <span className=" flex items-center gap-1">
                <p className=" text-primary-foreground/80 text-sm">Owner:</p>{" "}
                <p>{value.admin.name}</p>
              </span>
            </span>

            <span className=" flex gap-4 items-center">
              <button
                disabled={isPending}
                onClick={() =>
                  acceptOrDeclineInviteHandler(
                    value.adminId,
                    value.clubId,
                    value.toUserId,
                    "ACCEPT"
                  )
                }
              >
                <IconRosetteDiscountCheckFilled
                  className={cn(
                    " w-10 h-10 text-green-600 active:scale-95 transition-all duration-300 cursor-pointer",
                    {
                      "text-gray-400 cursor-not-allowed": isPending,
                    }
                  )}
                />
              </button>
              <button
                disabled={isPending}
                onClick={() =>
                  acceptOrDeclineInviteHandler(
                    value.adminId,
                    value.clubId,
                    value.toUserId,
                    "DECLINE"
                  )
                }
              >
                <IconCircleXFilled
                  className={cn(
                    " w-10 h-10 text-red-600 active:scale-95 transition-all duration-300 cursor-pointer",
                    {
                      "text-gray-400 cursor-not-allowed ": isPending,
                    }
                  )}
                />
              </button>
            </span>
          </div>
        ))
      )}
    </InvitesLayout>
  );
}

function InvitesLayout({
  invites,
  children,
}: {
  invites: InvitesType;
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className=" relative cursor-pointer">
          <IconBellFilled className=" w-8 h-8 text-primary" />
          <span className=" absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-primary flex justify-center items-center text-sm p-1">
            {invites.length}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          " relative w-[460px] max-sm:w-[400px] max-[400px]:w-[340px] h-[400px]  bg-secondary space-y-4 overflow-hidden",
          {
            "overflow-y-auto": invites.length !== 0,
          }
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
