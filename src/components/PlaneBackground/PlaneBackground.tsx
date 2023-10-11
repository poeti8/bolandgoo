import { useRef } from "react";
import * as THREE from "three";

import { usePlaneBackgroundTransitionAnimation } from "../../hooks";

const PlaneBackground = () => {
  const planeRef = useRef<THREE.Mesh>(null!);

  usePlaneBackgroundTransitionAnimation({ planeRef });

  return (
    <>
      <mesh ref={planeRef} scale={[0, 0, 0]} position-z={0.1} visible={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#1a1919" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default PlaneBackground;
