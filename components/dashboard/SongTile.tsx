import Image from "next/image";
import { Button } from "../ui/button";
import { IconArrowNarrowUp, IconTrashXFilled } from "@tabler/icons-react";
import { SongType } from "@/types/types";
import { useListedSongStore } from "@/store/store";
import { useEffect } from "react";
import { useContext } from "react";
import { WebSocketClientContext } from "@/context/WebSocketClientProvider";
import { DownVoteInDB, removeSongInDB, upvoteInDB } from "@/actions/song";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useMusicClub } from "@/store/musicClubStore";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";

type Props = SongType & { userId: string; isAdmin: boolean };

export default function SongTile({
  songTitle,
  link,
  thumbnail,
  votes,
  id,
  userId,
  isAdmin,
}: Props) {
  const { updateVote, removeSong } = useListedSongStore();
  const { wsClient } = useContext(WebSocketClientContext);
  const selectedClub = useMusicClub((state) => state.selectedClub);

  const isSongVoted = votes.find(
    (value) => value.songId === id && value.userId === userId
  );

  return (
    <div className=" flex max-sm:flex-col justify-between gap-4 items-center py-4 max-sm:py-2 px-12 max-sm:px-4 bg-secondary rounded-xl mx-2">
      <div className="w-full flex gap-6  max-sm:gap-2 items-center justify-start">
        <Image
          src={thumbnail}
          alt={songTitle}
          width={100}
          height={100}
          className=" rounded-md "
        />
        <div className=" text-secondary-foreground max-w-[80%] max-sm:max-w-[95%] ">
          <p className="   max-sm:text-sm line-clamp-1">
            {songTitle}
          </p>
        </div>
      </div>

      <div className=" flex items-center gap-4 max-sm:w-full justify-center">
      <Button
        className={cn(" bg-primary px-8 max-sm:px-6 rounded-full flex items-center gap-1 min-w-20 transition-all duration-300 max-sm:w-[80%]",{
            "bg-green-600 text-white hover:bg-green-600":isSongVoted !== undefined,
        })}
        title="Vote"
        onClick={() => {
          if (isSongVoted) {
            updateVote("downVote", id, userId);
            if (wsClient) {
              wsClient.send(
                JSON.stringify({ type: "DOWNVOTE",data:{ clubId:selectedClub?.id ,songId: id, userId: userId} })
              );
              DownVoteInDB(id);
            }
          } else {
            updateVote("upvote", id, userId);
            if (wsClient) {
              wsClient.send(
                JSON.stringify({ type: "UPVOTE", data:{ clubId:selectedClub?.id ,songId: id, userId: userId} })
              );

              upvoteInDB(id);
            }
          }
        }}
      >
        {/* <IconArrowNarrowUp /> */}
        <NumberFlow value={votes.length} />
        
      </Button>

      {isAdmin && (
        <IconTrashXFilled
          className=" w-10 h-10 max-sm:w-6 max-sm:h-6 text-red-600 hover:cursor-pointer"
          title="Remove Song"
          onClick={async () => {
            if (wsClient) {
              wsClient.send(JSON.stringify({ type: "REMOVE", data:{clubId:selectedClub?.id, songId: id} }));
              removeSong(id);
            }

            const res = await removeSongInDB(id);

            if (res.status === "error") {
              toast.error("Error in removing song!");
            }
          }}
        />
      )}
      </div>
    </div>
  );
}
