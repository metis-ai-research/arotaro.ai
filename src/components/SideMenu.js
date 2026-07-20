import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./css/SideMenu.scss";

export default function SideMenu({ isMenuOpen, toggleMenu, items }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // Esc key closes the menu — keyboard users can always escape.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") toggleMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen, toggleMenu]);

  return (
    <div
      className={`ar-side-menu${isMenuOpen ? " is-open" : ""}`}
      aria-hidden={!isMenuOpen}
      onClick={toggleMenu}
    >
      <div
        className="ar-side-menu__panel"
        role="dialog"
        aria-label="Site menu"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="ar-side-menu__close"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <ul className="ar-side-menu__links">
          {items.map((item) => {
            const active = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
            return (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`ar-side-menu__link${active ? " is-active" : ""}`}
                  onClick={toggleMenu}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>
        <a
          href="https://apps.apple.com/app/arotaro/id6475332338"
          target="_blank"
          rel="noopener noreferrer"
          className="ar-side-menu__cta"
          onClick={toggleMenu}
        >
          {t("open-app")}
        </a>
      </div>
    </div>
  );
}
