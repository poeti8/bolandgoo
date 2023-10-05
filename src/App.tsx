import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import logoPath from "./assets/logo.png";
import Scene from "./components/Scene";
import IntroPage from "./components/IntroPage";

const App = () => {
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
        <header>
          <div id="logo">
            <img src={logoPath} />
          </div>
          <nav>
            <ul>
              <li>
                <a href="#about">درباره</a>
              </li>
              <li>
                <a href="#contact">سفارش</a>
              </li>
              <li>
                <a href="https://spotify.com" target="_blank">
                  اسپاتیفای
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank">
                  اینستاگرام
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          {/* <h1>بلندگو</h1>
          <p>
            بلندگو مجله‌ای مستقل برای شکل‌گیری از انواع موسیقی می‌توان گفت که در
            حال حاضر در مجامع مختلف هنر تلفیقی این که لزوم است.
          </p> */}
          <IntroPage />
        </main>
      </div>
    </>
  );
};

export default App;
