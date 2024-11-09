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
  const session = useSession();

  const isSongVoted = votes.find(
    (value) => value.songId === id && value.userId === userId
  );

  return (
    <div className=" flex justify-between gap-4 items-center py-4 max-sm:py-2 px-12 max-sm:px-4 bg-secondary rounded-xl mx-2">
      <div className=" flex gap-6 max-sm:gap-2 items-center">
        <Image
          src={thumbnail}
          alt={songTitle}
          width={100}
          height={100}
          className=" max-sm:w-20"
        />
        <div className=" text-secondary-foreground">
          <p className=" max-w-[80%] max-sm:max-w-[95%] max-sm:text-sm">
            {songTitle}
          </p>
        </div>
      </div>

      <Button
        className=" bg-primary px-8 max-sm:px-6 rounded-full flex items-center gap-1"
        title="Vote"
        onClick={() => {
          if (isSongVoted) {
            updateVote("downVote", id, userId);
            if (wsClient) {
              wsClient.send(
                JSON.stringify({ type: "DOWNVOTE", songId: id, userId: userId })
              );
              DownVoteInDB(id);
            }
          } else {
            updateVote("upvote", id, userId);
            if (wsClient) {
              wsClient.send(
                JSON.stringify({ type: "UPVOTE", songId: id, userId: userId })
              );

              upvoteInDB(id);
            }
          }
        }}
      >
        <IconArrowNarrowUp />
        <p>{votes.length}</p>
      </Button>

      {selectedClub?.adminId === session.data?.user.id && (
        <IconTrashXFilled
          className=" w-12 h-12 text-red-600 hover:cursor-pointer"
          title="Remove Song"
          onClick={async () => {
            if (wsClient) {
              wsClient.send(JSON.stringify({ type: "REMOVE", songId: id }));
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
  );
}
