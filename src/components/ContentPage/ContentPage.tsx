import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import magazineInsideWEBPPath from "../../assets/magazine-inside.webp";
import magazineInsidePNGPath from "../../assets/magazine-inside.png";

import useStore, { Page } from "../../store";

const ContentPage = () => {
  const page = useStore((store) => store.page);
  const setIsAnimating = useStore((store) => store.setIsAnimating);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const imageRef = useRef(null);
  const tocRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    const toc = tocRef.current;
    if (!image) return;
    if (!toc) return;
    if (page !== Page.Content) return;

    const isNarrow = window.innerHeight / window.innerWidth > 1.2;

    const tl = gsap.timeline({
      delay: 1.5,
      onComplete: () => {
        // setIsAnimating(false);
      },
    });
    tl.set(image, { y: "150%", visibility: "visible" });
    tl.set(image, { xPercent: -50 });
    tl.set(toc, { xPercent: 150, visibility: "visible" });
    tl.to(image, {
      y: "55%",
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1)",
    });
    tl.to(image, {
      xPercent: isNarrow ? -125 : -110,
      scale: isNarrow ? 1.4 : 1,
      duration: 1.2,
      ease: "back.out(1)",
    });
    tl.to(
      toc,
      {
        xPercent: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.2,
        ease: "back.out(1)",
      },
      "<"
    );
  }, [setIsAnimating, page]);

  const handleImageClick = useCallback(() => {
    const isNarrow = window.innerHeight / window.innerWidth > 1.2;

    if (isImageZoomed) {
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
      setIsImageZoomed(false);
    } else {
      gsap.to(imageRef.current, {
        xPercent: -50,
        scale: isNarrow ? 1 : 1.2,
        duration: 0.7,
        ease: "back.out(1)",
      });
      gsap.to(tocRef.current, {
        xPercent: isNarrow ? 150 : 120,
        duration: 0.7,
        delay: 0.1,
        ease: "back.out(1)",
      });
      setIsImageZoomed(true);
    }
  }, [isImageZoomed]);

  return (
    <section id="inside-section">
      <div ref={tocRef} className="table-of-contents">
        <h2>فهرست</h2>
        <ul>
          <li>
            <span className="page-number">۵.</span> سخن گردانندگان
          </li>
          <li>
            <span className="page-number">۷.</span> انقلاب زین‌ها{" "}
            <span className="author">مرتضی کدخدا</span>
          </li>
          <li>
            <span className="page-number">۱۱.</span> نویز: اقتصاد سیاسی موسیقی{" "}
            <span className="author">مهراد روستا</span>
          </li>
          <li>
            <span className="page-number">۱۷.</span> کلام در راک فارسی{" "}
            <span className="author">سعید موافق</span>
          </li>
          <li>
            <span className="page-number">۱۹.</span> پوسی‌رایت، بازگشت به بدن{" "}
            <span className="author">ایمان مسعودی</span>
          </li>
          <li>
            <span className="page-number">۲۷.</span> حبیبی فنک{" "}
            <span className="author">امیررضا مقتدرزاده</span>
          </li>
          <li>
            <span className="page-number">۲۹.</span> معرفی کی{" "}
            <span className="author">دارا محمودی</span>
          </li>
          <li>
            <span className="page-number">۳۱.</span> برای ستاره‌ها جایی نیست، از
            منظره لذت ببرید <span className="author">عرفان زرنانی</span>
          </li>
          <li>
            <span className="page-number">۳۳.</span> کیوسک - از آدم معمولی تا
            پایان شیرین <span className="author">دارا محمودی</span>
          </li>
          <li>
            <span className="page-number">۳۵.</span> کندریک لامار و زبان قدرت در
            برخورد‌های بالینی{" "}
            <span className="author">ایمان مسعودی (ترجمه)</span>
          </li>
          <li>
            <span className="page-number">۳۹.</span> والتس آبی شپن، بهانه‌ای
            برای تعویق مرگ <span className="author">سروش راد</span>
          </li>
          <li>
            <span className="page-number">۴۱.</span> مقدمه‌ای بر هنر مولد{" "}
            <span className="author">مهراد روستا</span>
          </li>
          <li>
            <span className="page-number">۴۵.</span> تکامل و تاثیر میوزک، از عمق
            چاه آسانسورها تا پذیرش پست‌مدرنیستی »هنر پست«{" "}
            <span className="author">مرتضی کدخدا</span>
          </li>
          <li>
            <span className="page-number">۴۷.</span> موسیقی برای فرودگاه، پیدایش
            یک ژانر از محیط <span className="author">پوریا عزتی</span>
          </li>
        </ul>
      </div>
      <picture ref={imageRef} id="magazine-inside" onClick={handleImageClick}>
        <source srcSet={magazineInsideWEBPPath} type="image/webp" />
        <source srcSet={magazineInsidePNGPath} type="image/png" />
        <img src={magazineInsidePNGPath} />
      </picture>
    </section>
  );
};

export default ContentPage;
