"use client";

import { useListedSongStore } from "@/store/store";
import SongTile from "./SongTile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { WebSocketClientContext } from "@/context/WebSocketClientProvider";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, songsSorting } from "@/lib/utils";
import { useMusicClub } from "@/store/musicClubStore";
import Invites from "./Invites";
import { SongType } from "@/types/types";
import { getCurrentSongInClub } from "@/actions/club";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function SongsListed() {
  const [clubs, setClubs] = useState<
    { name: string; id: string; adminId: string }[]
  >([]);
  const selectedClub = useMusicClub((state) => state.selectedClub);
  const setSelectedClub = useMusicClub((state) => state.setSelectedClub);

  const {
    setAreSongsLoading,
    removeSong,
    listedSongs,
    addSongs,
    setCurrentSongPlaying: setCurrentSong,
    resetSongs,
    updateVote,
    addNewSong,
    nextSong: playnextSong,
  } = useListedSongStore();

  const { wsClient } = useContext(WebSocketClientContext);
  const { data } = useSession();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const pathname = usePathname();

  const userId = data?.user?.id;
  const isAdmin = data?.user.role === "ADMIN";

  const { isError: hasFetchingClubsError, isLoading: areClubsLoading } =
    useQuery({
      queryKey: ["music-clubs",{wsClient:wsClient}],
      queryFn: async ({signal}) => {
        const response = await axios.get("/api/user/clubs",{
          signal
        });
        if (response.status !== 200) {
          throw new Error("Cannot fetch the songs");
        }
        const data: { name: string; id: string; adminId: string }[] =
          response.data?.data;

        setClubs(data);

        setValue(
         data[0].name.toLowerCase()
        );
        setSelectedClub(data[0]);

        return {
          clubs: data,
        };
      },
      refetchOnWindowFocus:false
    });

  const { isLoading: areSongsLoading, isError: hasFetchingSongsError } =
    useQuery({
      queryKey: ["song-list", { clubId: selectedClub?.id},{wsClient:wsClient}],
      queryFn: async ({signal}) => {
        if (!selectedClub) {
          return;
        }

        const response = await axios.get("/api/songs/all", {
          params: { clubid: selectedClub.id },
          signal
        });

        if (response.status !== 200) {
          throw new Error("Cannot fetch the songs");
        }

        const data: SongType[] = response.data?.data;

        const cuurentSongRes = await getCurrentSongInClub(selectedClub.id);
        const currentSongId = cuurentSongRes.data;

        const filteredSongs = data.filter(
          (value) => value.id !== currentSongId
        );
        const currentSong = data.filter((value) => value.id === currentSongId);


     if(currentSong){
      setCurrentSong(currentSong[0]);
      addSongs(filteredSongs);
     }else{
      setCurrentSong(songsSorting(filteredSongs)[0]);
      addSongs(songsSorting(filteredSongs).slice(1));
     }

        return {
          songs: data,
        };
      },

      refetchOnWindowFocus:false
    });

  useEffect(() => {
    setAreSongsLoading(areSongsLoading);
    console.log(areSongsLoading);
  }, [areSongsLoading,setAreSongsLoading]);

  useEffect(() => {
    if (wsClient) {
      wsClient.onmessage = (message) => {
        const messageData = JSON.parse(message.data);

        if (messageData?.type === "UPVOTE") {
          updateVote(
            "upvote",
            messageData?.data.songId,
            messageData?.data.userId
          );
        } else if (messageData?.type === "DOWNVOTE") {
          updateVote(
            "downVote",
            messageData?.data.songId,
            messageData?.data.userId
          );
        } else if (messageData?.type === "ADDSONG") {
          if (selectedClub?.id === messageData?.data.clubId) {
            addNewSong(messageData?.data);
          }
        } else if (messageData?.type === "SONGCHANGE") {
          if (selectedClub?.id === messageData.data.clubId) {
            playnextSong();
          }
        } else if (messageData?.type === "REMOVE") {
          removeSong(messageData.data.songId);
        }
      };
    }
  }, [
    wsClient,
    updateVote,
    addNewSong,
    data,
    playnextSong,
    selectedClub,
    removeSong,
  ]);

  let content;

  if (!userId) {
    throw new Error("Invalid Session");
  }

  if (areClubsLoading || areSongsLoading) {
    content = (
      <div className=" space-y-4  px-4">
        {new Array(4).fill(1).map((value, index) => (
          <Skeleton
            key={index}
            className="w-full h-[60px] rounded-xl bg-secondary/10"
          />
        ))}
      </div>
    );
  }

  if (selectedClub && (hasFetchingClubsError || hasFetchingSongsError)) {
    content = (
      <div className=" space-y-4  px-4 flex justify-center items-center">
        <p className=" text-2xl font-semibold text-primary-foreground">
          Something went wrong!
        </p>
      </div>
    );
  }

  if (listedSongs.length > 0) {
    content = (
      <>
        {listedSongs.map((value, index) => (
          <SongTile key={index} isAdmin={isAdmin} userId={userId} {...value} />
        ))}
      </>
    );
  }

  return (
    <div className=" space-y-6 max-sm:space-y-2  ">
      <div className=" py-4 px-6 bg-primary-foreground rounded-t-lg flex max-sm:flex-col justify-between items-center gap-4  ">
        <p className="text-lg max-sm:text-sm text-primary capitalize italic">
          Listed Songs to vote
        </p>
        <div className=" flex items-center gap-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {areClubsLoading
                  ? "Fetching..."
                  : value
                  ? clubs.find((club) => club.name.toLowerCase() === value)
                      ?.name
                  : "Select Club..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Clubs..." />
                <CommandList>
                  <CommandEmpty>No Clubs Found.</CommandEmpty>
                  <CommandGroup>
                    {clubs.map((club, index) => (
                      <CommandItem
                        key={index}
                        value={club.name.toLowerCase()}
                        onSelect={(currentValue) => {
                          setValue(
                            currentValue === club.name.toLowerCase()
                              ? currentValue
                              : ""
                          );
                          setSelectedClub(club);
                          resetSongs();
                          setCurrentSong(null);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === club.name.toLowerCase()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {club.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Invites />
        </div>
      </div>

      {content}
    </div>
  );
}
