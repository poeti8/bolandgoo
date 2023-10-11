import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

import PlaneBackground from "../PlaneBackground";
import Stars from "../Stars";
import Wave from "../Wave";

const Scene = () => {
  const controls = useControls({ orbitControl: { value: false } });
  return (
    <>
      <color args={["#f7f7f7"]} attach="background" />

      <OrbitControls enabled={controls.orbitControl} />

      <fogExp2 attach="fog" color="#f7f7f7" density={0.25} />

      <Wave />
      <PlaneBackground />
      <Stars />
    </>
  );
};

export default Scene;
