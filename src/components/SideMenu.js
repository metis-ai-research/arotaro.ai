import "./css/SideMenu.scss";
import { useTranslation } from "react-i18next";

export default function SideMenu({
  isMenuOpen,
  toggleMenu,
  pageName = "home",
}) {
  const { t } = useTranslation();
  return (
    <div className={`overlay-menu ${isMenuOpen ? "open" : ""}`}>
      <ul className={["nav-links-side", `${pageName}-overlay-menu`].join(" ")}>
        <li>
          <div className="close-button" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </li>
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
  );
}
