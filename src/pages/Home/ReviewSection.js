import "./ReviewSection.scss";
import Review from "./Review";
import Disc from "../../resources/shapes/Disc_a2.png";
import Pyramid from "../../resources/shapes/Pyramid_a1.png";
import Ball from "../../resources/shapes/Ball2.png";
import Vase from "../../resources/shapes/Vase_a2.png";
import { useTranslation } from "react-i18next";

export default function ReviewSection() {
  const { t } = useTranslation();
  return (
    <div className="review-section">
      <img src={Vase} className="vase-in-review" alt="shapes" />
      <div className="review-section-container">
        <img src={Ball} className="ball-in-review" alt="shapes" />
        <h2 className="review-section-title">{t("review-section-title")}</h2>
        <div className="reviews-container">
          <Review review={t("review1")} name="fr********n" number="5.0" />
          <Review review={t("review2")} name="al*******0" number="5.0" />
          <Review review={t("review3")} name="bl******9" number="4.0" />
          <Review review={t("review4")} name="jj****g" number="4.0" />
          <img src={Pyramid} className="pyramid-in-review" alt="shapes" />
        </div>
      </div>
      <img src={Disc} className="disc-in-review" alt="shapes" />
    </div>
  );
}
