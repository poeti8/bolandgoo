import { RefObject, useEffect } from "react";
import gsap from "gsap";

import useStore, { Page } from "../store";

const useContentPageTransitionAnimation = (refs: {
  imageRef: RefObject<any>;
  tocRef: RefObject<any>;
}) => {
  const page = useStore((store) => store.page);
  const prevPage = useStore((store) => store.prevPage);
  const setIsAnimating = useStore((store) => store.setIsAnimating);

  useEffect(() => {
    const image = refs.imageRef.current;
    const toc = refs.tocRef.current;
    if (!image) return;
    if (!toc) return;

    if (prevPage !== Page.Content && page === Page.Content) {
      const isNarrow = window.innerHeight / window.innerWidth > 1.2;

      const tl = gsap.timeline({
        delay: 1.5,
        onComplete: () => {
          setIsAnimating(false);
        },
      });
      tl.set(image, { y: "150%", visibility: "visible" });
      tl.set(image, { xPercent: -50 });
      tl.set(toc, { xPercent: 150, visibility: "visible" });
      tl.to(image, {
        y: "55%",
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1)",
      });
      tl.to(image, {
        xPercent: isNarrow ? -125 : -110,
        scale: isNarrow ? 1.4 : 1,
        duration: 1.2,
        ease: "back.out(1)",
      });
      tl.to(
        toc,
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "back.out(1)",
        },
        "<"
      );
    }

    if (prevPage !== Page.Intro && page === Page.Intro) {
      const tl = gsap.timeline({
        onComplete: () => {
          image.visibility = "hidden";
          toc.visibility = "hidden";
        },
      });
      tl.to(
        image,
        {
          xPercent: -200,
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
        },
        "<"
      );
      tl.to(
        toc,
        {
          xPercent: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
        },
        "<"
      );
    }
  }, [setIsAnimating, page]);
};

export default useContentPageTransitionAnimation;
