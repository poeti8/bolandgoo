import { Center } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import lineVertexShader from "../../shaders/line/vertex.glsl";
import lineFragmentShader from "../../shaders/line/fragment.glsl";

const Lines = () => {
  const linesRef = useRef<THREE.Group>(null!);

  const linesCount = useMemo(() => 1, []);
  const linesList = useMemo(() => [...new Array(linesCount)], [linesCount]);

  return (
    <Center>
      <group ref={linesRef}>
        {linesList.map((_item, index) => {
          return (
            <mesh position-z={index * 0.095}>
              <boxGeometry args={[5, 1, 1, 32, 1, 1]} />
              <shaderMaterial
                vertexShader={lineVertexShader}
                fragmentShader={lineFragmentShader}
                wireframe
              />
            </mesh>
          );
        })}
      </group>
    </Center>
  );
};

export default Lines;
