"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { MobileNavBarContext } from "@/context/MobileNavBarProvider";
import { Separator } from "../ui/separator";

const MobileNav = () => {
  const { isOpen } = useContext(MobileNavBarContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ top: "100%", opacity: 0 }}
          animate={{ top: 0, opacity: 1 }}
          exit={{ top: "100%", opacity: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="fixed h-screen  w-screen bg-primary text-foreground flex justify-center items-center left-0 z-[40] overflow-y-auto  "
        >
          <div className="  p-8 max-sm:p-6   ">
            <div className="  flex flex-col items-center gap-4 text-primary-foreground ">
              <Link href="/signup" className="hover:drop-shadow-sm">
                Register
              </Link>

              <Link href="/signin" className="hover:drop-shadow-sm">
                Login
              </Link>

              <Separator className=" bg-primary-foreground " />
              <Link href="/" className="hover:drop-shadow-sm">
                Premium
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
