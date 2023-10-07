import { useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import gsap from "gsap";

import magazinePath from "../../assets/magazine.webp";
import useStore from "../../store";
import { Down } from "../Icons";

const IntroPage = () => {
  const [isDiscoverInsideMoving, setIsDiscoverInsideMoving] = useState(false);
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
        rotateX: -y * 30,
        rotateY: x * 30,
        //   x: x * 25,
        //   y: y * 25,
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

      magazineImage.style.left = windowWidth / 2.9 - imageWidth / 2 + "px";
      magazineImage.style.top = windowHeight / 2 - imageHeight / 2 + "px";

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

      const stretchAmountLeft = stretchAmount - Math.floor(stretchAmount / 2);
      const stretchAmountRight = stretchAmount + Math.floor(stretchAmount / 2);

      titleRight.textContent =
        "مجلـ" + [...new Array(stretchAmountRight).fill("ـ")].join("");
      titleLeft.textContent =
        [...new Array(stretchAmountLeft).fill("ـ")].join("") + "ـه";
    },
    [windowSize.width]
  );

  useEffect(() => {
    stretchTitle();
  }, [stretchTitle, windowSize.width, windowSize.height]);

  const handleMouseEnterAnimation = useMemo(
    () => (e: any) => {
      gsap.to(e.target, { y: "-3%", duration: 0.5, ease: "power1.out" });
    },
    []
  );

  const handleMouseLeaveAnimation = useMemo(
    () => (e: any) => {
      gsap.to(e.target, { y: 0, duration: 0.5, ease: "power1.out" });
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
        {/* <h2 ref={subtitleRef}>مستقــل موسیقــی</h2> */}
        <p className="description">
          مستقل موسیقی{" "}
          <u>
            <b>بلندگو</b>
          </u>{" "}
          با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
          برای شرایط فعلی تکنولوژی
        </p>
      </div>
      <a href="#">
        <img
          ref={magazineImageRef}
          onMouseEnter={handleMouseEnterAnimation}
          onMouseLeave={handleMouseLeaveAnimation}
          id="magazine"
          src={magazinePath}
        />
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
