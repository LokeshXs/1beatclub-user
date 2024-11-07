"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

import { useState } from "react";
import { toast } from "sonner";

export default function SubscribeToPremium({
  isPremiumUser,
}: {
  isPremiumUser: boolean;
}) {
  const [subscribing, setSubscribing] = useState(false);
  const [open, setOpen] = useState(!isPremiumUser);

  const subscribeButtonHandler = async () => {
    try {
      setSubscribing(true);
      const response = await axios.patch("/api/user/premium");
      if (response.data.data) {
        toast.success("Congrats! You are now a premium user");
        window.location.reload();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader className=" space-y-4">
          <DialogTitle>Become a Premium Member</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>

          <Button onClick={subscribeButtonHandler}>
            {subscribing ? "Subscribing" : "Subscribe"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
