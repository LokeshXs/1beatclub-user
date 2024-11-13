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
import { cn } from "@/lib/utils";

import { useMusicClub } from "@/store/musicClubStore";

import Invites from "./Invites";
import { SongType } from "@/types/types";
import { getCurrentSongInClub } from "@/actions/club";

export default function SongsListed() {
  const [isFetching, setIsFetching] = useState(true);
  const [fetchingClubs, setIsFetchingClubs] = useState(true);
  const [clubs, setClubs] = useState<
    { name: string; id: string; adminId: string }[]
  >([]);
  const selectedClub = useMusicClub((state) => state.selectedClub);
  const setSelectedClub = useMusicClub((state) => state.setSelectedClub);

  const {
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

  const userId = data?.user?.id;
  const isAdmin = data?.user.role === "ADMIN";

  useEffect(() => {
    async function getUserClubs() {
      const response = await axios.get("/api/user/clubs");

      const data: { name: string; id: string; adminId: string }[] =
        response.data?.data;

      setClubs(data);
      if (data.length > 0) {
        setValue(data[0].name.toLowerCase());
        setSelectedClub(data[0]);
      }
      setIsFetchingClubs(false);
    }

    getUserClubs();
  }, [setSelectedClub]);

  useEffect(() => {
    async function getAllListedSongs() {
      if (!selectedClub) {
        setIsFetching(false);
        return;
      }
      resetSongs();
      setCurrentSong(null);

      const response = await axios.get("/api/songs/all", {
        params: { clubid: selectedClub.id },
      });

      let data: SongType[] = response.data?.data;

      const currentSongRes = await getCurrentSongInClub(selectedClub.id);

      const currentSongId = currentSongRes.data;

      const filteredSongs = data.filter((value) => value.id !== currentSongId);
      const currentSong = data.filter((value) => value.id === currentSongId);

      setCurrentSong(currentSong[0]);
      addSongs(filteredSongs);
      setIsFetching(false);
    }

    getAllListedSongs();
  }, [selectedClub, addSongs, resetSongs, setCurrentSong]);

  useEffect(() => {
    if (wsClient) {
      wsClient.onmessage = (message) => {
        const messageData = JSON.parse(message.data);

        if (messageData?.type === "UPVOTE") {
          updateVote("upvote", messageData?.data.songId, messageData?.data.userId);
        } else if (messageData?.type === "DOWNVOTE") {
          updateVote("downVote", messageData?.data.songId, messageData?.data.userId);
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
  }, [wsClient, updateVote, addNewSong, data, playnextSong, selectedClub,removeSong]);

  if (isFetching || !userId) {
    return (
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

  return (
    <div className=" space-y-6 max-sm:space-y-2  ">
      <div className=" py-4 px-6 bg-primary-foreground rounded-t-lg flex max-sm:flex-col justify-between items-center gap-4  ">
        <p className="text-lg max-sm:text-sm text-primary capitalize italic">
          Songs in a club
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
                {fetchingClubs
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

      {listedSongs.map((value, index) => (
        <SongTile key={index} isAdmin={isAdmin} userId={userId} {...value} />
      ))}
    </div>
  );
}
