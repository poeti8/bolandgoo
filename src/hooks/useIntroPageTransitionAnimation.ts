import { RefObject, useEffect } from "react";
import gsap from "gsap";

import useStore, { Page } from "../store";

const useIntroPageTransitionAnimation = (refs: {
  magazineImageRef: RefObject<any>;
  titleRightRef: RefObject<any>;
  titleLeftRef: RefObject<any>;
  subtitleRef: RefObject<any>;
}) => {
  const prevPage = useStore((store) => store.prevPage);
  const page = useStore((store) => store.page);
  const setIsAnimating = useStore((store) => store.setIsAnimating);

  useEffect(() => {
    if (prevPage === Page.Intro && page === Page.Intro) return;

    if (prevPage !== Page.Content && page === Page.Content) {
      gsap.to(refs.magazineImageRef.current, {
        yPercent: -25,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.25,
      });
      gsap.to(refs.titleRightRef.current, {
        yPercent: -25,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(refs.titleLeftRef.current, {
        yPercent: -25,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(refs.subtitleRef.current, {
        yPercent: -25,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(".explore span", {
        yPercent: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(".explore svg", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.3,
        onComplete: () => {
          gsap.set("#intro-section", { display: "none" });
        },
      });
    }

    if (prevPage !== Page.Intro && page === Page.Intro) {
      const initialDelay = 2.5;
      gsap.set(refs.magazineImageRef.current, {
        yPercent: -25,
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
      gsap.set("#intro-section", { display: "flex", delay: 1 });
      gsap.to(refs.magazineImageRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.7)",
        delay: initialDelay,
      });
      gsap.to(refs.titleRightRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.7)",
        delay: 1 + initialDelay,
      });
      gsap.to(refs.titleLeftRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.7)",
        delay: 1 + initialDelay,
      });
      gsap.to(refs.subtitleRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.7)",
        delay: 1.5 + initialDelay,
      });
      gsap.to(".explore span", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.7)",
        delay: 1.3 + initialDelay,
        onComplete: () => {
          setIsAnimating(false);
        },
      });
      gsap.to(".explore svg", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.7)",
        delay: 1 + initialDelay,
      });
    }
  }, [prevPage, page, setIsAnimating]);
};

export default useIntroPageTransitionAnimation;
