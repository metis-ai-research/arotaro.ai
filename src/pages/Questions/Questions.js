import React, { useState, useRef } from "react";
import "./Questions.scss";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { useTranslation } from "react-i18next";
import IconDropDown from "../../resources/drop-down-icon.png";
import Clip from "../../resources/clip.png";
import Ball from "../../resources/shapes/question-ball.png";
import Cone from "../../resources/shapes/question-cone.png";
import Cube from "../../resources/shapes/question-cube.png";
import Spiral from "../../resources/shapes/question-spiral.png";

export default function Questions() {
  const { t } = useTranslation();
  const [langurage, setLangurage] = useState("한국어");
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dropdownArr = [
    "기술적인 문제 또는 불편사항",
    "결제 문제",
    "제안 및 피드백",
    "일반 문의",
    "기타",
  ];

  const toggleDropdown = (content) => {
    if (dropdownArr.includes(content)) {
      setType(content);
    }
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    // 在这里可以执行上传文件的操作，例如将文件发送到服务器等

    console.log("Selected file:", selectedFile);
  };

  return (
    <div className="question-main-container">
      <NavBar pageName="question" />
      <img src={Cube} className="cube-in-question" alt="icon" />
      <div className="question-greeting-container">
        <h1 className="question-h1">{t("question-h1")}</h1>
        <h2 className="question-greeting">{t("question-greeting")}</h2>
        <img src={Ball} className="ball-in-question" alt="icon" />
        <img src={Spiral} className="spiral-in-question" alt="icon" />
      </div>

      <div className="question-white-container">
        <div className="input-container">
          <label>
            이름 <b>*</b>
          </label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
          />
        </div>
        <div className="input-container">
          <label>
            이메일<b>*</b>
          </label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="1234@naver.com"
          />
        </div>
        <div className="input-container">
          <label>
            문의 주제 <b>*</b>
          </label>
          <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
            <div className="dropdown-header" onClick={toggleDropdown}>
              <span>{type ? type : "문의하실 주제를 선택해주세요"}</span>
              <img
                src={IconDropDown}
                className={["drop-down-icon", isOpen ? "img-active" : ""].join(
                  " ",
                )}
              />
            </div>
            {isOpen && (
              <div className="dropdown-content">
                <ul>
                  {dropdownArr.map((val, i) => (
                    <li onClick={() => toggleDropdown(val)} key={i}>
                      {val}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="input-container">
          <label>
            내용<b>*</b>
          </label>
          <textarea placeholder="문의 내용을 자세히 작성해 주시면 빠른 처리가 가능합니다."></textarea>
        </div>
        <div className="input-container">
          <label>
            파일 첨부<b>*</b>
          </label>

          <div className="file-upload-container" onClick={handleFileInputClick}>
            <img src={Clip} className="clip" alt="clip" />
            <span>파일 선택</span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
        </div>

        <div className="submit-button">제출</div>
      </div>
      <img src={Cone} className="cone-in-question" alt="icon" />
      <GlobalFooter setLangurage={setLangurage} langurage={langurage} />
    </div>
  );
}
