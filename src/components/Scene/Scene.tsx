import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";

import Wave from "../Wave";
import PlaneBackground from "../PlaneBackground";

const Scene = () => {
  const camera = useThree((three) => three.camera);
  const controls = useControls({ orbitControl: { value: false } });
  const [, setCameraControls] = useControls("camera", () => ({
    position: { value: { x: 0, y: 0, z: 0 } },
    rotation: { value: { x: 0, y: 0, z: 0 } },
  }));

  return (
    <>
      <color args={["#f7f7f7"]} attach="background" />

      <OrbitControls
        enabled={controls.orbitControl}
        onChange={() => {
          setCameraControls({
            position: {
              x: camera.position.x,
              y: camera.position.y,
              z: camera.position.z,
            },
            rotation: {
              x: camera.rotation.x,
              y: camera.rotation.y,
              z: camera.rotation.z,
            },
          });
        }}
      />

      <fogExp2 attach="fog" color="#f7f7f7" density={0.25} />

      <Wave />
      <PlaneBackground />
    </>
  );
};

export default Scene;
