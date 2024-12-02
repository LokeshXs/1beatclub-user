"use client";

import MobileNavBarProvider from "@/context/MobileNavBarProvider";
import AnimatedHamburgerButton from "../ui/AnimatedHamburger";
import MobileNav from "./MobileNavBar";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className=" sticky top-4 max-sm:top-2  bg-primary/90   container mx-auto max-sm:w-[95%]   py-2 px-12 rounded-xl   max-lg:w-full max-lg:px-8 max-lg:py-4 max-sm:py-2 max-sm:px-6   flex justify-between items-center z-40   ">
     <Image src="/logo/logo-dark.crop.png" alt="Logo" width={120} height={120} className=" max-md:w-[120px] max-sm:w-[80px]" />

      <div className=" flex gap-6 items-center max-md:hidden text-primary-foreground">

        <Link href="/signup" className="hover:drop-shadow-sm">
          Register
        </Link>

        <Link href="/signin" className="hover:drop-shadow-sm">
          Login
        </Link>

      </div>

      <MobileNavBarProvider>
        <AnimatedHamburgerButton />
        <MobileNav />
      </MobileNavBarProvider>
    </nav>
  );
}
