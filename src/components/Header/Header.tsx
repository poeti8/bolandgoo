import logoWEBPPath from "../../assets/logo.webp";
import logoPNGPath from "../../assets/logo.png";

import logoWhiteWEBPPath from "../../assets/logo-white.webp";
import logoWhitePNGPath from "../../assets/logo-white.png";

import useStore, { Theme } from "../../store/store";
import { ArrowTopRight } from "../Icons";

const Header = () => {
  const theme = useStore((store) => store.theme);

  // TODO: spin logo on click and count how many time

  return (
    <header className={theme}>
      <div className="logo-wrapper">
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
            <a href="#about">درباره</a>
          </li>
          <li>
            <a href="#contact">سفارش</a>
          </li>
          <li>
            <a href="https://spotify.com" target="_blank">
              <span>اسپاتیفای</span>
              <ArrowTopRight />
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank">
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
