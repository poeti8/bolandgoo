import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

import useStore, { Page, Theme } from "../../store";

const PlaneBackground = () => {
  const planeRef = useRef<THREE.Mesh>(null!);
  const isThemeChanged = useRef(false);
  const prevPage = useStore((store) => store.prevPage);
  const page = useStore((store) => store.page);
  const setTheme = useStore((store) => store.setTheme);

  useEffect(() => {
    if (prevPage === Page.Intro && page === Page.Intro) return;

    if (page === Page.Content) {
      const tl = gsap.timeline({
        onUpdate: () => {
          const progress = tl.totalProgress();
          if (progress > 0.4 && !isThemeChanged.current) {
            isThemeChanged.current = true;
            setTheme(Theme.Dark);
          }
        },
      });
      tl.set(planeRef.current, { visible: true, delay: 0.4 });
      const ratio = window.innerWidth / window.innerHeight;
      tl.to(planeRef.current.scale, {
        x: 2 * ratio,
        y: 2,
        z: 1,
        duration: 2,
        ease: "power1.out",
        delay: 0.4,
      });
    }
  }, [page, prevPage]);

  return (
    <>
      <mesh ref={planeRef} scale={new THREE.Vector3(0, 0, 0)} visible={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#1a1919" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default PlaneBackground;
