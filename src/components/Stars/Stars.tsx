import { useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

import useStarsTransitionAnimation from "../../hooks/useStarsTransitionAnimation";
import fragmentShader from "../../shaders/stars/fragment.glsl";
import vertexShader from "../../shaders/stars/vertex.glsl";
import useStore from "../../store";

const Stars = () => {
  const pointsRef = useRef<THREE.Group>(null!);
  const getPixelRatio = useThree((three) => three.gl.getPixelRatio);
  const isMagazineZommed = useStore((store) => store.isMagazineZommed);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth < 768);
  const [windowRatio, setWindowRation] = useState(
    window.innerWidth / window.innerHeight
  );
  const windowSize = useWindowSize();

  useEffect(() => {
    setIsWindowSmall((windowSize.width ?? 0) < 768);
  }, [windowSize.width]);

  useEffect(() => {
    setWindowRation(window.innerWidth / window.innerHeight);
  }, [windowSize.width, windowSize.height]);

  const particles = useMemo(() => {
    const groups = 350;

    const points = [...new Array(groups)].map(() => {
      const count = 6; // 3 points in each group of points
      const position = new Float32Array(count * 3);
      const size = isWindowSmall ? 0.003 : 0.005;
      position[0] = 0;
      position[1] = 0;
      position[2] = 0;

      position[3] = size;
      position[4] = 0;
      position[5] = 0;

      position[6] = 0;
      position[7] = size;
      position[8] = 0;

      const chance1 = Math.random() > 0.5 ? 1 : 0;
      position[9] = chance1 * (size + size);
      position[10] = (1 - chance1) * (size + size);
      position[11] = 0;

      const chance2 = Math.random() > 0.5 ? 1 : 0;
      position[12] = (1 - chance2) * (size + size);
      position[13] = chance2 * (size + size);
      position[14] = 0;

      position[15] = size;
      position[16] = size;
      position[17] = 0;
      return position;
    });
    return points;
  }, [isWindowSmall]);

  const uniforms = useMemo(() => {
    return {
      uBrightness: { value: isWindowSmall ? 0.4 : 0.55 },
      uSize: { value: (isWindowSmall ? 2 : 3) * getPixelRatio() },
    };
  }, [isWindowSmall]);

  useEffect(() => {
    const points = pointsRef.current?.children;
    if (!points) return;
    if (isAnimationStarted) return;

    setIsAnimationStarted(true);

    points.forEach((point) => {
      const chance = Math.random() > 0.5;
      gsap.to(point.position, {
        ...(chance && { x: `+=0.01` }),
        ...(!chance && { y: `+=0.01` }),
        duration: 0.5 + Math.floor(Math.random() * 2 + 1),
        ease: "steps(6)",
        repeat: -1,
        yoyo: true,
      });
    });
  }, [isAnimationStarted]);

  useEffect(() => {
    const points = pointsRef.current;
    if (!points) return;

    const zoomedScale = windowRatio < 1 ? 0.2 : 0.3;

    gsap.to(points.scale, {
      x: isMagazineZommed ? zoomedScale : 1,
      y: isMagazineZommed ? zoomedScale : 1,
      z: isMagazineZommed ? zoomedScale : 1,
      duration: 1,
      ease: "back.out(1)",
    });
  }, [windowRatio, isMagazineZommed]);

  useStarsTransitionAnimation({ pointsRef });

  return (
    <group ref={pointsRef} visible={false}>
      {useMemo(
        () =>
          particles.map((particle, index) => (
            <points
              key={`point-${index}`}
              position-x={
                (Math.random() - 0.5) * (isWindowSmall ? 1 : 1.5) * windowRatio
              }
              position-y={(Math.random() - 0.5) * (isWindowSmall ? 1 : 1.5)}
              rotation-z={Math.PI * 0.5 * Math.floor(Math.random() * 4)}
            >
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={particle}
                  count={particle.length / 3}
                  itemSize={3}
                />
              </bufferGeometry>
              <shaderMaterial
                depthWrite={false}
                vertexColors
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
              />
            </points>
          )),
        [isWindowSmall, windowRatio]
      )}
    </group>
  );
};

export default Stars;
