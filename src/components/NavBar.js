import "./css/NavBar.scss";
import logo from "../resources/header-logo.png";
import logoBlack from "../resources/logo_black.png";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SideMenu from "./SideMenu";

export default function NavBar(props) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const pageName = props.pageName || "home";

  const getBackgroundImage = () => {
    switch (pageName) {
      case "support":
        return "linear-gradient(to right, #CAF7E6, #D5F7FF)";
      case "question":
        return "linear-gradient(to right, #D7F4FF, #F4FAFF)";
      case "promo":
        return "linear-gradient(to right, #FEE3FF, #F3F0FF)";
      case "about":
        return "linear-gradient(to right, #C2F5DF, #DFFEFF)";
      default:
        return "radial-gradient(circle, #FFFFFF, #E2D7FF, #AD00FF 4%, #DBCEFF 18%)";
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navbarStyle = scrolled
    ? {
        backgroundImage: pageName === "home" ? "none" : getBackgroundImage(),
        backgroundColor: pageName === "home" ? "#1F0171" : "transparent",
        height: "67px",
        marginTop: "unset",
      }
    : {};

  return (
    <header className="navagation-container">
      <div
        className={`nav-bar ${scrolled ? "scrolled" : ""}`}
        style={navbarStyle}
      >
        <a href="/">
          <img
            src={pageName === "home" ? logo : logoBlack}
            alt="logo"
            className="header-logo"
          />
        </a>
        <div
          className={["hamburger-menu", `hamburger-menu-${pageName}`, isMenuOpen ? "hidden" : ""].join(" ")}
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
          {/* Temporarily hidden - uncomment when pages are ready
          <li>
            <a href="/promo">{t("promotion")}</a>
          </li>
          <li>
            <a href="#home">Coming soon</a>
          </li>
          */}
          <li>
            <a href="/contact-us">{t("contact-us")}</a>
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
