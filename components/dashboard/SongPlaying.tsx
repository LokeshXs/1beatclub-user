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

  const session = useSession();

  useEffect(() => {
    const updateNextSongInDB = async () => {
    
      if (!selectedClub || !currentSongPlaying) {
        return;
      }

      updateCurrentlyPlayingSong(
        currentSongPlaying.id,
        selectedClub.id
      );
    };

    updateNextSongInDB();
  }, [currentSongPlaying]);

  async function nextSongPlease() {
    await removeSongfromClub(currentSongPlaying?.id!, selectedClub?.id!);
    playnextSong();
    if (wsClient) {
      wsClient.send(
        JSON.stringify({
          type: "SONGCHANGE",
          data: {
            clubid: selectedClub?.id,
          },
        })
      );
    }
  }

  if (!currentSongPlaying && listedSongs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className=" w-[300px] max-sm:w-[200px] ">
          <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
          <p className=" text-center text-3xl max-sm:text-xl font-bold text-primary-foreground">
            No Songs
          </p>
        </div>
      </div>
    );
  }

  if (!currentSongPlaying || !session.data) {
    return <Skeleton className="w-full h-[400px] rounded-xl bg-secondary/10" />;
  }

  return (
    <div className=" relative flex justify-center ">
      {selectedClub?.adminId !== session.data.user.id ? (
        <div className=" relative">
          <Image
            src={currentSongPlaying?.highResThumbnail || ""}
            alt="Thumbnail"
            width={680}
            height={400}
            className=" aspect-video rounded-xl"
          />
          <div className=" absolute bottom-0 left-0 w-full bg-secondary/80 py-4 max-sm:py-2 flex flex-col items-center rounded-b-xl">
            <SongWave />
            <p className=" max break-all text-primary text-lg max-sm:text-sm max-w-[90%] text-center">
              {currentSongPlaying.songTitle}
            </p>
          </div>
        </div>
      ) : (
        <Youtube
          id="yt-video"
          iframeClassName=" w-[680px] max-2xl:w-[500px] max-sm:w-[400px] max-[400px]:w-[340px] aspect-video"
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
          onPause={(event: any) => {
            event.target.playVideo();
          }}
          onError={(event: any) => {
            // console.log("An error occured");
            toast.error("Cannot able to play song!");
          }}
        />
      )}
    </div>
  );
}
