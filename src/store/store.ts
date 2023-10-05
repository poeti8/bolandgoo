import { create } from "zustand";

interface Store {
  isImagePositioned: boolean;
  isIntroAnimationComplete: boolean;
  setIsImagePositioned: (positioned: boolean) => void;
  setIsIntroAnimationComplete: (complete: boolean) => void;
}

const useStore = create<Store>()((set) => ({
  isImagePositioned: false,
  isIntroAnimationComplete: false,
  setIsImagePositioned: (positioned) =>
    set({
      isImagePositioned: positioned,
    }),
  setIsIntroAnimationComplete: (complete) =>
    set({
      isIntroAnimationComplete: complete,
    }),
}));

export default useStore;
