import { useState, useEffect, useRef } from "react";
import "./css/GlobalFooter.scss";
import Blue from "../resources/blue-logo.png";
import Langurage from "../resources/langurage.png";
import Instagram from "../resources/Instagram.png";
import Kakaotalk from "../resources/kakaotalk.png";
import Youtube from "../resources/youtube.png";
import Checkmark from "../resources/Checkmark.png";

export default function GlobalFooter(props) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    props.setLangurage(option);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="footer-left-container">
          <img src={Blue} alt="logo" className="blue-logo" />
          <h4 className="managed-by">Managed by Metis AI</h4>
          <div className="social-medias">
            <img src={Instagram} alt="logo" />
            <img src={Youtube} alt="logo" />
            <img src={Kakaotalk} alt="logo" />
          </div>
          <h5 className="copyright">
            {"© 2024 Metis ai. All rights reserved."}
          </h5>
        </div>
        <div className="footer-right-container">
          <div className="footer-menu-column">
            <h5>Arotaro</h5>
            <h6>서비스 소개</h6>
          </div>
          <div className="footer-menu-column">
            <h5>Support</h5>
            <h6>자주 묻는 질문</h6>
            <h6>이용약관</h6>
            <h6>개인정보 처리방침</h6>
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
