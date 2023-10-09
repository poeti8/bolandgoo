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

  useEffect(() => {
    if (prevPage === Page.Intro && page === Page.Intro) return;

    if (page === Page.Content) {
      gsap.to(refs.magazineImageRef.current, {
        y: "-25%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.25,
      });
      gsap.to(refs.titleRightRef.current, {
        y: "-25%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(refs.titleLeftRef.current, {
        y: "-25%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(refs.subtitleRef.current, {
        y: "-25%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(".explore span", {
        y: 20,
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
  }, [prevPage, page]);
};

export default useIntroPageTransitionAnimation;
