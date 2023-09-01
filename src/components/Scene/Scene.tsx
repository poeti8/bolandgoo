import { OrbitControls } from "@react-three/drei";

import Lines from "../Lines";

const Scene = () => {
  return (
    <>
      <color args={["#021119"]} attach="background" />

      <OrbitControls />

      <Lines />
    </>
  );
};

export default Scene;
