import Image from "next/image";
import { Button } from "../ui/button";
import { IconArrowNarrowUp } from "@tabler/icons-react";
import { SongType } from "@/types/types";
import { useListedSongStore } from "@/store/store";
import { useEffect } from "react";
import { useContext } from "react";
import { WebSocketClientContext } from "@/context/WebSocketClientProvider";
import { DownVoteInDB, upvoteInDB } from "@/actions/song";

type Props = SongType & { userId: string };

export default function SongTile({
  songTitle,
  link,
  thumbnail,
  votes,
  id,
  userId,
}: Props) {
  const updateVote = useListedSongStore((state) => state.updateVote);
  const { wsClient } = useContext(WebSocketClientContext);

  const isSongVoted = votes.find(
    (value) => value.songId === id && value.userId === userId
  );

  return (
    <div className=" flex justify-between items-center py-4 max-sm:py-2 px-12 max-sm:px-4 bg-secondary rounded-xl mx-2">
      <div className=" flex gap-6 max-sm:gap-2 items-center">
        <Image src={thumbnail} alt={songTitle} width={100} height={100} className=" max-sm:w-20" />
        <div className=" text-secondary-foreground">
          <p className=" max-w-[80%] max-sm:max-w-[95%] max-sm:text-sm">{songTitle}</p>
        </div>
      </div>

      <Button
        className=" bg-primary px-8 max-sm:px-6 rounded-full flex items-center gap-1"
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
    </div>
  );
}
