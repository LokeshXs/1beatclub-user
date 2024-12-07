import { create } from "zustand";
import { SongType } from "@/types/types";
import { songsSorting } from "@/lib/utils";

type StoreType = {
  listedSongs: SongType[];
  currentSongPlaying: SongType | null;
  setCurrentSongPlaying: (song: SongType | null) => void;
  addNewSong: (videoDetails: SongType) => void;
  addSongs: (songs: SongType[]) => void;
  removeSong: (songId: string) => void;
  updateVote: (
    type: "upvote" | "downVote",
    songId: string,
    userId: string
  ) => void;
  nextSong: () => void;
  resetSongs: () => void;
  areSongsLoading: boolean;
  setAreSongsLoading: (isLoading: boolean) => void;
};

export const useListedSongStore = create<StoreType>((set) => ({
  listedSongs: [],
  areSongsLoading: false,
  currentSongPlaying: null,
  setAreSongsLoading: (isLoading: boolean) => {
    set((prevState) => ({
      areSongsLoading: isLoading,
    }));
  },

  addNewSong: (videoDetails: SongType) => {
    set((prevState) => ({
      currentSongPlaying: prevState.currentSongPlaying || videoDetails,
      listedSongs: prevState.currentSongPlaying
        ? songsSorting([...prevState.listedSongs, videoDetails])
        : [],
    }));
  },

  addSongs: (songs: SongType[]) => {
    set((prevState) => ({
      listedSongs: songsSorting(songs),
    }));
  },

  removeSong: (songId: string) => {
    set((prevState) => ({
      listedSongs: songsSorting(
        prevState.listedSongs.filter((value: SongType) => value.id !== songId)
      ),
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
