import { Canvas } from "@react-three/fiber";

import Scene from "./components/Scene";

const App = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 300,
        position: [0, 10, -8],
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default App;
