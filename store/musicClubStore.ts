import { create } from "zustand";

type StoreType = {
  selectedClub:
    | {
        name: string;
        id: string;
        adminId:string;
      }
    | undefined;

  setSelectedClub: (club: { name: string; id: string,adminId:string }) => void;
};

export const useMusicClub = create<StoreType>((set) => ({
  selectedClub: undefined,
  setSelectedClub: (club: { name: string; id: string,adminId:string }) => {
    set((prevState) => ({
      selectedClub: club,
    }));
  },
}));
