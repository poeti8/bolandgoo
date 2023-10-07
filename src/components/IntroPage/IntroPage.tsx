import { useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import gsap from "gsap";

import magazineFrontPath from "../../assets/magazine-front.webp";
import magazineBackPath from "../../assets/magazine-back.webp";
import useStore from "../../store";
import { Down, Rotate } from "../Icons";

const IntroPage = () => {
  const [isDiscoverInsideMoving, setIsDiscoverInsideMoving] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const isImagePositioned = useStore((store) => store.isImagePositioned);
  const setIsImagePositioned = useStore((store) => store.setIsImagePositioned);
  const isIntroAnimationComplete = useStore(
    (store) => store.isIntroAnimationComplete
  );
  const setIsIntroAnimationComplete = useStore(
    (store) => store.setIsIntroAnimationComplete
  );
  const windowSize = useWindowSize();

  const magazineImageRef = useRef<HTMLAnchorElement>(null);
  const magazineImageFrontRef = useRef<HTMLImageElement>(null);
  const magazineImageBackRef = useRef<HTMLImageElement>(null);
  const rotateIconRef = useRef<SVGSVGElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const handleMoveWithMouseAnimation = useMemo(
    () => (e: MouseEvent) => {
      const magazineWrapper = magazineImageRef.current;
      if (!magazineWrapper) return;
      if (!isIntroAnimationComplete) return;
      if (isFlipping) return;

      const boundingRect = magazineWrapper.getBoundingClientRect();

      const rectWidth = boundingRect.width;
      const rectHeight = boundingRect.height;
      const rectX = boundingRect.x;
      const rectY = boundingRect.y;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const x = (mouseX - rectX - rectWidth / 2) / window.innerWidth;
      const y = (mouseY - rectY - rectHeight / 2) / window.innerHeight;

      gsap.to(magazineWrapper, {
        rotateX: -y * 30,
        rotateY: x * 30,
        //   x: x * 25,
        //   y: y * 25,
        transformStyle: "preserve-3d",
      });
    },
    [isIntroAnimationComplete, isFlipping]
  );

  const centerImage = useMemo(
    () => () => {
      const magazineWrapper = magazineImageRef.current;
      const rotateIcon = rotateIconRef.current;
      if (!magazineWrapper || !rotateIcon) {
        setTimeout(centerImage, 10);
        return;
      }
      const imageBoundingRect = magazineWrapper.getBoundingClientRect();
      const imageWidth = imageBoundingRect.width;
      const imageHeight = imageBoundingRect.height;
      if (imageWidth < 100 || imageHeight < 100) {
        setTimeout(centerImage, 100);
        return;
      }

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      magazineWrapper.style.left = windowWidth / 2 - imageWidth / 2 + "px";
      magazineWrapper.style.top = windowHeight / 2 - imageHeight / 2 + "px";

      const rotateIconBoundingRect = rotateIcon.getBoundingClientRect();
      const rotateIconWidth = rotateIconBoundingRect.width;
      const rotateIconHeight = rotateIconBoundingRect.height;

      rotateIcon.style.left = windowWidth / 2 - rotateIconWidth / 2 + "px";
      rotateIcon.style.top =
        windowHeight / 2 - rotateIconHeight / 2 + imageHeight / 2 + "px";

      setIsImagePositioned(true);
    },
    [setIsImagePositioned]
  );

  useEffect(() => {
    centerImage();
  }, [centerImage, windowSize.width, windowSize.height]);

  useEffect(() => {
    if (isDiscoverInsideMoving) return;
    if (!isImagePositioned) return;
    if (!isIntroAnimationComplete) return;

    gsap.to(".explore svg", {
      y: 7,
      duration: 1.2,
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });
    setIsDiscoverInsideMoving(true);
  }, [
    isDiscoverInsideMoving,
    isImagePositioned,
    isIntroAnimationComplete,
    windowSize.width,
    windowSize.height,
  ]);

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
    gsap.set(".explore span", {
      y: 20,
    });
    gsap.set(".explore svg", {
      y: 20,
    });
    gsap.to(magazineImageRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
      delay: initialDelay,
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
    gsap.to(".explore span", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
      delay: 1.8 + initialDelay,
      onComplete: () => {
        setIsIntroAnimationComplete(true);
      },
    });
    gsap.to(".explore svg", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
      delay: 1.5 + initialDelay,
    });
  }, [isImagePositioned, setIsIntroAnimationComplete]);

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
          stretchAmount = Math.floor(windowWidth / 53);
          break;

        case windowWidth > 900:
          stretchAmount = 20;
          break;

        case windowWidth > 768:
          stretchAmount = 15;
          break;

        case windowWidth > 468:
          stretchAmount = Math.floor(windowWidth / 35);
          break;

        case windowWidth < 468:
          stretchAmount = Math.floor(windowWidth / 14);
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

  const handleMouseEnterAnimation = useMemo(
    () => () => {
      gsap.to(magazineImageRef.current, {
        y: "-3%",
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to("#rotate", {
        y: -10,
        duration: 0.5,
        ease: "power1.out",
      });
    },
    []
  );

  const handleMouseLeaveAnimation = useMemo(
    () => () => {
      gsap.to(magazineImageRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to("#rotate", {
        y: 0,
        duration: 0.5,
        ease: "power1.out",
      });
    },
    []
  );

  const handleMagazineClick = useMemo(
    () => (e: any) => {
      e.preventDefault();
      setIsFlipping(true);

      const isFrontActive =
        magazineImageFrontRef.current?.style.opacity !== "0";

      gsap.to(magazineImageRef.current, {
        rotateY: 90,
        duration: 0.3,
        scaleX: isFrontActive ? 1.5 : 1,
        scaleY: isFrontActive ? 1.5 : 1,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(magazineImageFrontRef.current, {
            opacity: isFrontActive ? 0 : 1,
          });
          gsap.set(magazineImageBackRef.current, {
            opacity: isFrontActive ? 1 : 0,
          });
          gsap.to(magazineImageRef.current, {
            rotateY: 0,
            duration: 0.3,
            ease: "power1.in",
            onComplete: () => {
              setIsFlipping(false);
            },
          });
        },
      });
    },
    []
  );

  return (
    <>
      <div className="title-wrapper">
        <div className="main-title">
          <h1 ref={titleRightRef}>مجلـ</h1>
          <h1 ref={titleLeftRef}>ـه</h1>
        </div>
        <h2 ref={subtitleRef}>موسیقی بلندگو</h2>
      </div>
      <a
        ref={magazineImageRef}
        onMouseEnter={handleMouseEnterAnimation}
        onMouseLeave={handleMouseLeaveAnimation}
        id="magazine-image"
        href="#"
        onClick={handleMagazineClick}
      >
        <img
          ref={magazineImageFrontRef}
          id="magazine-front"
          src={magazineFrontPath}
        />
        <img
          ref={magazineImageBackRef}
          id="magazine-back"
          src={magazineBackPath}
        />
        <Rotate id="rotate" ref={rotateIconRef} />
      </a>
      <div className="explore">
        <a href="#" title="دیدن داخل">
          <span>داخلش را ببینید</span>
          <Down />
        </a>
      </div>
    </>
  );
};

export default IntroPage;
