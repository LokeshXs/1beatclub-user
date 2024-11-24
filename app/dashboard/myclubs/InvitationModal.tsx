"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import { sendClubInvite } from "@/actions/invites";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Loader2 from "@/components/ui/loader/loader2/Loader2";

export default function InvitationModal({
  clubId,
  clubName,
}: {
  clubId: string;
  clubName: string;
}) {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const [searchBy, setSearchBy] = useState("");
  const [searchingUser,setSearchingUser] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  const debouncedSearchByValue = useDebounce(searchBy);

  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    email: string;
  }>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const findUsers = async () => {
      setSearchingUser(true);
      const res = await axios.get("/api/user/find", {
        params: {
          searchBy: debouncedSearchByValue,
        },
      });
      const data: {
        id: string;
        name: string;
        email: string;
      }[] = res.data?.data;

      setSearchedUsers(data);
      setSearchingUser(false);
    };

    if (debouncedSearchByValue) {
      findUsers();
    }
  }, [debouncedSearchByValue]);

  const searchByChangeHandler = (value: string) => {
    setSearchBy(value);
    setSelectedUser(undefined);
  };

  const sendInvite = () => {
    if (!selectedUser) {
      return toast.error("Select a user to send invite");
    }

    startTransition(async () => {
      const res = await sendClubInvite(
        selectedUser.id,
        clubId,
        session.data?.user.id || ""
      );
      if (res.status === "success") {
        toast.info(res.message);
      } else if (res.status === "error") {
        toast.error(res.message);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger className=" bg-primary py-2 max-sm:py-1 w-1/2 mx-auto rounded-lg">
        Invite
      </DialogTrigger>
      <DialogContent className=" bg-primary">
        <DialogHeader className=" space-y-6 max-sm:space-y-4">
          <DialogTitle className=" text-center text-primary-foreground text-xl">
            Invite user to your club
          </DialogTitle>
          <DialogDescription className=" flex flex-col items-center max-sm:w-full gap-4 justify-center ">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[400px] max-sm:w-full justify-between"
                >
                  {selectedUser ? selectedUser.name : "Tap to search user ..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] max-sm:w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search user..."
                    onValueChange={searchByChangeHandler}
                  />
                  <CommandList>
                    <CommandEmpty>{debouncedSearchByValue?searchingUser ? <div className=" flex justify-center items-center">
                      <Loader2 />
                    </div>:"No User Found":"Search by email"}</CommandEmpty>
                    <CommandGroup>
                      {searchedUsers.map((value) => (
                        <CommandItem
                          key={value.id}
                          value={value.email}
                          onSelect={(currentValue) => {
                            setSelectedUser(value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value.email === selectedUser?.email
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {value.email}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Button
              onClick={sendInvite}
              disabled={isPending}
              className=" bg-primary-foreground text-primary px-12 hover:bg-primary-foreground/90"
            >
              {isPending ? "Sending" : "Send"}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
