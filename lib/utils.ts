import { SongType } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
