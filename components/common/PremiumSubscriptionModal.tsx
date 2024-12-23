"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IconArrowBadgeDownFilled, IconChecks } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useIsPremiumStore } from "@/store/isPremiumStore";
import axios from "axios";

export default function PremiumSubscriptionModal() {
  const { openSubscriptionModal, setToggleSubscriptionModal } =
    useIsPremiumStore();




  return (
    <Dialog
      open={openSubscriptionModal}
      onOpenChange={() => {
        setToggleSubscriptionModal(false);
      }}
    >
      <DialogContent className=" p-6 max-sm:px-2 bg-secondary space-y-6 outline-none border-none max-w-96 overflow-hidden  ">
        <span className=" w-12 h-12 bg-terniary/40 flex justify-center items-center rounded-lg">
          <IconArrowBadgeDownFilled className=" w-10 h-10 text-terniary" />
        </span>

        <div className=" space-y-2">
          <h3 className=" text-2xl font-bold text-secondary-foreground">
            Premium
          </h3>
          <p className=" text-secondary-foreground/80">
            Take your playlist to the next level
          </p>
        </div>

        <div className=" space-y-4">
          <span className=" text-4xl flex gap-2">
            <p className=" text-secondary-foreground font-semibold">₹149</p>
            <p className=" text-secondary-foreground/30 line-through">₹359</p>
          </span>
          <form method="POST" action="/api/stripe/checkout_session">
          <Button type="submit" className=" w-full bg-terniary text-terniary-foreground font-semibold hover:bg-terniary/90" >
            Go Premium
          </Button>
 </form>
        
        </div>

        <Separator className="w-[90%] mx-auto bg-primary/40" />

        <div>
          <ul>
            <li className=" flex items-center gap-2">
              <IconChecks className=" text-terniary" />
              <p className=" text-secondary-foreground">Youtube Search</p>
            </li>
          </ul>
        </div>

        <span className=" absolute top-8 right-8 blur-3xl w-20 h-20 bg-terniary" />
      </DialogContent>
    </Dialog>
  );
}
