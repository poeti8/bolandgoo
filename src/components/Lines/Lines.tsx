import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { useControls } from "leva";

const noise3D = createNoise3D(() => 0.5);

const geometry = new THREE.BufferGeometry();

const points = [new THREE.Vector3(-0.2, 0, 0), new THREE.Vector3(0.2, 0, 0)];
geometry.setFromPoints(points);

const Lines = () => {
  const controls = useControls({
    scalex: { value: 1, step: 0.01, min: 0, max: 5 },
    rows: { value: 40, step: 1, min: 0, max: 100 },
    cols: { value: 40, step: 1, min: 0, max: 400 },
    nx: { value: 0.01, step: 0.01, min: -10, max: 10 },
    ny: { value: 0.01, step: 0.01, min: -10, max: 10 },
    na: { value: 0.1, step: 0.01, min: -2, max: 2 },
  });
  const [_, setControls] = useControls(() => ({
    camera: { value: { x: 0, y: 0, z: 0 } },
    rotation: { value: { x: 0, y: 0, z: 0 } },
  }));

  const linesRef = useRef<THREE.Group>(null!);
  const rows = useMemo(() => controls.rows, [controls.rows]);
  const cols = useMemo(() => controls.cols, [controls.cols]);
  const list = useMemo(() => {
    return [...new Array(rows * cols)];
  }, [rows, cols]);
  const lines = useMemo(() => {
    return list.map((_, index) => {
      const col = Math.floor(index % cols);
      const row = Math.floor(index / cols);
      const n = noise3D(col * 0.002, row * 0.002, 0);
      return (
        <line
          // @ts-ignore
          geometry={geometry}
          position={[col * 0.03, row * 0.03, 0]}
          rotation={[0, 0, n * 180]}
          scale={Math.random() * 0.6 + 0.5}
        >
          <lineBasicMaterial color="black" />
        </line>
      );
    });
  }, [list, rows, cols]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!linesRef.current) return;

    linesRef.current.children.forEach((line, index) => {
      const col = Math.floor(index % rows);
      const row = Math.floor(index / cols);
      const n =
        noise3D(
          col * controls.nx * 0.01,
          row * controls.ny * 0.01,
          time * 0.002
        ) * controls.na;
      line.rotation.z = n * 180;
      // line.scale.setX(controls.scalex);
    });

    setControls({
      camera: {
        x: state.camera.position.x,
        y: state.camera.position.y,
        z: state.camera.position.z,
      },
      rotation: {
        x: state.camera.rotation.x,
        y: state.camera.rotation.y,
        z: state.camera.rotation.z,
      },
    });
  });

  return <group ref={linesRef}>{lines}</group>;
};

export default Lines;
