import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";

import useStore from "../store";

const useIntroPageWaveAnimation = () => {
  const isImagePositioned = useStore((store) => store.isImagePositioned);
  const camera = useThree((three) => three.camera);

  useEffect(() => {
    if (!isImagePositioned) return;

    gsap.from(camera.rotation, {
      y: Math.PI / 3,
      duration: 3,
      ease: "power1.out",
    });
    gsap.from(camera.position, {
      z: -1,
      y: 1,
      x: -1,
      duration: 3,
      ease: "power1.out",
    });
  }, [isImagePositioned, camera.rotation, camera.position]);
};

export default useIntroPageWaveAnimation;
