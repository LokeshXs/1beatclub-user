import { create } from "zustand";

type StoreType = {
  openSubscriptionModal: boolean;
  setToggleSubscriptionModal: (open: boolean) => void;
};


export const useIsPremiumStore = create<StoreType>((set) => ({
  openSubscriptionModal: false,
  setToggleSubscriptionModal: (open: boolean) => {
    set((prevState) => ({
      openSubscriptionModal: open,
    }));
  },
}));
