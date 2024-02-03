import "./css/NavBar.scss";
import logo from "../resources/header-logo.png";
import logoBlack from "../resources/logo_black.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SideMenu from "./SideMenu";

export default function NavBar(props) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const pageName = props.pageName || "home";

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <header className="navagation-container">
      <div className="nav-bar">
        <img
          src={pageName === "home" ? logo : logoBlack}
          alt="logo"
          className="header-logo"
        />
        <div
          className={["hamburger-menu", `hamburger-menu-${pageName}`].join(" ")}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={["nav-links", `nav-for-${pageName}`].join(" ")}>
          <li>
            <a href="/">{t("home")}</a>
          </li>
          <li>
            <a href="/promo">{t("promotion")}</a>
          </li>
          <li>
            <a href="#home">Coming soon</a>
          </li>
          <li>
            <a href="#home">{t("q&a")}</a>
          </li>
        </ul>
      </div>
      <SideMenu
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
        pageName={pageName}
      />
    </header>
  );
}
