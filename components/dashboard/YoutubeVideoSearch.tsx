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
import { Check, ChevronsUpDown } from "lucide-react";
import { useContext, useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import Loader2 from "../ui/loader/loader2/Loader2";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { getVideoInfo, searchYoutubeVideo } from "@/actions/youtube";
import { toast } from "sonner";
import Image from "next/image";
import { useMusicClub } from "@/store/musicClubStore";
import { YOUTUBE_WATCH_BASE_URL } from "@/lib/config";
import { useListedSongStore } from "@/store/store";
import { WebSocketClientContext } from "@/context/WebSocketClientProvider";
import { updateCurrentlyPlayingSong } from "@/actions/club";
import ShimmerButton from "../ui/ShimmerButton";

export default function YoutubeVideoSearch() {
  const [open, setOpen] = useState(false);
  const currentSongPlaying = useListedSongStore(
    (state) => state.currentSongPlaying
  );
  const [searchBy, setSearchBy] = useState("");
  const selectedClub = useMusicClub((state) => state.selectedClub);
  const addSong = useListedSongStore((state) => state.addNewSong);
  const { wsClient } = useContext(WebSocketClientContext);
  const debouncedSearchByValue = useDebounce(searchBy);
  const [fetchedVideos, setFetchedVideos] = useState<
    {
      title: string;
      thumbnail: string;
      videoId: string;
      channelTitle: string;
    }[]
  >([]);
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    thumbnail: string;
    videoId: string;
    channelTitle: string;
  }>();

  const [isPending, startTransition] = useTransition();
  const [isAddSongPending, startAddSongTransition] = useTransition();

  const searchByChangeHandler = (value: string) => {
    setSearchBy(value);
    setSelectedVideo(undefined);
  };

  useEffect(() => {
    async function searchVideos() {
      startTransition(async () => {
        const response = await searchYoutubeVideo(debouncedSearchByValue);

        if (response.status === "success") {
          setFetchedVideos(response.results);
          toast.success("Results fetched successfully");
        } else {
          toast.error("Error in searching, Please Try Again!");
        }
      });
    }

    if (debouncedSearchByValue) {
      searchVideos();
    } else {
      setFetchedVideos([]);
    }
  }, [debouncedSearchByValue]);

  const addToPlaylistHandler = () => {
    startAddSongTransition(async () => {
      if (!selectedClub) {
        toast.error("No club selected");
        return;
      }

      if (!selectedVideo) {
        toast.error("No video selected");
        return;
      }
      const videoLink = `${YOUTUBE_WATCH_BASE_URL}?v=${selectedVideo.videoId}`;
      const data = await getVideoInfo({ url: videoLink }, selectedClub?.id);
      if (data.status === "success") {
        if (data.data) {
          addSong({ ...data.data, votes: [] });

          if (wsClient) {
            wsClient.send(
              JSON.stringify({
                type: "ADDSONG",
                data: { ...data.data, votes: [] },
              })
            );
          }

          if (!currentSongPlaying) {
            await updateCurrentlyPlayingSong(data.data.id, selectedClub.id);
          }

          toast.success("Song Added");
        }
      } else if (data.status === "error") {
        toast.error(data.message);
      } else {
        toast.error("Cannot add song");
      }
    });
  };

  return (
    <Dialog
      onOpenChange={() => {
        setSelectedVideo(undefined);
        setFetchedVideos([]);
      }}
    >
      <DialogTrigger className=" flex justify-center">
        <ShimmerButton
          className=" border-2 border-primary-foreground "
          shimmerColor="#d67d1d"
          background="#ede5d9"
          shimmerSize="0.2em"
          shimmerDuration="5s"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight   lg:text-lg text-primary-foreground">
            Youtube Search
          </span>
        </ShimmerButton>
      </DialogTrigger>
      <DialogContent className=" bg-secondary border-0 overflow-hidden max-w-[800px] h-[400px] max-sm:h-80 flex flex-col  gap-24  max-sm:p-2 ">
        <DialogHeader className=" z-10">
          <DialogTitle className=" text-center text-primary text-3xl max-sm:text-2xl">
            Add a <span className=" text-terniary">Beat</span> from YouTube
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" flex flex-col items-center gap-4 justify-center z-10">
          <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[700px] max-md:w-full justify-between bg-primary text-primary-foreground  "
              >
                <p className="truncate">
                  {" "}
                  {selectedVideo?.title || "Search your vibe..."}
                </p>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-primary-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" w-[680px] max-md:w-[500px] max-sm:w-[340px] p-0">
              <Command
                shouldFilter={false}
                className=" bg-primary text-primary-foreground  "
              >
                <CommandInput
                  placeholder="Search here..."
                  onValueChange={searchByChangeHandler}
                />
                <CommandList>
                  <CommandEmpty>
                    {debouncedSearchByValue ? (
                      isPending ? (
                        <div className=" flex justify-center items-center">
                          <Loader2 />
                        </div>
                      ) : (
                        "No Videos Found"
                      )
                    ) : (
                      "Search"
                    )}
                  </CommandEmpty>
                  <CommandGroup>
                    {fetchedVideos.map((video, index) => (
                      <CommandItem
                        key={index}
                        value={video.videoId}
                        onSelect={(currentValue) => {
                          setSelectedVideo(video);
                          setOpen(false);
                        }}
                        className=" hover:cursor-pointer  data-[selected=true]:sm:bg-gradient-to-b from-primary-foreground to-primary data-[selected=true]:sm:text-primary data-[selected=true]:bg-primary text-primary-foreground"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedVideo?.videoId === video.videoId
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className=" flex items-start gap-4 max-sm:gap-2 w-full">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            width={100}
                            height={100}
                            className=" rounded-md max-sm:w-20" 
                          />
                          <div className=" flex-1  flex flex-col gap-2 ">
                            <p className="  text-sm max-w-md max-md:max-w-60 max-sm:max-w-40 truncate ">
                              {video.title}
                            </p>
                            <p className="  text-xs text-end  ">{`~ ${video.channelTitle}`}</p>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            onClick={addToPlaylistHandler}
            className=" bg-terniary text-terniary-foreground hover:bg-terniary/95 min-w-52"
            disabled={isAddSongPending}
          >
            {isAddSongPending ? "Adding" : "Add To Playlist"}
          </Button>
        </DialogDescription>

        <div className=" w-[800px] h-[800px] absolute top-0 left-0 bg-yt-bg bg-no-repeat opacity-50" />
      </DialogContent>
    </Dialog>
  );
}
