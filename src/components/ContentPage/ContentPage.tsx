import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { useContentPageTransitionAnimation } from "../../hooks";
import { ChevronLeftDuo, ChevronRightDuo } from "../Icons";
import useStore from "../../store";

import magazineInsideWEBPPath from "../../assets/magazine-inside.webp";
import magazineInsidePNGPath from "../../assets/magazine-inside.png";
import data from "./data.json";

const ContentPage = () => {
  const isMagazineZommed = useStore((store) => store.isMagazineZommed);
  const setIsMagazineZoomed = useStore((store) => store.setIsMagazineZoomed);
  const [lists, setLists] = useState<(typeof data)[number][][]>();
  const [activeList, setActiveList] = useState<number>(0);

  const imageRef = useRef(null);
  const tocRef = useRef(null);

  useContentPageTransitionAnimation({ imageRef, tocRef });

  useEffect(() => {
    const loops = Math.round(data.length / 8);
    const lists = new Array(loops).fill([]).map((_, index) => {
      const list = [];
      for (let i = 0; i < 8; i++) {
        const item = data[index * 8 + i];
        if (item) {
          list.push(item);
        }
      }
      return list;
    });
    setLists(lists);
  }, []);

  const handleImageClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const isNarrow = window.innerHeight / window.innerWidth > 1.2;

      if (isMagazineZommed) {
        gsap.to(imageRef.current, {
          xPercent: isNarrow ? -125 : -110,
          duration: 0.7,
          scale: isNarrow ? 1.4 : 1,
          ease: "back.out(1)",
        });
        gsap.to(tocRef.current, {
          xPercent: 0,
          duration: 0.7,
          delay: 0.1,
          ease: "back.out(1)",
        });
        setIsMagazineZoomed(false);
      } else {
        gsap.to(imageRef.current, {
          xPercent: -50,
          scale: isNarrow ? 1 : 1.15,
          duration: 0.7,
          ease: "back.out(1)",
        });
        gsap.to(tocRef.current, {
          xPercent: isNarrow ? 150 : 120,
          duration: 0.7,
          delay: 0.1,
          ease: "back.out(1)",
        });
        setIsMagazineZoomed(true);
      }
    },
    [setIsMagazineZoomed, isMagazineZommed]
  );

  const handlePrevPage = useCallback(
    (e: any) => {
      e.preventDefault();
      if (activeList - 1 < 0) return;
      gsap.to(".table-of-contents ul", {
        xPercent: 50,
        opacity: 0,
        duration: 0.3,
        ease: "back.out(1)",
        onComplete: () => {
          setActiveList((current) => current - 1);
          gsap.to(".table-of-contents ul", {
            xPercent: 0,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1)",
          });
        },
      });
    },
    [activeList]
  );

  const handleNextPage = useCallback(
    (e: any) => {
      e.preventDefault();
      if (activeList + 1 > (lists?.length ?? 0) - 1) return;
      gsap.to(".table-of-contents ul", {
        xPercent: 50,
        opacity: 0,
        duration: 0.2,
        ease: "back.out(1)",
        onComplete: () => {
          setActiveList((current) => current + 1);
          gsap.to(".table-of-contents ul", {
            xPercent: 0,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1)",
          });
        },
      });
    },
    [activeList, lists]
  );

  return (
    <section id="inside-section">
      <div ref={tocRef} className="table-of-contents">
        <h2>فهرست</h2>
        <ul>
          {lists?.[activeList].map((item) => (
            <li key={`${item.pageNumber}`}>
              <span className="page-number">{item.pageNumber}.</span>
              {item.title}
              {item.author && <span className="author">{item.author}</span>}
            </li>
          ))}
        </ul>
        <nav>
          <a
            href="#"
            title="صفحه قبل"
            className={`prev ${activeList > 0 ? " active" : ""}`}
            onClick={handlePrevPage}
          >
            <ChevronRightDuo />
            <span>صفحه قبل</span>
          </a>
          <a
            href="#"
            title="صفحه بعد"
            className={`next ${
              activeList < (lists?.length ?? 0) - 1 ? " active" : ""
            }`}
            onClick={handleNextPage}
          >
            <span>صفحه بعد</span>
            <ChevronLeftDuo />
          </a>
        </nav>
      </div>
      <a href="#" title="بزرگنمایی تصویر داخل مجله" onClick={handleImageClick}>
        <picture ref={imageRef} id="magazine-inside">
          <source srcSet={magazineInsideWEBPPath} type="image/webp" />
          <source srcSet={magazineInsidePNGPath} type="image/png" />
          <img src={magazineInsidePNGPath} />
        </picture>
      </a>
    </section>
  );
};

export default ContentPage;
