import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { createNoise2D } from "simplex-noise";
import { useControls } from "leva";
import * as THREE from "three";
import gsap from "gsap";

import useStore from "../../store";

const noise2D = createNoise2D(() => 0.5);

const geometry = new THREE.BoxGeometry(0.005, 0.1, 0.005);

const Wave = () => {
  const isImagePositioned = useStore((store) => store.isImagePositioned);
  const isIntroAnimationComplete = useStore(
    (store) => store.isIntroAnimationComplete
  );
  const fogExp = useThree((three) => three.scene.fog);
  const camera = useThree((three) => three.camera);
  const windowSize = useWindowSize();

  const rectanglesRef = useRef<THREE.Group>(null);

  const [controls, setControls] = useControls("wave", () => ({
    r: { value: 2.4, min: -10, max: 10, step: 0.01 },
    count: { value: 1400, min: 1, max: 2000, step: 1 },
    rotationYSpeed: { value: 0.02, min: 0, max: 1, step: 0.01 },
    rotationXIntensity: { value: 10, min: 0, max: 100, step: 0.01 },
    rotationZIntensity: { value: 10, min: 0, max: 100, step: 0.01 },
    nx: { value: 20, min: 0, max: 50, step: 0.01 },
    nt: { value: 0.08, min: 0, max: 2, step: 0.01 },
    scaleY: { value: 4, min: 0, max: 10, step: 0.01 },
  }));

  const rectangles = useMemo(() => {
    const list = [...new Array(controls.count)];
    return list.map((_, index) => {
      const r = controls.r;
      const coef = (Math.PI * 2) / controls.count;
      const x = Math.sin(coef * index) * r;
      const z = Math.cos(coef * index) * r;
      return (
        <mesh
          key={`${index}-wave`}
          geometry={geometry}
          position-x={x}
          position-z={z}
        >
          <meshBasicMaterial color={"#F7F7F7"} />
        </mesh>
      );
    });
  }, [controls.count, controls.r]);

  useFrame((state) => {
    const rects = rectanglesRef.current;
    if (!rects) return;

    const elapsedTime = state.clock.getElapsedTime();

    rects.rotation.y += controls.rotationYSpeed * -0.01;

    rects.children.forEach((rect) => {
      const n = noise2D(
        rect.position.x * controls.nx,
        elapsedTime * controls.nt
      );
      const scaleY = (n + 0.8) * 0.5 * controls.scaleY;
      rect.scale.setY(scaleY);
    });

    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    const rotationX =
      (mouseY / window.innerHeight) * controls.rotationXIntensity;
    const rotationZ =
      (mouseX / window.innerWidth) * controls.rotationZIntensity;

    rects.rotation.x = THREE.MathUtils.lerp(rects.rotation.x, rotationX, 0.1);
    rects.rotation.z = THREE.MathUtils.lerp(rects.rotation.z, rotationZ, 0.1);

    if (
      windowSize.width &&
      windowSize.width < 900 &&
      isIntroAnimationComplete
    ) {
      const magazineImage = document.getElementById("magazine-image");
      const float = Math.cos(elapsedTime) * 10;
      if (magazineImage) {
        gsap.to(magazineImage, { y: float });
      }
    }
  });

  useEffect(() => {
    const rects = rectanglesRef.current;
    if (!rects) return;
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

  useEffect(() => {
    const windowWidth = windowSize.width ?? 0;
    const fog = (fogExp as THREE.FogExp2) || {};

    if (windowWidth > 1200) {
      fog.density = 0.25;
      setControls({
        r: 2.4,
        count: 1400,
        rotationYSpeed: 0.02,
        scaleY: 4,
        nt: 0.08,
      });
      return;
    }

    if (windowWidth > 768) {
      fog.density = 0.24;
      setControls({
        r: 2,
        count: 1200,
        rotationYSpeed: 0.02,
        scaleY: 3.8,
        nt: 0.08,
      });
      return;
    }

    if (windowWidth > 480) {
      fog.density = 0.23;
      setControls({
        r: 1.7,
        count: 1000,
        rotationYSpeed: 0.04,
        scaleY: 3.2,
        nt: 0.1,
      });
      return;
    }

    if (windowWidth <= 480) {
      fog.density = 0.21;
      setControls({
        r: 1.5,
        count: 800,
        rotationYSpeed: 0.05,
        scaleY: 3,
        nt: 0.15,
      });
    }
  }, [windowSize.width, setControls, controls, fogExp]);

  return <group ref={rectanglesRef}>{rectangles}</group>;
};

export default Wave;
