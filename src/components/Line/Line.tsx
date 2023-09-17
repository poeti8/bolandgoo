import { useMemo, FC } from "react";
import * as THREE from "three";

import lineVertexShader from "../../shaders/line/vertex.glsl";
import lineFragmentShader from "../../shaders/line/fragment.glsl";
import planeFragmentShader from "../../shaders/plane/fragment.glsl";

interface Props {
  index: number;
}

const lineGeometry = new THREE.BoxGeometry(5, 0.03, 0.02, 128, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(5, 1.5, 128, 1);

const Line: FC<Props> = (props) => {
  const uniforms = useMemo(() => {
    return {
      uOffset: { value: props.index * 11 },
      uTime: { value: 0 },
      ...THREE.UniformsLib["fog"],
    };
  }, [props.index]);

  return (
    <group>
      <mesh position-z={props.index * 0.095} geometry={lineGeometry}>
        <shaderMaterial
          vertexShader={lineVertexShader}
          fragmentShader={lineFragmentShader}
          uniforms={uniforms}
          fog
        />
      </mesh>
      x
      <mesh
        position-z={props.index * 0.095}
        position-y={-0.75}
        geometry={planeGeometry}
      >
        <shaderMaterial
          side={THREE.DoubleSide}
          vertexShader={lineVertexShader}
          fragmentShader={planeFragmentShader}
          uniforms={uniforms}
          fog
        />
      </mesh>
    </group>
  );
};

export default Line;
