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
import Alert from "../../resources/alert.png";

export default function Questions() {
  const { t } = useTranslation();
  const [langurage, setLangurage] = useState("한국어");
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState({});
  const [errors, setErrors] = useState({});
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
      setErrors({...errors, type: ''});
    }
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
    if (selectedFile && selectedFile.size > maxSizeInBytes) {
      e.target.value = null;
      setErrors({...errors, file: t("file-error")});
    } else {
      setErrors({...errors, file: ""});
      setFile(selectedFile ? selectedFile : {});
    }
  };
  const handleSubmit = async () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = t("name-error");
    }
    if (!email) {
      newErrors.email = t("email-error");
    }
    if (!type) {
      newErrors.type = t("type-error");
    }
    if (!content) {
      newErrors.content = t("content-error");
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", type);
    formData.append("body", content);
    if (file?.name) {
      formData.append('attachment', file);
    }
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    };
    fetch(
      "https://api.mytarot.io/api/contact/send-email",
      requestOptions,
    )
      .then((response) => {
        console.log(response,"response")
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setErrors({});
        console.log("response", data);
      })
      .catch((error) => {
        console.error(error);
      }).finally(()=>{
        alert(t("success-msg"))
        window.location.href = "/"
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
            onChange={(e) => {
              setName(e.target.value);
              setErrors({...errors, name: ''});
            }}
            placeholder={t("name-placeholder")}
          />
          <div className="error-msg" style={{display: errors.name ? "flex" : "none"}}>
            <img src={Alert} alt="error" />
            {errors.name}
          </div>
        </div>
        <div className="input-container">
          <label>
            {t("email")}
            <b>*</b>
          </label>
          <input
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({...errors, email: ''});
            }}
            placeholder="1234@naver.com"
          />
          <div className="error-msg" style={{display: errors.email ? "flex" : "none"}}>
          <img src={Alert} alt="error" />
            {errors.email}
          </div>
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
          <div className="error-msg" style={{display: errors.type ? "flex" : "none"}}>
          <img src={Alert} alt="error" />
            {errors.type}
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
            onChange={(e) => {
              setContent(e.target.value);
              setErrors({...errors, content: ''});
            }}
          >
            {" "}
          </textarea>
          <div className="error-msg" style={{display: errors.content ? "flex" : "none"}}>
          <img src={Alert} alt="error" />
            {errors.content}
          </div>
        </div>
        <div className="input-container">
          <label>
            {t("file-attach")}
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
          <div className="error-msg" style={{display: errors.file ? "flex" : "none"}}>
          <img src={Alert} alt="error" />
            {errors.file}
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
