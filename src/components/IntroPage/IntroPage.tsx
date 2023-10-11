import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import gsap from "gsap";

import magazineFrontWEBPPath from "../../assets/magazine-front.webp";
import magazineFrontJPGPath from "../../assets/magazine-front.jpg";
import magazineBackWEBPPath from "../../assets/magazine-back.webp";
import magazineBackJPGPath from "../../assets/magazine-back.jpg";
import useStore, { Page } from "../../store";
import { Down } from "../Icons";
import {
  useIntroPageAnimation,
  useIntroPageTransitionAnimation,
} from "../../hooks";

const IntroPage = () => {
  const [isDiscoverInsideMoving, setIsDiscoverInsideMoving] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const page = useStore((store) => store.page);
  const setPage = useStore((store) => store.setPage);
  const isImagePositioned = useStore((store) => store.isImagePositioned);
  const setIsImagePositioned = useStore((store) => store.setIsImagePositioned);
  const isMagazineFlipRequested = useStore(
    (store) => store.isMagazineFlipRequested
  );
  const setIsMagazineFlipRequested = useStore(
    (store) => store.setIsMagazineFlipRequested
  );
  const isAnimating = useStore((store) => store.isAnimating);
  const setIsAnimating = useStore((store) => store.setIsAnimating);
  const windowSize = useWindowSize();

  const magazineImageRef = useRef<HTMLAnchorElement>(null);
  const magazineImageFrontRef = useRef<HTMLImageElement>(null);
  const magazineImageBackRef = useRef<HTMLImageElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const handleMoveWithMouseAnimation = useCallback(
    (e: MouseEvent) => {
      const isSmallScreen = (windowSize.width ?? 0) <= 768;
      const magazineWrapper = magazineImageRef.current;
      if (!magazineWrapper) return;
      if (isAnimating) return;
      if (isFlipping) return;
      if (page !== Page.Intro) return;
      if (isSmallScreen) return;

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
        transformStyle: "preserve-3d",
      });
    },
    [page, isAnimating, isFlipping, windowSize.width]
  );

  const centerImage = useCallback(() => {
    const magazineWrapper = magazineImageRef.current;
    if (!magazineWrapper) {
      setTimeout(centerImage, 10);
      return;
    }
    gsap.set(magazineWrapper, { scale: 1 });

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

    gsap.set(magazineWrapper, { scale: 0.666 });

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
  }, []);

  const handleMouseLeaveAnimation = useCallback(() => {
    gsap.to(magazineImageRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power1.out",
    });
  }, []);

  const handleMagazineClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setIsFlipping(true);

      const isFrontActive =
        magazineImageFrontRef.current?.style.opacity !== "0";

      gsap.to(magazineImageRef.current, {
        rotateY: 90,
        duration: 0.2,
        scaleX: isFrontActive ? 1 : 0.67,
        scaleY: isFrontActive ? 1 : 0.67,
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
            duration: 0.2,
            ease: "power1.in",
            onComplete: () => {
              setIsFlipping(false);
            },
          });
        },
      });

      if (isMagazineFlipRequested) {
        setIsMagazineFlipRequested(false);
      }
    },
    [isMagazineFlipRequested, setIsMagazineFlipRequested]
  );

  useEffect(() => {
    if (isMagazineFlipRequested) {
      gsap.to(magazineImageRef.current, {
        rotateY: 90,
        duration: 0.2,
        scaleX: 1,
        scaleY: 1,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(magazineImageFrontRef.current, {
            opacity: 0,
          });
          gsap.set(magazineImageBackRef.current, {
            opacity: 1,
          });
          gsap.to(magazineImageRef.current, {
            rotateY: 0,
            duration: 0.2,
            ease: "power1.in",
            onComplete: () => {
              setIsFlipping(false);
            },
          });
        },
      });
    }
  }, [isMagazineFlipRequested]);

  const handleSeeInside = useCallback(
    (e: any) => {
      e.preventDefault();
      if (isAnimating) return;
      setPage(Page.Content);
      setIsAnimating(true);
    },
    [setPage, setIsAnimating, isAnimating]
  );

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
        <picture ref={magazineImageFrontRef} id="magazine-front">
          <source srcSet={magazineFrontWEBPPath} type="image/webp" />
          <source srcSet={magazineFrontJPGPath} type="image/jpg" />
          <img src={magazineFrontJPGPath} />
        </picture>
        <picture ref={magazineImageBackRef} id="magazine-back">
          <source srcSet={magazineBackWEBPPath} type="image/webp" />
          <source srcSet={magazineBackJPGPath} type="image/jpg" />
          <img src={magazineBackJPGPath} />
        </picture>
      </a>
      <div className="explore">
        <a href="#" title="دیدن داخل" onClick={handleSeeInside}>
          <span>داخلش را ببینید</span>
          <Down />
        </a>
      </div>
    </section>
  );
};

export default IntroPage;
