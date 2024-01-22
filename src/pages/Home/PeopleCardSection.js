import "./PeopleCardSection.scss";
import PeopleCard from "./PeopleCard";
import People1 from "../../resources/people1.png";
import People2 from "../../resources/people2.png";
import People3 from "../../resources/people3.png";
import People4 from "../../resources/people4.png";
import Platonic from "../../resources/shapes/Platonic_a2.png";
import { useTranslation } from "react-i18next";

export default function PeopleCardSection() {
  const { t } = useTranslation();
  return (
    <div className="home-second-secion">
      <div className="people-card-section">
        <h2 className="people-card-section-title">
          {t("people-card-section-title")}
        </h2>
        <div className="people-cards-row">
          <PeopleCard
            image={People1}
            name={t("people-name-1")}
            subtitle={t("people-subtitle-1")}
            description={t("people-description-1")}
            tags={t("people-tags-1").split(",")}
          />
          <PeopleCard
            image={People4}
            name={t("people-name-2")}
            subtitle={t("people-subtitle-2")}
            description={t("people-description-2")}
            tags={t("people-tags-2").split(",")}
          />
          <PeopleCard
            image={People3}
            name={t("people-name-3")}
            subtitle={t("people-subtitle-3")}
            description={t("people-description-3")}
            tags={t("people-tags-3").split(",")}
          />
          <PeopleCard
            image={People2}
            name={t("people-name-4")}
            subtitle={t("people-subtitle-4")}
            description={t("people-description-4")}
            tags={t("people-tags-4").split(",")}
          />
        </div>
      </div>
      <img src={Platonic} className="platonic-in-people" alt="platonic" />
    </div>
  );
}
