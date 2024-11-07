import { create } from "zustand";
import { SongType } from "@/types/types";
import { songsSorting } from "@/lib/utils";

type StoreType = {
  listedSongs: SongType[];
  currentSongPlaying: SongType | null;
  setCurrentSongPlaying: (song: SongType | null) => void;
  addNewSong: (videoDetails: SongType) => void;
  addSongs: (songs: SongType[]) => void;
  updateVote: (
    type: "upvote" | "downVote",
    songId: string,
    userId: string
  ) => void;
  nextSong: () => void;
  resetSongs: () => void;
};

export const useListedSongStore = create<StoreType>((set) => ({
  listedSongs: [],
  currentSongPlaying: null,

  addNewSong: (videoDetails: SongType) => {
    set((prevState) => ({
      currentSongPlaying: prevState.currentSongPlaying || videoDetails,
      listedSongs: prevState.currentSongPlaying
        ? [...prevState.listedSongs, videoDetails]
        : [],
    }));
  },

  addSongs: (songs: SongType[]) => {
    set((prevState) => ({
      listedSongs: songsSorting(songs),
    }));
  },

  setCurrentSongPlaying: (currentSong: SongType | null) => {
    set((prevState) => ({
      currentSongPlaying: currentSong,
    }));
  },

  resetSongs: () => {
    set((prevState) => ({
      listedSongs: [],
    }));
  },

  updateVote: (type: "upvote" | "downVote", songId: string, userId: string) => {
    set((prevState) => ({
      listedSongs: songsSorting(
        prevState.listedSongs.map((value) => {
          if (value.id === songId) {
            if (type === "upvote") {
              value.votes.push({
                userId: userId,
                songId: songId,
              });
            } else {
              value.votes = [
                ...value.votes.filter((value) => value.userId !== userId),
              ];
            }
          }

          return value;
        })
      ),
    }));
  },

  nextSong: () => {
    set((prevState) => ({
      currentSongPlaying: prevState.listedSongs[0] || null,
      listedSongs: prevState.listedSongs.slice(1),
    }));
  },
}));
