import magazinePath from "../../assets/magazine.webp";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useWindowSize } from "@uidotdev/usehooks";

const IntroPage = () => {
  const magazineImageRef = useRef<HTMLImageElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const windowSize = useWindowSize();

  const handleMoveWithMouseAnimation = useMemo(
    () => (e: MouseEvent) => {
      const magazineImage = magazineImageRef.current;
      if (!magazineImage) return;

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
    []
  );

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
        <h2>مستقــل موسیقــی</h2>
      </div>
      <a href="#">
        <img ref={magazineImageRef} id="magazine" src={magazinePath} />
      </a>
    </>
  );
};

export default IntroPage;
