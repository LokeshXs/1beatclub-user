import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import DashboardSideBar from "./DashboardSideBar";
import { auth } from "@/auth";
import WebSocketClientProvider from "@/context/WebSocketClientProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row  bg-primary w-full flex-1  mx-auto border overflow-hidden",
        "h-screen " // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <DashboardSideBar
        isPremiumMember={session?.user.isPremiumMember || false}
      />
      <SessionProvider>
        <WebSocketClientProvider>{children}</WebSocketClientProvider>
      </SessionProvider>
    </div>
  );
}
