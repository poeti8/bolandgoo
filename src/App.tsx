import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Scene from "./components/Scene";
import Header from "./components/Header";
import IntroPage from "./components/IntroPage";
import ContentPage from "./components/ContentPage";
import Order from "./components/Order";

import { usePageScroll } from "./hooks";

const App = () => {
  usePageScroll();

  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          position: [1.9, 0.3, 3.1],
        }}
        style={{ position: "absolute" }}
      >
        <Scene />
      </Canvas>

      <Leva hidden={!window.location.href.includes("debug")} flat collapsed />

      <div id="content">
        <Header />
        <IntroPage />
        <ContentPage />
      </div>
      <Order />
    </>
  );
};

export default App;
