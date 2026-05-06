import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import "./css/GlobalFooter.scss";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
];

function FooterColumn({ heading, links }) {
  return (
    <div className="ar-footer__col">
      <div className="ar-footer__col-heading">{heading}</div>
      <ul className="ar-footer__col-links">
        {links.map(({ to, href, label }) => (
          <li key={label}>
            {to ? (
              <Link to={to}>{label}</Link>
            ) : (
              <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GlobalFooter() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[1];

  return (
    <footer className="ar-footer">
      <div className="ar-footer__inner">
        <div className="ar-footer__brand">
          <div className="ar-footer__wordmark">AroTaro</div>
          <p className="ar-footer__tagline">{t("footer-tagline")}</p>
          <p className="ar-footer__managed">
            <Trans
              i18nKey="footer-managed-by"
              components={{
                a: (
                  <a
                    href="https://metis-ai.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ar-footer__metis"
                  >
                    {}
                  </a>
                ),
              }}
            />
          </p>
        </div>

        <div className="ar-footer__cols">
          <FooterColumn
            heading={t("footer-product")}
            links={[
              { to: "/", label: t("nav-home") },
              { to: "/about", label: t("nav-about") },
            ]}
          />
          <FooterColumn
            heading={t("footer-help")}
            links={[
              { to: "/support/faq", label: t("faq") },
              { to: "/contact-us", label: t("nav-contact") },
              { to: "/support/disclaimer", label: t("disclaimer") },
            ]}
          />
          <FooterColumn
            heading={t("footer-legal")}
            links={[
              { to: "/support/terms", label: t("terms") },
              { to: "/support/policy", label: t("policy") },
            ]}
          />
        </div>
      </div>

      <div className="ar-footer__bottom">
        <div className="ar-footer__copyright">© {new Date().getFullYear()} AroTaro · Metis AI</div>

        <div ref={ref} className={`ar-footer__lang${open ? " is-open" : ""}`}>
          <button
            type="button"
            className="ar-footer__lang-button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span aria-hidden="true">·</span>
            {currentLang.label}
            <span className="ar-footer__lang-caret" aria-hidden="true">▾</span>
          </button>
          <ul className="ar-footer__lang-list" role="listbox">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  className={`ar-footer__lang-option${i18n.language === lang.code ? " is-active" : ""}`}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setOpen(false);
                  }}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
