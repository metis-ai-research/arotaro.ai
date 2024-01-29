import "./MainSection.scss";
import Man from "../../resources/home-man.png";
import Lisa from "../../resources/Lisa.png";
import map from "../../resources/map.png";
import books from "../../resources/books.png";
import password from "../../resources/password.png";
import QuestionMark from "../../resources/question-mark.png";
import ButtonRow from "../../components/ButtonRow";
import IconCard from "./IconCard";
import Ball1 from "../../resources/shapes/Ball1.png";
import Torus1 from "../../resources/shapes/Torus_a2.png";
import Torus2 from "../../resources/shapes/Torus_a3.png";
import Octahedron from "../../resources/shapes/Octahedron_a1.png";
import { useTranslation } from "react-i18next";

export default function MainSection() {
  const { t } = useTranslation();
  return (
    <div className="home-main-section">
      <div className="first-section">
        <div className="greeting-container">
          <h1
            className="greeting-slogan"
            dangerouslySetInnerHTML={{ __html: t("greeting-slogan") }}
          ></h1>
          <p
            className="greeting-content"
            dangerouslySetInnerHTML={{ __html: t("greeting-content") }}
          ></p>
          <ButtonRow type="home-button" />
        </div>
        <img src={Man} alt="home-man" className="home-man" />
        <img src={QuestionMark} alt="question-mark" className="question-mark" />
      </div>
      <div className="second-section">
        <img src={Lisa} alt="home-woman" className="home-woman" />
        <div className="card-section">
          <h2 className="second-slogan">{t("second-slogan")}</h2>
          <div className="icon-cards-container">
            <IconCard
              icon={map}
              title={t("icon-card-title-1")}
              className="map-icon"
              content={t("icon-card-content-1")}
            />
            <IconCard
              icon={books}
              title={t("icon-card-title-2")}
              className="books-icon"
              content={t("icon-card-content-2")}
            />
            <IconCard
              icon={password}
              title={t("icon-card-title-3")}
              className="password-icon"
              content={t("icon-card-content-3")}
            />
          </div>
        </div>
        <img src={Torus1} className="torus-in-main" alt="torus" />
        <img src={Octahedron} className="octahedron-in-main" alt="octahedron" />
        <img src={Torus2} className="torus2-in-main" alt="torus" />
      </div>
      <img src={Ball1} className="ball-in-main" alt="ball" />
    </div>
  );
}
