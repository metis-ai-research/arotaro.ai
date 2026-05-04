import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./css/NavBar.scss";
import SideMenu from "./SideMenu";

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="20" height="24" rx="3" stroke="#D4A954" strokeWidth="1.2" />
      <circle cx="14" cy="14" r="4" fill="#D4A954" />
    </svg>
  );
}

// Promo intentionally hidden from nav for now — route still works at /promo
// for direct campaign links. Re-add when the next promotion is live.
const NAV_ITEMS = [
  { key: "home", path: "/", labelKey: "nav-home" },
  { key: "about", path: "/about", labelKey: "nav-about" },
  { key: "support", path: "/support", labelKey: "nav-support" },
  { key: "contact", path: "/contact-us", labelKey: "nav-contact" },
];

function isActive(pathname, item) {
  if (item.path === "/") return pathname === "/";
  return pathname.startsWith(item.path);
}

export default function NavBar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="ar-nav-wrap">
      <nav className="ar-nav" aria-label="Primary">
        <Link to="/" className="ar-nav__brand" aria-label="AroTaro home">
          <Logo />
          <span className="ar-nav__wordmark">AroTaro</span>
        </Link>

        <div className="ar-nav__links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`ar-nav__link${isActive(pathname, item) ? " is-active" : ""}`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>

        <a
          href="https://apps.apple.com/app/arotaro/id6479718985"
          target="_blank"
          rel="noopener noreferrer"
          className="ar-nav__cta"
        >
          {t("open-app")}
        </a>

        <button
          className={`ar-nav__hamburger${isMenuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <SideMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setMenuOpen((v) => !v)}
        items={NAV_ITEMS}
      />
    </header>
  );
}
