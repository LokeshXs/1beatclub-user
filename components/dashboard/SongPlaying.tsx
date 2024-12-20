import Youtube from "react-youtube";
import { useListedSongStore } from "@/store/store";
import Lottie from "react-lottie";
import animationData from "@/public/lottie/no-song.json";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SongWave from "../common/songAnimation/SongWave";
import { useContext, useEffect } from "react";
import { WebSocketClientContext } from "@/context/WebSocketClientProvider";
import { useMusicClub } from "@/store/musicClubStore";
import { removeSongfromClub, updateCurrentlyPlayingSong } from "@/actions/club";
import { Button } from "../ui/button";
import {
  IconPlayerTrackNextFilled,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function SongPlaying() {

  const { wsClient } = useContext(WebSocketClientContext);
  const selectedClub = useMusicClub((state) => state.selectedClub);
  const currentSongPlaying = useListedSongStore(
    (state) => state.currentSongPlaying
  );
  const playnextSong = useListedSongStore((state) => state.nextSong);
  const listedSongs = useListedSongStore((state) => state.listedSongs);
  const areSongsLoading = useListedSongStore((state) => state.areSongsLoading);
  const session = useSession();
  const isAdmin = selectedClub?.adminId === session.data?.user.id

  useEffect(() => {
    const updateNextSongInDB = async () => {
      if (!selectedClub || !currentSongPlaying) {
        return;
      }

      updateCurrentlyPlayingSong(currentSongPlaying.id, selectedClub.id);
    };

    updateNextSongInDB();
  }, [currentSongPlaying, selectedClub]);

  async function nextSongPlease() {
    await removeSongfromClub(currentSongPlaying?.id!, selectedClub?.id!);
    playnextSong();
    if (wsClient) {
      wsClient.send(
        JSON.stringify({
          type: "SONGCHANGE",
          data: {
            clubId: selectedClub?.id,
          },
        })
      );
    }
  }

  if (!session.data) {
    throw new Error("Invalid Session");
  }

  if (areSongsLoading && !currentSongPlaying) {
    return <Skeleton className="w-full h-[400px] rounded-xl bg-secondary/10" />;
  }

  if (!currentSongPlaying || areSongsLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className=" w-[300px] max-sm:w-[100px] ">
          <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
          <p className=" text-center text-3xl max-sm:text-lg font-bold text-primary-foreground">
            No Song
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex justify-center items-center h-full rounded-xl w-full p-6"
    >
      {!isAdmin ? (
        <div className=" relative z-10">
          <Image
            src={currentSongPlaying?.highResThumbnail || ""}
            alt="Thumbnail"
            width={680}
            height={400}
            className=" aspect-video rounded-xl"
          />
          <div className=" absolute bottom-0 left-0 w-full bg-secondary/80 py-4 max-sm:py-2 flex flex-col items-center rounded-b-xl">
           
            <SongWave />
        
            <p className=" max break-all text-primary text-lg  max-sm:text-xs max-w-[90%] truncate text-center">
              {currentSongPlaying.songTitle}
            </p>
          </div>
        </div>
      ) : (
        <div className=" z-10">
          <Youtube
            id="yt-video"
            iframeClassName=" w-[680px] max-2xl:w-[500px] max-sm:w-[400px] max-[400px]:w-[300px] aspect-video"
            videoId={currentSongPlaying.videoId}
            opts={{
              playerVars: {
                autoplay: 1,
                enablejsapi: 1,
                // controls: 0,
                disablekb: 1,
                fs: 0,
                rel: 0,
                mute: 0,
              },
            }}
            onEnd={(event: any) => {
              nextSongPlease();
            }}
            // onPause={(event: any) => {
            //   event.target.playVideo();
            // }}
            onError={(event: any) => {
              // console.log("An error occured");
              toast.error("Cannot able to play song!");
              nextSongPlease();
            }}
          />

          {selectedClub?.adminId === session.data.user.id && (
            <Button
              className=" w-full bg-terniary rounded-t-none text-terniary-foreground flex  items-center gap-2 py-6 max-sm:py-2 sm:hover:bg-terniary/90 "
              onClick={() => {
                nextSongPlease();
              }}
            >
              <span>Next Song</span>
              <IconPlayerTrackNextFilled />
            </Button>
          )}
        </div>
      )}

     { <Image src={currentSongPlaying.highResThumbnail || ""} alt="Song Image" width={400} height={400} className="absolute top-0 left-0 w-full h-full opacity-60" />}
    </div>
  );
}
