import { create } from "zustand";

type Store = {
  musicPlatformType: "youtube" | "spotify";
  setMusicPlatform: (type: "youtube" | "spotify") => void;
};

export const useMusicPlatform = create<Store>()((set) => ({
  musicPlatformType: "youtube",
  setMusicPlatform: (type: "youtube" | "spotify") =>
    set((state) => ({ musicPlatformType: type })),
}));

