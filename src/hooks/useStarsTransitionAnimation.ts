import { RefObject, useEffect } from "react";
import gsap from "gsap";

import useStore, { Page } from "../store";

const useStarsTransitionAnimation = (refs: { pointsRef: RefObject<any> }) => {
  const prevPage = useStore((store) => store.prevPage);
  const page = useStore((store) => store.page);

  useEffect(() => {
    const points = refs.pointsRef.current;

    if (prevPage !== page && page === Page.Content) {
      gsap.set(points.scale, { x: 0, y: 0, z: 0 });
      gsap.set(points, { visible: true, delay: 1.7 });
      gsap.to(points.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 2,
        ease: "power1.out",
        delay: 1.7,
      });
    }

    if (prevPage !== page && page === Page.Intro) {
      gsap.to(points.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.15,
        onComplete: () => {
          gsap.set(points, { visible: false });
        },
      });
    }
  }, [prevPage, page]);
};

export default useStarsTransitionAnimation;
