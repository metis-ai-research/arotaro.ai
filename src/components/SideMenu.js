import "./css/SideMenu.scss";
import { useTranslation } from "react-i18next";

export default function SideMenu(props) {
  const { t } = useTranslation();
  return (
    <div className={`overlay-menu ${props.isMenuOpen ? "open" : ""}`}>
      <ul className="nav-links-side">
        <li>
          <div className="close-button" onClick={props.toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </li>
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
  );
}
