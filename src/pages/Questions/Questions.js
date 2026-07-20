import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
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
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [company, setCompany] = useState(""); // honeypot — real users never fill this

  // 3MB raw ≈ 4MB base64 — must stay under Vercel's ~4.5MB request-body limit.
  const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setAttachment(null);
      clearError("attachment");
      return;
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      e.target.value = "";
      setAttachment(null);
      setErrors((prev) => ({ ...prev, attachment: t("attachment-too-large") }));
      return;
    }
    clearError("attachment");
    const reader = new FileReader();
    reader.onload = () =>
      setAttachment({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        dataUrl: reader.result,
      });
    reader.readAsDataURL(file);
  };

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

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category: topic,
          content,
          company,
          attachment: attachment || undefined,
        }),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.ok) {
        setErrors({ submit: result?.error || t("submit-error") });
        return;
      }
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
                const active = topic === k;
                return (
                  <button
                    type="button"
                    key={k}
                    role="radio"
                    aria-checked={active}
                    className={`ar-chip${active ? " is-active" : ""}`}
                    onClick={() => {
                      setTopic(k);
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

          <div className="ar-field">
            <label htmlFor="attachment" className="ar-field__label">
              {t("attachment")}
            </label>
            <input
              id="attachment"
              type="file"
              className="ar-field__file"
              onChange={handleFile}
              aria-invalid={!!errors.attachment}
            />
            {errors.attachment && <div className="ar-field__error">{errors.attachment}</div>}
          </div>

          {/* Honeypot: hidden from real users, bots that auto-fill trip it */}
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", height: 0, opacity: 0 }}
          />

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
