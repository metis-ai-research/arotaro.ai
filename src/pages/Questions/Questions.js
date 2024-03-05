import { useState, useRef } from "react";
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
  const [content, setContent] = useState("");
  const [file, setFile] = useState({});
  const dropdownArr = [
    t("technical-issues"),
    t("payment-issues"),
    t("suggestions-feedback"),
    t("general-inquiries"),
    t("other"),
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
    setFile(selectedFile ? selectedFile : {});
  };
  const handleSubmit = () => {
    const formData = new FormData();
    if (!name || !email || !type || !content || !file?.name) {
      return;
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", type);
    formData.append("body", content);
    formData.append('attachment', file);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(
      "https://api.mytarot.io/api/contact/send-email",
      requestOptions,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("response", data);
      })
      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
      });
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
            {t("name")} <b>*</b>
          </label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name-placeholder")}
          />
        </div>
        <div className="input-container">
          <label>
            {t("email")}
            <b>*</b>
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
            {t("inquiry-type")} <b>*</b>
          </label>
          <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
            <div className="dropdown-header" onClick={toggleDropdown}>
              <span>{type ? type : t("select-inquiry-topic")}</span>
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
            {t("content")}
            <b>*</b>
          </label>
          <textarea
            placeholder={t("inquiry-placeholder")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
            {" "}
          </textarea>
        </div>
        <div className="input-container">
          <label>
            {t("file-attach")}
            <b>*</b>
          </label>

          <div className="file-upload-container" onClick={handleFileInputClick}>
            <img src={Clip} className="clip" alt="clip" />
            <span> {file.name ? file.name : t("choose-file")}</span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
        </div>

        <div className="submit-button" onClick={handleSubmit}>
          {t("submit")}
        </div>
      </div>
      <img src={Cone} className="cone-in-question" alt="icon" />
      <GlobalFooter setLangurage={setLangurage} langurage={langurage} />
    </div>
  );
}
