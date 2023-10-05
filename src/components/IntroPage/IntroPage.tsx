import { useEffect, useMemo, useRef } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import gsap from "gsap";

import magazinePath from "../../assets/magazine.webp";
import useStore from "../../store";

const IntroPage = () => {
  const isImagePositioned = useStore((store) => store.isImagePositioned);
  const setIsImagePositioned = useStore((store) => store.setIsImagePositioned);
  const isIntroAnimationComplete = useStore(
    (store) => store.isIntroAnimationComplete
  );
  const setIsIntroAnimationComplete = useStore(
    (store) => store.setIsIntroAnimationComplete
  );
  const windowSize = useWindowSize();

  const magazineImageRef = useRef<HTMLImageElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const handleMoveWithMouseAnimation = useMemo(
    () => (e: MouseEvent) => {
      const magazineImage = magazineImageRef.current;
      if (!magazineImage) return;
      if (!isIntroAnimationComplete) return;

      const boundingRect = magazineImage.getBoundingClientRect();

      const rectWidth = boundingRect.width;
      const rectHeight = boundingRect.height;
      const rectX = boundingRect.x;
      const rectY = boundingRect.y;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const x = (mouseX - rectX - rectWidth / 2) / window.innerWidth;
      const y = (mouseY - rectY - rectHeight / 2) / window.innerHeight;

      gsap.to(magazineImage, {
        rotateX: -y * 40,
        rotateY: x * 40,
        x: x * 50,
        y: y * 50,
        transformStyle: "preserve-3d",
      });
    },
    [isIntroAnimationComplete]
  );

  const centerImage = useMemo(
    () => () => {
      const magazineImage = magazineImageRef.current;
      if (!magazineImage) {
        setTimeout(centerImage, 10);
        return;
      }
      const boundingRect = magazineImage.getBoundingClientRect();
      const imageWidth = boundingRect.width;
      const imageHeight = boundingRect.height;
      if (imageWidth < 100 || imageHeight < 100) {
        setTimeout(centerImage, 100);
        return;
      }

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      magazineImage.style.left = windowWidth / 2 - imageWidth / 2 + "px";
      magazineImage.style.top = windowHeight / 2 - imageHeight / 2 + "px";

      setIsImagePositioned(true);
    },
    [setIsImagePositioned]
  );

  useEffect(() => {
    centerImage();
  }, [centerImage, windowSize.width, windowSize.height]);

  useEffect(() => {
    if (!isImagePositioned) return;
    const initialDelay = 2;
    gsap.set(magazineImageRef.current, {
      y: "-25%",
    });
    gsap.set(titleRightRef.current, {
      y: "-25%",
    });
    gsap.set(titleLeftRef.current, {
      y: "-25%",
    });
    gsap.set(subtitleRef.current, {
      y: "-25%",
    });
    gsap.to(magazineImageRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
      delay: initialDelay,
      onComplete: () => {
        setIsIntroAnimationComplete(true);
      },
    });
    gsap.to(titleRightRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
      delay: 1 + initialDelay,
    });
    gsap.to(titleLeftRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
      delay: 1 + initialDelay,
    });
    gsap.to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
      delay: 1.5 + initialDelay,
    });
  }, [isImagePositioned]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMoveWithMouseAnimation);
    return () => {
      window.removeEventListener("mousemove", handleMoveWithMouseAnimation);
    };
  }, [handleMoveWithMouseAnimation]);

  const stretchTitle = useMemo(
    () => () => {
      const titleRight = titleRightRef.current;
      const titleLeft = titleLeftRef.current;

      if (!titleRight || !titleLeft) {
        return stretchTitle();
      }

      const windowWidth = windowSize.width ?? 0;
      let stretchAmount = 0;

      switch (true) {
        case windowWidth > 1400:
          stretchAmount = Math.floor(windowWidth / 56);
          break;

        case windowWidth > 900:
          stretchAmount = 20;
          break;

        case windowWidth < 900:
          stretchAmount = 17;
          break;

        default:
          break;
      }

      titleRight.textContent =
        "مجلـ" + [...new Array(stretchAmount).fill("ـ")].join("");
      titleLeft.textContent =
        [...new Array(stretchAmount).fill("ـ")].join("") + "ـه";
    },
    [windowSize.width]
  );

  useEffect(() => {
    stretchTitle();
  }, [stretchTitle, windowSize.width, windowSize.height]);

  return (
    <>
      <div className="title-wrapper">
        <div className="main-title">
          <h1 ref={titleRightRef}>مجلـ</h1>
          <h1 ref={titleLeftRef}>ـه</h1>
        </div>
        <h2 ref={subtitleRef}>مستقــل موسیقــی</h2>
      </div>
      <a href="#">
        <img ref={magazineImageRef} id="magazine" src={magazinePath} />
      </a>
    </>
  );
};

export default IntroPage;