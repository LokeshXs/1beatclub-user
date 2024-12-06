"use client";

import Link from "next/link";
import { useContext} from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MobileNavBarContext } from "@/context/MobileNavBarProvider";
import { Separator } from "@radix-ui/react-separator";


const MobileNav = () => {
  const { isOpen,setIsOpen } = useContext(MobileNavBarContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ top: "100%", opacity: 0 }}
          animate={{ top: 0, opacity: 1 }}
          exit={{ top: "100%", opacity: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="fixed top-0 left-0 h-screen  w-screen bg-primary text-foreground flex justify-center items-center  z-[40] overflow-y-auto  "
        >
          <div className="  p-8 max-sm:p-6   ">
            <div className="  flex flex-col items-center gap-4 text-primary-foreground ">
              <Link href="/signup" className="hover:drop-shadow-sm text-xl ">
                Register
              </Link>

              <Link href="/signin" className="hover:drop-shadow-sm text-xl">
                Login
              </Link>

          <Separator  className=" w-full h-[2px]  bg-primary-foreground/70 rounded-lg"/>
              <Link href="/#howitworks" className="hover:drop-shadow-sm text-xl" onClick={()=>{setIsOpen(false)}}>
          How It Works
        </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
