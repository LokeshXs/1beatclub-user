import { SongType } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuid4 } from "uuid";
import { BASE_URL } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function songsSorting(songs: SongType[]) {
  return songs
    .sort((a, b) => {
      if (a.songTitle < b.songTitle) {
        return -1;
      } else if (a.songTitle > b.songTitle) {
        return 1;
      } else {
        return 0;
      }
    })
    .sort((a, b) => b.votes.length - a.votes.length);
}

export function getToken(expirationInMin?: number) {
  const token = uuid4();
  let tokenExpiration: Date | null = null;
  if (expirationInMin) {
    tokenExpiration = new Date((new Date()).getTime() + expirationInMin * 60 * 1000);
  }

  return { token, tokenExpiration };
}

export function generateClubInviteUrl({
  clubid,
  token,
}: {
  clubid: string;
  token: string;
}) {
  return `${BASE_URL}/join-club/${clubid}?id=${token}`;
}
