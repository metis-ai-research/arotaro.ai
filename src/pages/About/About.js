import { useState } from "react";
import "./About.scss";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { useTranslation } from "react-i18next";
import Ball from "../../resources/shapes/support-ball.png";
import Cube from "../../resources/shapes/support-cube.png";

export default function About() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("한국어");
  return (
    <div className="about-main-container">
      <NavBar pageName="about" />
      <img src={Ball} className="ball-in-about" alt="ball" />
      <div className="about-greeting-container">
        <h1 className="about-h1">{t("about-h1")}</h1>
        <h2 className="about-greeting">{t("about-greeting")}</h2>
        <img src={Cube} className="cube-in-about" alt="cube" />
      </div>
      <div className="about-white-container">
        <h3>About us</h3>
        <p dangerouslySetInnerHTML={{ __html: t("about-content") }}></p>
      </div>
      <GlobalFooter setLanguage={setLanguage} language={language} />
    </div>
  );
}
