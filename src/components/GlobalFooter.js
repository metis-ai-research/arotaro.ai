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
    props.setLangurage(option);
    i18n.changeLanguage(option === "한국어" ? "ko" : "en");
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    const userLanguage = navigator.language || navigator.userLanguage;
    if (userLanguage.startsWith("en")) {
      props.setLangurage("English");
      i18n.changeLanguage("en");
    } else if (userLanguage.startsWith("ko")) {
      props.setLangurage("한국어");
      i18n.changeLanguage("ko");
    } else {
      props.setLangurage("English");
      i18n.changeLanguage("en");
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleRedirect = type => {
    let url = "arotaro" + (props.language === "한국어" ? "kr" : "na");
    switch (type) {
      case 1:
        url = "https://www.instagram.com/" + url;
        break;
      case 2:
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
          <img src={Blue} alt="logo" className="blue-logo" />
          <h4 className="managed-by">Managed by Metis AI</h4>
          <div className="social-medias">
            <img src={Instagram} alt="logo" onClick={() => handleRedirect(1)} />
            <img src={Youtube} alt="logo"  onClick={() => handleRedirect(2)}/>
            <img src={Kakaotalk} alt="logo"  onClick={() => handleRedirect(3)}/>
          </div>
          <h5 className="copyright">
            {"© 2024 Metis ai. All rights reserved."}
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
              <h5 className="current-langurage">{props.langurage}</h5>
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
                    props.langurage === "English" ? "show" : "hide",
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
                    props.langurage === "한국어" ? "show" : "hide",
                  ].join(" ")}
                />
                한국어
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
