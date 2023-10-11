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

  useEffect(() => {
    if (!isImagePositioned) return;
    const initialDelay = 1.5;
    gsap.set(refs.magazineImageRef.current, {
      yPercent: -25,
      rotateY: 180,
    });
    gsap.set(refs.titleRightRef.current, {
      yPercent: -25,
    });
    gsap.set(refs.titleLeftRef.current, {
      yPercent: -25,
    });
    gsap.set(refs.subtitleRef.current, {
      yPercent: -25,
    });
    gsap.set(".explore span", {
      y: 20,
    });
    gsap.set(".explore svg", {
      y: 20,
    });
    gsap.to(refs.magazineImageRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      delay: initialDelay,
    });
    gsap.to(refs.magazineImageRef.current, {
      duration: 1.5,
      rotateY: 0,
      ease: "back.out(1.7)",
      delay: initialDelay,
    });
    gsap.to(refs.titleRightRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      delay: 1 + initialDelay,
    });
    gsap.to(refs.titleLeftRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      delay: 1 + initialDelay,
    });
    gsap.to(refs.subtitleRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      delay: 1.5 + initialDelay,
    });
    gsap.to(".explore span", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      delay: 1.3 + initialDelay,
      onComplete: () => {
        setIsAnimating(false);
      },
    });
    gsap.to(".explore svg", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      delay: 1 + initialDelay,
    });
  }, [isImagePositioned, setIsAnimating]);
};

export default useIntroPageAnimation;
