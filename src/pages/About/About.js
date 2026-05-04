import { useTranslation, Trans } from "react-i18next";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import "./About.scss";

import Ball from "../../resources/shapes/Ball2.png";
import Torus from "../../resources/shapes/Torus_a2.png";
import Octahedron from "../../resources/shapes/Octahedron_a1.png";
import Disc from "../../resources/shapes/Disc_a2.png";

export default function About() {
  const { t, i18n } = useTranslation();

  const pillars = [
    {
      roman: "I",
      name: t("about-pillar-1-name"),
      body: t("about-pillar-1-body"),
    },
    {
      roman: "II",
      name: t("about-pillar-2-name"),
      body: t("about-pillar-2-body"),
    },
    {
      roman: "III",
      name: t("about-pillar-3-name"),
      body: t("about-pillar-3-body"),
    },
    {
      roman: "IV",
      name: t("about-pillar-4-name"),
      body: t("about-pillar-4-body"),
    },
  ];

  const heritage = [
    {
      roman: "XV",
      eyebrow: t("about-card-1-eyebrow"),
      body: t("about-card-1-body"),
    },
    {
      roman: "XXI",
      eyebrow: t("about-card-2-eyebrow"),
      body: t("about-card-2-body"),
    },
  ];

  const breadthTags = [
    t("about-breadth-tag-1"),
    t("about-breadth-tag-2"),
    t("about-breadth-tag-3"),
    t("about-breadth-tag-4"),
  ];

  return (
    <div className={`ar-page lang-${i18n.language}`}>
      <NavBar />

      <section className="ar-about-hero">
        <img src={Ball} alt="" className="ar-about-hero__shape ar-about-hero__shape--ball" />
        <img src={Torus} alt="" className="ar-about-hero__shape ar-about-hero__shape--torus" />
        <div className="ar-about-hero__inner">
          <div className="ar-eyebrow">{t("about-eyebrow")}</div>
          <h1 className="ar-about-hero__title">
            <Trans i18nKey="about-title" components={{ em: <em /> }} />
          </h1>
          <p className="ar-about-hero__lede">{t("about-lede")}</p>
        </div>
      </section>

      <section className="ar-about-pillars">
        <img
          src={Octahedron}
          alt=""
          className="ar-about-pillars__shape"
          aria-hidden="true"
        />
        <div className="ar-about-pillars__inner">
          <header className="ar-about-section__header">
            <div className="ar-eyebrow">{t("about-pillars-eyebrow")}</div>
            <h2 className="ar-about-section__title">
              {t("about-pillars-title-1")} <em>{t("about-pillars-title-em")}</em>
            </h2>
          </header>

          <ul className="ar-about-pillars__grid">
            {pillars.map((p) => (
              <li key={p.roman} className="ar-about-pillar">
                <div className="ar-about-pillar__roman">{p.roman}</div>
                <h3 className="ar-about-pillar__name">{p.name}</h3>
                <p className="ar-about-pillar__body">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ar-about-cards">
        <div className="ar-about-cards__inner">
          {heritage.map((c) => (
            <article key={c.roman} className="ar-about-card">
              <div className="ar-about-card__roman">{c.roman}</div>
              <div className="ar-about-card__eyebrow">{c.eyebrow}</div>
              <p className="ar-about-card__body">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ar-about-breadth">
        <img
          src={Disc}
          alt=""
          className="ar-about-breadth__shape"
          aria-hidden="true"
        />
        <div className="ar-about-breadth__inner">
          <div className="ar-about-breadth__copy">
            <div className="ar-eyebrow">{t("about-breadth-eyebrow")}</div>
            <h2 className="ar-about-section__title">
              <Trans i18nKey="about-breadth-title" components={{ em: <em /> }} />
            </h2>
            <p className="ar-about-breadth__body">{t("about-breadth-body")}</p>
            <ul className="ar-about-breadth__tags">
              {breadthTags.map((tag) => (
                <li key={tag} className="ar-about-breadth__tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="ar-about-breadth__shots" aria-hidden="true">
            <div className="ar-about-shot ar-about-shot--a">
              <span className="ar-about-shot__label">
                {t("about-screenshot-placeholder")}
              </span>
            </div>
            <div className="ar-about-shot ar-about-shot--b">
              <span className="ar-about-shot__label">
                {t("about-screenshot-placeholder")}
              </span>
            </div>
            <div className="ar-about-shot ar-about-shot--c">
              <span className="ar-about-shot__label">
                {t("about-screenshot-placeholder")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="ar-about-team">
        <div className="ar-about-team__inner">
          <div className="ar-about-team__portrait" aria-hidden="true">
            <span className="ar-about-shot__label">
              {t("about-screenshot-placeholder")}
            </span>
          </div>
          <div className="ar-about-team__copy">
            <div className="ar-eyebrow">{t("about-team-eyebrow")}</div>
            <h2 className="ar-about-section__title">
              <Trans i18nKey="about-team-title" components={{ em: <em /> }} />
            </h2>
            <p className="ar-about-team__body">{t("about-team-body")}</p>
            <a
              href="https://metis-ai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="ar-btn ar-btn--outline ar-about-team__link"
            >
              {t("about-team-link")}
            </a>
          </div>
        </div>
      </section>

      <section className="ar-about-note">
        <div className="ar-about-note__inner">
          <div className="ar-eyebrow">{t("about-note-eyebrow")}</div>
          <p className="ar-about-note__body">{t("about-note-body")}</p>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
