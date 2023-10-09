import { useThree } from "@react-three/fiber";
import { RefObject, useEffect, useRef } from "react";
import { Vector3 } from "three";
import gsap from "gsap";

import useStore, { Page } from "../store";

const useWaveTransitionAnimation = (refs: {
  rectanglesRef: RefObject<any>;
}) => {
  const isFinished = useRef(false);
  const prevPage = useStore((store) => store.prevPage);
  const page = useStore((store) => store.page);
  const camera = useThree((three) => three.camera);
  const fog = useThree((three) => three.scene.fog);

  useEffect(() => {
    if (prevPage === Page.Intro && page === Page.Intro) return;

    if (page === Page.Content) {
      const tl = gsap.timeline({
        onUpdate: () => {
          const progress = tl.totalProgress();
          if (progress > 0.3 && !isFinished.current) {
            isFinished.current = true;
            refs.rectanglesRef.current.visible = false;
            (fog as THREE.FogExp2).density = 0;
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = -1;
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            camera.lookAt(new Vector3(0, 0, 0));
            const animations = tl.getChildren();
            animations.forEach((animation) => {
              animation.kill();
            });
          }
        },
      });
      tl.to(
        camera.rotation,
        {
          x: -1.46,
          y: 0.02,
          z: 0.2,
          duration: 2.5,
          ease: "power1.out",
        },
        0
      );
      tl.to(
        camera.position,
        {
          x: 0.06,
          y: 1.5,
          z: 0.21,
          duration: 2.5,
          ease: "power1.out",
        },
        0
      );
      tl.pr;
    }
  }, [prevPage, page, camera.rotation, camera.position]);
};

export default useWaveTransitionAnimation;
