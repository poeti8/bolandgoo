import { OrbitControls } from "@react-three/drei";

import Wave from "../Wave";
import { useControls } from "leva";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect } from "react";

const Scene = () => {
  const controls = useControls({ orbitControl: { value: false } });
  const windowSize = useWindowSize();

  useEffect(() => {
    windowSize;
  }, [windowSize.width]);

  return (
    <>
      <color args={["#f7f7f7"]} attach="background" />

      <OrbitControls enabled={controls.orbitControl} />

      <fogExp2 attach="fog" color="#f7f7f7" density={0.25} />

      <Wave />
    </>
  );
};

export default Scene;
