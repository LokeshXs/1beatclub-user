"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteToSignin({ clubId }: { clubId: string }) {
  const router = useRouter();

  useEffect(() => {
    // adding the clubid in localstorage
    localStorage.setItem("invitedClubId", clubId);
    router.push("/signin");
  }, [clubId, router]);

  return (
    <div>
      <p className=" text-primary-foreground text-3xl">
        Redirecting to signin...
      </p>
    </div>
  );
}
