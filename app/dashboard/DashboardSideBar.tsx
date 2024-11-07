"use client";

import React, {  useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../components/dashboard/SidePanel";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconLogout2,
  IconCube3dSphere,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function DashboardSideBar({
  isPremiumMember,
}: {
  isPremiumMember: boolean;
}) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-secondary-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create Club",
      href: "/dashboard/createclub",
      icon: (
        <IconUserBolt className="text-secondary-foreground h-5 w-5 flex-shrink-0" />
      ),
    }
  ];

  if (isPremiumMember) {
    links.push({
      label: "My Clubs",
      href: "/dashboard/myclubs",
      icon: (
        <IconCube3dSphere className="text-secondary-foreground h-5 w-5 flex-shrink-0" />
      ),
    });
  }

  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-secondary">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div>{open ? <Logo /> : <LogoIcon />}</div>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          {open ? (
            <Button
              onClick={() => {
                signOut();
              }}
              className="w-full bg-primary"
            >
              {" "}
              Logout
            </Button>
          ) : (
            <IconLogout2
              onClick={() => {
                signOut();
              }}
              className=" w-6  h-6 text-primary "
            />
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
