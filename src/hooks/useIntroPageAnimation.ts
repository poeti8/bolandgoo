import { RefObject, useEffect } from "react";
import gsap from "gsap";

import useStore from "../store";

const useIntroPageAnimation = (refs: {
  magazineImageRef: RefObject<any>;
  titleRightRef: RefObject<any>;
  titleLeftRef: RefObject<any>;
  subtitleRef: RefObject<any>;
}) => {
  const isImagePositioned = useStore((store) => store.isImagePositioned);
  const setIsAnimating = useStore((store) => store.setIsAnimating);

  // TODO: sping intro

  useEffect(() => {
    if (!isImagePositioned) return;
    const initialDelay = 1.5;
    gsap.set(refs.magazineImageRef.current, {
      y: "-25%",
    });
    gsap.set(refs.titleRightRef.current, {
      y: "-25%",
    });
    gsap.set(refs.titleLeftRef.current, {
      y: "-25%",
    });
    gsap.set(refs.subtitleRef.current, {
      y: "-25%",
    });
    gsap.set(".explore span", {
      y: 20,
    });
    gsap.set(".explore svg", {
      y: 20,
    });
    gsap.to(refs.magazineImageRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay: initialDelay,
    });
    gsap.to(refs.titleRightRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 1 + initialDelay,
    });
    gsap.to(refs.titleLeftRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 1 + initialDelay,
    });
    gsap.to(refs.subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 1.5 + initialDelay,
    });
    gsap.to(".explore span", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 1.3 + initialDelay,
      onComplete: () => {
        setIsAnimating(false);
      },
    });
    gsap.to(".explore svg", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 1 + initialDelay,
    });
  }, [isImagePositioned, setIsAnimating]);
};

export default useIntroPageAnimation;
