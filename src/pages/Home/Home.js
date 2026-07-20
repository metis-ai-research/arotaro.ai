import { useTranslation } from "react-i18next";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import CardSpread from "../../components/CardSpread";
import "./Home.scss";

import People1 from "../../resources/koni.png";
import People2 from "../../resources/sophia.png";
import People3 from "../../resources/aro.png";
import People4 from "../../resources/jang.png";
import Ball1 from "../../resources/shapes/Ball1.png";
import Octahedron from "../../resources/shapes/Octahedron_a1.png";
import Torus from "../../resources/shapes/Torus_a3.png";
import Disc from "../../resources/shapes/Disc_a2.png";

export default function Home() {
  const { t, i18n } = useTranslation();

  const people = [
    {
      name: t("people-name-1"),
      tarot: t("tarot-1-name"),
      roman: "VI",
      topic: t("tarot-1-topic"),
      desc: t("tarot-1-desc"),
      meta: t("people-tags-1"),
      img: People1,
      accent: "#D97380",
    },
    {
      name: t("people-name-2"),
      tarot: t("tarot-2-name"),
      roman: "I",
      topic: t("tarot-2-topic"),
      desc: t("tarot-2-desc"),
      meta: t("people-tags-2"),
      img: People2,
      accent: "#7B5BFF",
    },
    {
      name: t("people-name-3"),
      tarot: t("tarot-3-name"),
      roman: "IV",
      topic: t("tarot-3-topic"),
      desc: t("tarot-3-desc"),
      meta: t("people-tags-3"),
      img: People3,
      accent: "#D4A954",
    },
    {
      name: t("people-name-4"),
      tarot: t("tarot-4-name"),
      roman: "III",
      topic: t("tarot-4-topic"),
      desc: t("tarot-4-desc"),
      meta: t("people-tags-4"),
      img: People4,
      accent: "#5BBE9F",
    },
  ];

  const principles = [
    { roman: "I", title: t("icon-card-title-1"), desc: t("icon-card-content-1") },
    { roman: "II", title: t("icon-card-title-2"), desc: t("icon-card-content-2") },
    { roman: "III", title: t("icon-card-title-3"), desc: t("icon-card-content-3") },
  ];

  const reviews = [
    { quote: t("review1"), handle: "minji_k", card: t("review-card-1") },
    { quote: t("review2"), handle: "taro.s", card: t("review-card-2") },
    { quote: t("review3"), handle: "hjmom", card: t("review-card-3") },
    { quote: t("review4"), handle: "evely_n", card: t("review-card-4") },
  ];

  return (
    <div className={`ar-page lang-${i18n.language}`}>
      <NavBar />

      <section className="ar-hero">
        <img src={Ball1} alt="" className="ar-hero__shape ar-hero__shape--ball" aria-hidden="true" />
        <img
          src={Octahedron}
          alt=""
          className="ar-hero__shape ar-hero__shape--octa"
          aria-hidden="true"
        />

        <div className="ar-hero__inner">
          <div className="ar-pill">
            <span className="ar-pill__dot" />
            {t("hero-eyebrow")}
          </div>

          <h1 className="ar-hero__title">
            {t("hero-title-1")} <em>{t("hero-title-em-1")}</em>,<br />
            {t("hero-title-2")} <em className="is-rose">{t("hero-title-em-2")}</em>
          </h1>

          <p className="ar-hero__lede">{t("hero-lede")}</p>

          <CardSpread people={people} />

          <div className="ar-hero__cta-row">
            <a
              href="https://apps.apple.com/app/arotaro/id6475332338"
              target="_blank"
              rel="noopener noreferrer"
              className="ar-btn ar-btn--primary"
            >
              {t("download-ios")}
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.arotaro.android"
              target="_blank"
              rel="noopener noreferrer"
              className="ar-btn ar-btn--outline"
            >
              {t("download-android")}
            </a>
          </div>
        </div>
      </section>

      <section className="ar-section ar-principles">
        <img src={Torus} alt="" className="ar-principles__shape" aria-hidden="true" />
        <div className="ar-section__inner">
          <header className="ar-section__header">
            <div className="ar-eyebrow">{t("principles-eyebrow")}</div>
            <h2 className="ar-section__title">
              {t("principles-title-1")} <em>{t("principles-title-em")}</em>
            </h2>
          </header>

          <ul className="ar-principles__grid">
            {principles.map((p) => (
              <li key={p.roman} className="ar-principle">
                <div className="ar-principle__roman">{p.roman}</div>
                <h3 className="ar-principle__title">{p.title}</h3>
                <p className="ar-principle__desc">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ar-section ar-reviews">
        <img src={Disc} alt="" className="ar-reviews__shape" aria-hidden="true" />
        <div className="ar-section__inner">
          <header className="ar-section__header">
            <div className="ar-eyebrow">{t("reviews-eyebrow")}</div>
            <h2 className="ar-section__title">
              {t("reviews-title-1")} <em>{t("reviews-title-em")}</em>
            </h2>
          </header>

          <ul className="ar-reviews__grid">
            {reviews.map((r) => (
              <li key={r.handle} className="ar-review">
                <div className="ar-review__head">
                  <span className="ar-review__stars" aria-label="5 stars">★★★★★</span>
                  <span className="ar-review__card">{r.card}</span>
                </div>
                <p className="ar-review__quote">{r.quote}</p>
                <div className="ar-review__attr">@{r.handle} · App Store</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
