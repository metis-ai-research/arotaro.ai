import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import "./Promo.scss";

import Lisa2 from "../../resources/lisa-2.png";
import Lisa from "../../resources/Lisa.png";
import Gem from "../../resources/gem.png";
import Cube from "../../resources/shapes/promo-cube.png";
import Torus from "../../resources/shapes/promo-torus2.png";
import Pyramid from "../../resources/shapes/Pyramid_a1.png";

function FlipCard({ flipped, onFlip, label }) {
  return (
    <button
      type="button"
      className={`ar-flip${flipped ? " is-flipped" : ""}`}
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={label}
    >
      <div className="ar-flip__inner">
        {/* Back: pattern with monogram (shown when not flipped) */}
        <div className="ar-flip__face ar-flip__face--back">
          <div className="ar-flip__back-inner">
            <div className="ar-flip__monogram">A</div>
          </div>
        </div>
        {/* Front: cream tarot card with photo (shown after flip) */}
        <div className="ar-flip__face ar-flip__face--front">
          <div className="ar-flip__front-inner">
            <div className="ar-flip__corners">
              <span className="ar-flip__corner-roman">VI</span>
              <span className="ar-flip__corner-roman ar-flip__corner-roman--bottom">VI</span>
            </div>
            <div className="ar-flip__photo">
              <img src={Lisa2} alt="" />
            </div>
            <div className="ar-flip__caption">
              <div className="ar-flip__tarot">The Lovers</div>
              <div className="ar-flip__keywords">Choice · Connection · Trust</div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Promo() {
  const { t, i18n } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`ar-page lang-${i18n.language}`}>
      <NavBar />

      <section className="ar-promo-hero">
        <img src={Cube} alt="" className="ar-promo-hero__shape ar-promo-hero__shape--cube" />
        <img src={Torus} alt="" className="ar-promo-hero__shape ar-promo-hero__shape--torus" />

        <div className="ar-promo-hero__inner">
          <div className="ar-promo-hero__copy">
            <div className="ar-eyebrow ar-eyebrow--rose">{t("promo-hero-eyebrow")}</div>
            <h1 className="ar-promo-hero__title">
              <Trans
                i18nKey="promo-hero-title"
                components={{ em: <em /> }}
              />
            </h1>
            <p className="ar-promo-hero__lede">{t("promo-hero-lede")}</p>
            <a
              href="https://apps.apple.com/app/arotaro/id6475332338"
              target="_blank"
              rel="noopener noreferrer"
              className="ar-btn ar-btn--primary"
            >
              {t("promo-hero-cta")} →
            </a>
          </div>

          <div className="ar-promo-hero__card">
            <FlipCard
              flipped={flipped}
              onFlip={() => setFlipped((v) => !v)}
              label={t("promo-flip-aria")}
            />
          </div>
        </div>

        <div className="ar-promo-hero__hint">
          {flipped ? t("promo-flip-back") : t("promo-flip-reveal")}
        </div>
      </section>

      <section className="ar-promo-event">
        <div className="ar-section__inner ar-promo-event__grid">
          <div className="ar-promo-event__copy">
            <div className="ar-promo-event__pill">
              <span className="ar-promo-event__pill-roman">I</span> {t("promo-event-1-tag")}
            </div>
            <h2 className="ar-promo-event__title">{t("promo-event-1-title")}</h2>
            <p className="ar-promo-event__desc">{t("promo-event-1-desc")}</p>
          </div>
          <div className="ar-promo-event__art">
            <div className="ar-promo-event__tarot ar-promo-event__tarot--left">
              <div className="ar-promo-event__tarot-inner">
                <img src={Gem} alt="" className="ar-promo-event__img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ar-promo-event ar-promo-event--reverse">
        <div className="ar-section__inner ar-promo-event__grid">
          <div className="ar-promo-event__art">
            <div className="ar-promo-event__tarot ar-promo-event__tarot--right">
              <div className="ar-promo-event__tarot-inner">
                <img src={Lisa} alt="" className="ar-promo-event__img ar-promo-event__img--photo" />
              </div>
            </div>
          </div>
          <div className="ar-promo-event__copy">
            <div className="ar-promo-event__pill">
              <span className="ar-promo-event__pill-roman">II</span> {t("promo-event-2-tag")}
            </div>
            <h2 className="ar-promo-event__title">{t("promo-event-2-title")}</h2>
            <p className="ar-promo-event__desc">{t("promo-event-2-desc")}</p>
          </div>
        </div>
      </section>

      <section className="ar-promo-fine">
        <img src={Pyramid} alt="" className="ar-promo-fine__shape" />
        <div className="ar-promo-fine__inner">
          <div className="ar-eyebrow">{t("promo-fine-eyebrow")}</div>
          <ul className="ar-promo-fine__list">
            <li>{t("promo-fine-1")}</li>
            <li>{t("promo-fine-2")}</li>
            <li>{t("promo-fine-3")}</li>
          </ul>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
