import { RefObject, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

import useStore, { Page, Theme } from "../store";

const usePlaneBackgroundTransitionAnimation = (refs: {
  planeRef: RefObject<any>;
}) => {
  const isThemeChanged = useRef(false);
  const camera = useThree((three) => three.camera);
  const fog = useThree((three) => three.scene.fog);
  const prevPage = useStore((store) => store.prevPage);
  const page = useStore((store) => store.page);
  const setTheme = useStore((store) => store.setTheme);

  useEffect(() => {
    const plane = refs.planeRef.current;
    if (prevPage === Page.Intro && page === Page.Intro) return;

    if (prevPage !== Page.Content && page === Page.Content) {
      isThemeChanged.current = false;
      const tl = gsap.timeline({
        onUpdate: () => {
          const progress = tl.totalProgress();
          if (progress > 0.4 && !isThemeChanged.current) {
            isThemeChanged.current = true;
            setTheme(Theme.Dark);
          }
        },
      });
      tl.set(plane, { visible: true, delay: 0.4 });
      const ratio = window.innerWidth / window.innerHeight;
      tl.to(plane.scale, {
        x: 2 * ratio,
        y: 2,
        z: 1,
        duration: 2,
        ease: "power1.out",
        delay: 0.4,
      });
    }

    if (prevPage !== Page.Intro && page === Page.Intro) {
      isThemeChanged.current = false;
      const tl = gsap.timeline({
        onUpdate: () => {
          const progress = tl.totalProgress();
          if (progress > 0.1 && !isThemeChanged.current) {
            isThemeChanged.current = true;
            setTheme(Theme.Light);
          }
        },
        onComplete: () => {
          camera.position.x = -1;
          camera.position.y = 1;
          camera.position.z = -1;
          camera.rotation.y = Math.PI / 3;
          camera.lookAt(new THREE.Vector3(-0.52, -0.08, -0.85));
          (fog as THREE.FogExp2).density = 0.25;
          tl.set(plane, { visible: false });
        },
      });
      tl.to(plane.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.6,
        ease: "power1.out",
        delay: 0.15,
      });
    }
  }, [page, prevPage]);
};

export default usePlaneBackgroundTransitionAnimation;
