import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import "./Support.scss";

import Ball from "../../resources/shapes/Ball2.png";
import Pyramid from "../../resources/shapes/Pyramid_a1.png";

const FAQ_ROWS = [
  { roman: "I", key: "faq-1" },
  { roman: "II", key: "faq-2" },
  { roman: "III", key: "faq-3" },
  { roman: "IV", key: "faq-4" },
  { roman: "V", key: "faq-5" },
];

const LEGAL_TABS = [
  { tab: "faq", labelKey: "faq" },
  { tab: "disclaimer", labelKey: "disclaimer" },
  { tab: "terms", labelKey: "terms" },
  { tab: "policy", labelKey: "policy" },
];

function FaqAccordion() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);

  return (
    <ul className="ar-faq">
      {FAQ_ROWS.map((row, i) => {
        const isOpen = open === i;
        return (
          <li key={row.key} className={`ar-faq__row${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="ar-faq__button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`${row.key}-panel`}
            >
              <span className="ar-faq__lead">
                <span className="ar-faq__roman">{row.roman}</span>
                <span className="ar-faq__question">{t(`${row.key}-q`)}</span>
              </span>
              <span className={`ar-faq__plus${isOpen ? " is-open" : ""}`} aria-hidden="true">
                +
              </span>
            </button>
            {isOpen && (
              <div id={`${row.key}-panel`} className="ar-faq__answer">
                {t(`${row.key}-a`)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function LegalIframe({ src, title }) {
  return (
    <div className="ar-legal__frame">
      <iframe src={src} title={title} className="ar-legal__iframe" />
    </div>
  );
}

function DisclaimerBody({ lang }) {
  const { t } = useTranslation();
  return (
    <div className="ar-legal__body">
      <h3>{t("disclaimer-title-1")}</h3>
      <p className="ar-legal__lead">{t("disclaimer-1-lead")}</p>
      <p>{t("disclaimer-1-body")}</p>

      <h4>{t("disclaimer-title-2")}</h4>
      <p>{t("disclaimer-2-body")}</p>
      <p>{t("disclaimer-2-foot")}</p>

      <h3>{t("refund-title")}</h3>
      <p>{t("refund-body-1")}</p>
      <p>{t("refund-body-2")}</p>
    </div>
  );
}

export default function Support({ tab = "faq" }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const tabPath = (tab) => (tab === "faq" ? "/support/faq" : `/support/${tab}`);

  const isFaq = tab === "faq" || !tab;

  const heading = (() => {
    if (isFaq) return { eyebrow: t("support-eyebrow"), title: t("support-title") };
    if (tab === "disclaimer") return { eyebrow: t("support-eyebrow"), title: t("disclaimer") };
    if (tab === "terms") return { eyebrow: t("support-eyebrow"), title: t("terms") };
    if (tab === "policy") return { eyebrow: t("support-eyebrow"), title: t("policy") };
    return { eyebrow: t("support-eyebrow"), title: t("support-title") };
  })();

  return (
    <div className={`ar-page lang-${lang}`}>
      <NavBar />

      <section className="ar-support-hero">
        <img src={Ball} alt="" className="ar-support-hero__shape ar-support-hero__shape--ball" />
        <img src={Pyramid} alt="" className="ar-support-hero__shape ar-support-hero__shape--pyr" />

        <div className="ar-support-hero__inner">
          <div className="ar-eyebrow">{heading.eyebrow}</div>
          {isFaq ? (
            <h1 className="ar-support-hero__title">
              {t("support-title-1")} <em>{t("support-title-em")}</em>
            </h1>
          ) : (
            <h1 className="ar-support-hero__title">
              <em>{heading.title}</em>
            </h1>
          )}
        </div>
      </section>

      <section className="ar-support-body">
        <div className="ar-support-body__inner">
          <nav className="ar-support-tabs" aria-label="Support sections">
            {LEGAL_TABS.map((t2) => (
              <Link
                key={t2.tab}
                to={tabPath(t2.tab)}
                className={`ar-support-tab${tab === t2.tab ? " is-active" : ""}`}
              >
                {t(t2.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="ar-support-content">
            {isFaq && <FaqAccordion />}
            {tab === "disclaimer" && <DisclaimerBody lang={lang} />}
            {tab === "terms" && (
              <LegalIframe
                src={
                  lang === "ko"
                    ? "https://arotaro.ai/kr-terms-and-conditions.html"
                    : lang === "ja"
                      ? "https://arotaro.ai/ja-terms-and-conditions.html"
                      : "https://arotaro.ai/en-terms-and-conditions.html"
                }
                title={t("terms")}
              />
            )}
            {tab === "policy" && (
              <LegalIframe
                src={
                  lang === "ko"
                    ? "https://plip.kr/pcc/6effcf5f-a061-42f4-be0d-e8b72575208c/privacy/1.html"
                    : lang === "ja"
                      ? "https://arotaro.ai/ja-privacy-policy.html"
                      : "https://arotaro.ai/privacy-policy.html"
                }
                title={t("policy")}
              />
            )}
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
