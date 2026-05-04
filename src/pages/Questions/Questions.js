import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import axios from "axios";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import "./Questions.scss";

import Disc from "../../resources/shapes/Disc_a2.png";
import Cube from "../../resources/shapes/Cube_a2.png";

const TOPIC_KEYS = [
  "technical-issues",
  "payment-issues",
  "suggestions-feedback",
  "general-inquiries",
  "other",
];

export default function Questions() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const clearError = (field) =>
    setErrors((e) => {
      const next = { ...e };
      delete next[field];
      return next;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!name) next.name = t("name-error");
    if (!email) next.email = t("email-error");
    if (!topic) next.topic = t("type-error");
    if (!content) next.content = t("content-error");

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", topic);
    formData.append("body", content);

    setSubmitting(true);
    try {
      await axios.post("https://api.mytarot.io/api/contact/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      alert(t("success-msg"));
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setErrors({ submit: t("submit-error") });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`ar-page lang-${i18n.language}`}>
      <NavBar />

      <section className="ar-contact-hero">
        <img src={Disc} alt="" className="ar-contact-hero__shape ar-contact-hero__shape--disc" />
        <img src={Cube} alt="" className="ar-contact-hero__shape ar-contact-hero__shape--cube" />
        <div className="ar-contact-hero__inner">
          <div className="ar-eyebrow">{t("contact-eyebrow")}</div>
          <h1 className="ar-contact-hero__title">
            <Trans i18nKey="contact-title" components={{ em: <em /> }} />
          </h1>
        </div>
      </section>

      <section className="ar-contact-form-wrap">
        <form className="ar-contact-form" onSubmit={handleSubmit} noValidate>
          <div className="ar-field">
            <label htmlFor="name" className="ar-field__label">
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              className="ar-field__input"
              value={name}
              placeholder={t("name-placeholder")}
              onChange={(e) => {
                setName(e.target.value);
                clearError("name");
              }}
              aria-invalid={!!errors.name}
            />
            {errors.name && <div className="ar-field__error">{errors.name}</div>}
          </div>

          <div className="ar-field">
            <label htmlFor="email" className="ar-field__label">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              className="ar-field__input"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              aria-invalid={!!errors.email}
            />
            {errors.email && <div className="ar-field__error">{errors.email}</div>}
          </div>

          <div className="ar-field">
            <span className="ar-field__label">{t("inquiry-type")}</span>
            <div className="ar-chips" role="radiogroup" aria-label={t("inquiry-type")}>
              {TOPIC_KEYS.map((k) => {
                const label = t(k);
                const active = topic === label;
                return (
                  <button
                    type="button"
                    key={k}
                    role="radio"
                    aria-checked={active}
                    className={`ar-chip${active ? " is-active" : ""}`}
                    onClick={() => {
                      setTopic(label);
                      clearError("topic");
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {errors.topic && <div className="ar-field__error">{errors.topic}</div>}
          </div>

          <div className="ar-field">
            <label htmlFor="content" className="ar-field__label">
              {t("content")}
            </label>
            <textarea
              id="content"
              className="ar-field__input ar-field__textarea"
              rows={6}
              value={content}
              placeholder={t("inquiry-placeholder")}
              onChange={(e) => {
                setContent(e.target.value);
                clearError("content");
              }}
              aria-invalid={!!errors.content}
            />
            {errors.content && <div className="ar-field__error">{errors.content}</div>}
          </div>

          {errors.submit && <div className="ar-field__error">{errors.submit}</div>}

          <button type="submit" className="ar-btn ar-btn--primary" disabled={submitting}>
            {submitting ? t("submitting") : t("submit")}
          </button>
        </form>
      </section>

      <GlobalFooter />
    </div>
  );
}
