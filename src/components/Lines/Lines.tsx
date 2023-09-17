import { useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import Line from "../Line";

const Lines = () => {
  const linesRef = useRef<THREE.Group>(null!);

  const linesCount = useMemo(() => 69, []);
  const linesList = useMemo(() => [...new Array(linesCount)], [linesCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const lines = linesRef.current;
    if (!lines) return;
    lines.children.forEach((line) => {
      line.children.forEach((lineOrPlane: any) => {
        lineOrPlane.material.uniforms.uTime.value = time;
      });
    });
  });

  return (
    <Center>
      <group ref={linesRef}>
        {linesList.map((_item, index) => {
          return <Line index={index} />;
        })}
      </group>
    </Center>
  );
};

export default Lines;
