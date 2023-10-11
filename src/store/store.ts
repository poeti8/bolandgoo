import { create } from "zustand";

export enum Page {
  Intro = "Intro",
  Content = "Content",
}

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export interface Store {
  prevPage?: Page;
  page: Page;
  theme: Theme;
  isImagePositioned: boolean;
  isMagazineFlipRequested: boolean;
  isMagazineZommed: boolean;
  isAnimating: boolean;
  isOrderVisible: boolean;
  setIsImagePositioned: (isImagePositioned: boolean) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setIsOrderVisible: (isOrderVisible: boolean) => void;
  setIsMagazineFlipRequested: (isMagazineFlipped: boolean) => void;
  setIsMagazineZoomed: (isMagazineZommed: boolean) => void;
  setPage: (page: Page) => void;
  setTheme: (theme: Theme) => void;
}

const useStore = create<Store>()((set) => ({
  prevPage: Page.Intro,
  page: Page.Intro,
  theme: Theme.Light,
  isImagePositioned: false,
  isMagazineFlipRequested: false,
  isMagazineZommed: false,
  isAnimating: true,
  isOrderVisible: false,
  setIsImagePositioned: (isImagePositioned) => set({ isImagePositioned }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setIsOrderVisible: (isOrderVisible) => set({ isOrderVisible }),
  setIsMagazineFlipRequested: (isMagazineFlipRequested) =>
    set({ isMagazineFlipRequested }),
  setIsMagazineZoomed: (isMagazineZommed) => set({ isMagazineZommed }),
  setPage: (page) =>
    set((store) => ({
      prevPage: store.page,
      page,
    })),
  setTheme: (theme) => set({ theme }),
}));

export default useStore;
