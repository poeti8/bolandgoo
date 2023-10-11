import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

import useStore, { Page } from "../../store";
import { Close, Email, Instagram, Telegram } from "../Icons";

const Order = () => {
  const sectionRef = useRef(null!);
  const isOrderVisible = useStore((store) => store.isOrderVisible);
  const setIsOrderVisible = useStore((store) => store.setIsOrderVisible);
  const page = useStore((store) => store.page);

  useEffect(() => {
    if (!isOrderVisible) return;

    if (page === Page.Intro) {
      gsap.set("#order", { backgroundColor: "#1a1919", color: "#f7f7f7" });
      gsap.set("#order svg", { fill: "#f7f7f7" });
    }
    if (page === Page.Content) {
      gsap.set("#order", { backgroundColor: "#f7f7f7", color: "#444" });
      gsap.set("#order svg", { fill: "#444" });
    }
    gsap.to("#content", { yPercent: 15, duration: 0.2, ease: "power1.out" });
    gsap.to(sectionRef.current, { top: 0, duration: 0.5, ease: "power1.out" });
  }, [page, isOrderVisible]);

  const handleClose = useCallback(() => {
    setIsOrderVisible(false);
    gsap.to("#content", { yPercent: 0, duration: 0.2, ease: "power1.out" });
    gsap.to(sectionRef.current, {
      top: "-100%",
      duration: 0.5,
      ease: "power1.out",
    });
  }, []);

  return (
    <section ref={sectionRef} id="order">
      <h3>برای سفارش از یکی از راه‌های زیر با ما تماس بگیرید:</h3>
      <ul>
        <li className="telegram">
          <a href="https://t.me/bolandgoomag" target="_blank" title="تلگرام">
            <Telegram />
            <span>bolandgoo</span>
          </a>
        </li>
        <li className="instagram">
          <a
            href="https://instagram.com/bolandgoomag"
            target="_blank"
            title="اینستاگرام"
          >
            <Instagram />
            <span>bolandgoo</span>
          </a>
        </li>
        <li className="email">
          <a href="mailto:contact@bolandgoo.org" target="_blank" title="ایمیل">
            <Email />
            <span>contact@bolandgoo.org</span>
          </a>
        </li>
      </ul>
      <a className="close" href="#" title="بستن" onClick={handleClose}>
        <Close />
        <span>بستن</span>
      </a>
    </section>
  );
};

export default Order;
