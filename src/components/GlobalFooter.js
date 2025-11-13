import { useState, useEffect, useRef } from "react";
import "./css/GlobalFooter.scss";
import Blue from "../resources/blue-logo.png";
import Langurage from "../resources/langurage.png";
import Instagram from "../resources/Instagram.png";
import Kakaotalk from "../resources/kakaotalk.png";
import Youtube from "../resources/youtube.png";
import Checkmark from "../resources/Checkmark.png";
import { useTranslation } from "react-i18next";

export default function GlobalFooter(props) {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    props.setLanguage(option);
    let langCode = "en";
    if (option === "한국어") langCode = "ko";
    else if (option === "日本語") langCode = "ja";
    i18n.changeLanguage(langCode);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Read the current language from i18n (which reads from localStorage first)
    const currentLang = i18n.language;

    // Set the language display name based on current language
    if (currentLang === "en") {
      props.setLanguage("English");
    } else if (currentLang === "ko") {
      props.setLanguage("한국어");
    } else if (currentLang === "ja") {
      props.setLanguage("日本語");
    } else {
      // Default to Korean if language is unknown
      props.setLanguage("한국어");
      i18n.changeLanguage("ko");
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleRedirect = type => {
    let url = "arotaro";
    if (props.language === "한국어") url += "kr";
    else if (props.language === "日本語") url += "jp";
    else url += "na";
    switch (type) {
      case 1: // Instagram
        url = "https://www.instagram.com/" + url;
        break;
      case 2: // YouTube
        // Japanese uses Korean YouTube for now (no JP channel yet)
        if (props.language === "日本語") url = "arotarokr";
        url = "https://www.youtube.com/@" + url;
        break;
      default:
        break;
    }
    window.open(url, '_blank');
  }
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="footer-left-container">
          <a href="https://metis-ai.io/" target="_blank" rel="noopener noreferrer">
            <img src={Blue} alt="logo" className="blue-logo" />
          </a>
          <h4 className="managed-by">Managed by Metis AI</h4>
          <div className="social-medias">
            <img src={Instagram} alt="logo" onClick={() => handleRedirect(1)} />
            <img src={Youtube} alt="logo"  onClick={() => handleRedirect(2)}/>
            {/* KakaoTalk temporarily hidden
            <img src={Kakaotalk} alt="logo"  onClick={() => handleRedirect(3)}/>
            */}
          </div>
          <h5 className="copyright">
            {`© ${new Date().getFullYear()} Metis ai. All rights reserved.`}
          </h5>
        </div>
        <div className="footer-right-container">
          <div className="footer-menu-column">
            <h5>Arotaro</h5>
            <h6>
              <a href="/about">{t("about-us")}</a>
            </h6>
          </div>
          <div className="footer-menu-column">
            <h5>Support</h5>
            <h6>
              <a href="/support/faq">{t("faq")}</a>
            </h6>
            <h6>
              <a href="/support/disclaimer">{t("disclaimer")}</a>
            </h6>
            <h6>
              <a href="/support/terms">{t("terms")}</a>
            </h6>
            <h6>
              <a href="/support/policy">{t("policy")}</a>
            </h6>
          </div>
          <div ref={dropdownRef} className="footer-langurage-menu">
            <div className="langurage-line" onClick={toggleDropdown}>
              <img src={Langurage} className="langurage-icon" alt="langurage" />
              <h5 className="current-langurage">{props.language}</h5>
            </div>
            <div
              className={[
                "dropdown-options",
                isDropdownOpen ? "show" : "hide",
              ].join(" ")}
            >
              <div
                className="dropdown-option"
                onClick={() => handleOptionClick("English")}
              >
                <img
                  src={Checkmark}
                  className={[
                    "checkmark",
                    props.language === "English" ? "show" : "hide",
                  ].join(" ")}
                />
                English
              </div>
              <div
                className="dropdown-option"
                onClick={() => handleOptionClick("한국어")}
              >
                <img
                  src={Checkmark}
                  className={[
                    "checkmark",
                    props.language === "한국어" ? "show" : "hide",
                  ].join(" ")}
                />
                한국어
              </div>
              <div
                className="dropdown-option"
                onClick={() => handleOptionClick("日本語")}
              >
                <img
                  src={Checkmark}
                  className={[
                    "checkmark",
                    props.language === "日本語" ? "show" : "hide",
                  ].join(" ")}
                />
                日本語
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
