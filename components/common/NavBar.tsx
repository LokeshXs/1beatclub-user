"use client";

import MobileNavBarProvider from "@/context/MobileNavBarProvider";
import AnimatedHamburgerButton from "../ui/AnimatedHamburger";
import MobileNav from "./MobileNavBar";
import { Button } from "../ui/button";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import { Separator } from "../ui/separator";

export default function NavBar() {
  return (
    <nav className=" container mx-auto  py-6 px-12   max-lg:w-full max-lg:px-8 max-lg:py-4 max-sm:py-2 max-sm:px-6   flex justify-between items-center  ">
      <p className=" text-lg font-medium text-primary-foreground">VibeRoom</p>

      <div className=" flex gap-6 items-center max-md:hidden text-primary-foreground">
        <Link href="/" className="hover:drop-shadow-sm">
          Premium
        </Link>
        <Separator
          orientation="vertical"
          className=" bg-primary-foreground/40 w-[2px] h-8"
        />

        <Link href="/signup" className="hover:drop-shadow-sm">
          Register
        </Link>

        <Link href="/signin" className="hover:drop-shadow-sm">
          Login
        </Link>

        <ThemeSwitch />
      </div>

      <MobileNavBarProvider>
        <AnimatedHamburgerButton />
        <MobileNav />
      </MobileNavBarProvider>
    </nav>
  );
}
