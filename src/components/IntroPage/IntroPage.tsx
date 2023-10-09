import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import gsap from "gsap";

import magazineFrontPath from "../../assets/magazine-front.webp";
import magazineBackPath from "../../assets/magazine-back.webp";
import useStore, { Page } from "../../store";
import { Down, Rotate } from "../Icons";
import {
  useIntroPageAnimation,
  useIntroPageTransitionAnimation,
} from "../../hooks";

const IntroPage = () => {
  const [isDiscoverInsideMoving, setIsDiscoverInsideMoving] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const page = useStore((store) => store.page);
  const isImagePositioned = useStore((store) => store.isImagePositioned);
  const setIsImagePositioned = useStore((store) => store.setIsImagePositioned);
  const isAnimating = useStore((store) => store.isAnimating);
  const windowSize = useWindowSize();

  const magazineImageRef = useRef<HTMLAnchorElement>(null);
  const magazineImageFrontRef = useRef<HTMLImageElement>(null);
  const magazineImageBackRef = useRef<HTMLImageElement>(null);
  const rotateIconRef = useRef<SVGSVGElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const handleMoveWithMouseAnimation = useCallback(
    (e: MouseEvent) => {
      const magazineWrapper = magazineImageRef.current;
      if (!magazineWrapper) return;
      if (isAnimating) return;
      if (isFlipping) return;
      if (page !== Page.Intro) return;

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
    [page, isAnimating, isFlipping]
  );

  const centerImage = useCallback(() => {
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
  }, [setIsImagePositioned]);

  useEffect(() => {
    centerImage();
  }, [centerImage, windowSize.width, windowSize.height]);

  useEffect(() => {
    if (isDiscoverInsideMoving) return;
    if (!isImagePositioned) return;
    if (isAnimating) return;
    if (page !== Page.Intro) return;

    gsap.to(".explore svg", {
      y: 7,
      duration: 1.2,
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });
    setIsDiscoverInsideMoving(true);
  }, [
    page,
    isDiscoverInsideMoving,
    isImagePositioned,
    isAnimating,
    windowSize.width,
    windowSize.height,
  ]);

  useIntroPageAnimation({
    magazineImageRef,
    titleRightRef,
    titleLeftRef,
    subtitleRef,
  });
  useIntroPageTransitionAnimation({
    magazineImageRef,
    titleRightRef,
    titleLeftRef,
    subtitleRef,
  });

  useEffect(() => {
    window.addEventListener("mousemove", handleMoveWithMouseAnimation);
    return () => {
      window.removeEventListener("mousemove", handleMoveWithMouseAnimation);
    };
  }, [handleMoveWithMouseAnimation]);

  const stretchTitle = useCallback(() => {
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
  }, [windowSize.width]);

  useEffect(() => {
    stretchTitle();
  }, [stretchTitle, windowSize.width, windowSize.height]);

  const handleMouseEnterAnimation = useCallback(() => {
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
  }, []);

  const handleMouseLeaveAnimation = useCallback(() => {
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
  }, []);

  const handleMagazineClick = useCallback((e: any) => {
    e.preventDefault();
    setIsFlipping(true);

    const isFrontActive = magazineImageFrontRef.current?.style.opacity !== "0";

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
  }, []);

  return (
    <section id="intro-section">
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
    </section>
  );
};

export default IntroPage;
