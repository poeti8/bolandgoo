import { useCallback, useState } from "react";
import gsap from "gsap";

import logoWEBPPath from "../../assets/logo.webp";
import logoPNGPath from "../../assets/logo.png";

import logoWhiteWEBPPath from "../../assets/logo-white.webp";
import logoWhitePNGPath from "../../assets/logo-white.png";

import { processLogoClick } from "../../assets/dont-look-inside-this-file";
import useStore, { Page, Theme } from "../../store";
import { ArrowTopRight } from "../Icons";

const Header = () => {
  const [clickCount, setClickCount] = useState(0);
  const theme = useStore((store) => store.theme);
  const isAnimating = useStore((store) => store.isAnimating);
  const setIsAnimating = useStore((store) => store.setIsAnimating);
  const page = useStore((store) => store.page);
  const setPage = useStore((store) => store.setPage);
  const setIsOrderVisible = useStore((store) => store.setIsOrderVisible);
  const isMagazineFlipRequested = useStore(
    (store) => store.isMagazineFlipRequested
  );
  const setIsMagazineFlipRequested = useStore(
    (store) => store.setIsMagazineFlipRequested
  );

  const handleLogoClick = useCallback(() => {
    gsap.to(".logo-wrapper", {
      rotateY: 360,
      duration: 0.4,
      transformStyle: "preserve-3d",
      ease: "back.our(2)",
      onComplete: () => {
        gsap.set(".logo-wrapper", { rotateY: 0 });
        processLogoClick(clickCount + 1);
        setClickCount((count) => count + 1);
      },
    });
  }, [clickCount, setClickCount]);

  const handleOrderClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setIsOrderVisible(true);
    },
    [setIsOrderVisible]
  );

  const handleContactClick = useCallback(() => {
    if (isAnimating) return;
    if (isMagazineFlipRequested) return;
    if (page !== Page.Intro) {
      setIsAnimating(true);
      setPage(Page.Intro);
    }
    setIsMagazineFlipRequested(true);
  }, [
    setPage,
    page,
    isMagazineFlipRequested,
    setIsMagazineFlipRequested,
    isAnimating,
    setIsAnimating,
  ]);

  return (
    <header className={theme}>
      <div className="logo-wrapper" onClick={handleLogoClick}>
        <picture
          className="logo"
          style={{ visibility: theme === Theme.Light ? "visible" : "hidden" }}
        >
          <source srcSet={logoWEBPPath} type="image/webp" />
          <source srcSet={logoPNGPath} type="image/png" />
          <img src={logoPNGPath} />
        </picture>
        <picture
          className="logo"
          style={{ visibility: theme === Theme.Dark ? "visible" : "hidden" }}
        >
          <source srcSet={logoWhiteWEBPPath} type="image/webp" />
          <source srcSet={logoWhitePNGPath} type="image/png" />
          <img src={logoWhitePNGPath} />
        </picture>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#about" title="درباره" onClick={handleContactClick}>
              درباره
            </a>
          </li>
          <li>
            <a href="#order" title="سفارش" onClick={handleOrderClick}>
              سفارش
            </a>
          </li>
          <li>
            <a
              href="https://open.spotify.com/user/314kfqrzni23tgxiuxc3fmoet7xa"
              title="اسپاتیفای"
              target="_blank"
            >
              <span>اسپاتیفای</span>
              <ArrowTopRight />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/bolandgoomag"
              title="اینستاگرام"
              target="_blank"
            >
              <span>اینستاگرام</span>
              <ArrowTopRight />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
