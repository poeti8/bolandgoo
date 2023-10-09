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
  isAnimating: boolean;
  setIsImagePositioned: (positioned: boolean) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setPage: (page: Page) => void;
  setTheme: (theme: Theme) => void;
}

const useStore = create<Store>()((set) => ({
  prevPage: Page.Intro,
  page: Page.Intro,
  theme: Theme.Light,
  isImagePositioned: false,
  isAnimating: true,
  setIsImagePositioned: (positioned) => set({ isImagePositioned: positioned }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setPage: (page) =>
    set((store) => ({
      prevPage: store.page,
      page,
    })),
  setTheme: (theme) => set({ theme }),
}));

export default useStore;
