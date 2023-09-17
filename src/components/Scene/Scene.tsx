import { OrbitControls } from "@react-three/drei";

import Lines from "../Lines";

const Scene = () => {
  return (
    <>
      <color args={["#021119"]} attach="background" />

      <OrbitControls />

      <fogExp2 attach="fog" color="#021119" density={0.035} />

      <Lines />
    </>
  );
};

export default Scene;
