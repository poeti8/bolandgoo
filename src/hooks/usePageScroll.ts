import { useCallback, useEffect } from "react";
import useStore, { Page } from "../store";

enum Direction {
  Down = "Down",
  Up = "Up",
}

type HandlePageChange = (direction: Direction) => void;

let touchStartY: undefined | number;
let touchEndY: undefined | number;

const handleTouchStart = (e: TouchEvent) => {
  touchStartY = e.changedTouches[0].screenY;
};

const handleTouchEnd =
  (handlePageChange: HandlePageChange) => (e: TouchEvent) => {
    touchEndY = e.changedTouches[0].screenY;

    if (typeof touchStartY !== "number") return;
    if (typeof touchEndY !== "number") return;
    if (Math.abs(touchEndY - touchStartY) < 50) return;

    handlePageChange(touchEndY - touchStartY ? Direction.Down : Direction.Up);

    touchStartY = undefined;
  };

const handleWheel = (handlePageChange: HandlePageChange) => (e: WheelEvent) => {
  const deltaY = e.deltaY;
  if (Math.abs(deltaY) < 5) return;

  handlePageChange(deltaY > 0 ? Direction.Down : Direction.Up);
};

const usePageScroll = () => {
  const page = useStore((store) => store.page);
  const setPage = useStore((store) => store.setPage);
  const isAnimating = useStore((store) => store.isAnimating);
  const setIsAnimating = useStore((store) => store.setIsAnimating);

  const handlePageChange = useCallback(
    (direction: Direction) => {
      if (isAnimating) return;

      if (page === Page.Intro && direction === Direction.Down) {
        setPage(Page.Content);
        setIsAnimating(true);
      }

      if (page === Page.Content && direction === Direction.Up) {
        setPage(Page.Intro);
        setIsAnimating(true);
      }
    },
    [isAnimating, setIsAnimating, page, setPage]
  );

  useEffect(() => {
    const touchEndFn = handleTouchEnd(handlePageChange);
    const wheelFn = handleWheel(handlePageChange);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", touchEndFn);
    window.addEventListener("wheel", wheelFn);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", touchEndFn);
      window.removeEventListener("wheel", wheelFn);
    };
  }, [handlePageChange]);
};

export default usePageScroll;
