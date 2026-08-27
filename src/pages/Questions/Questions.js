import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import "./Questions.scss";

import Disc from "../../resources/shapes/Disc_a2.png";
import Cube from "../../resources/shapes/Cube_a2.png";

// The canonical feedback vocabulary, shared by every project that files into
// Metis OS. These exact strings go on the wire; anything else is a 400.
//
// They double as i18n keys, so the label a person reads is still localized in
// src/locales/*.json — `bug` renders as "Technical" / 「技術」 / "기술". The key
// is the contract, the label is ours.
//
// This site used to send `technical-issues`, `payment-issues`,
// `suggestions-feedback` and `general-inquiries`. Those spellings are retired
// and no longer accepted.
const TOPIC_KEYS = ["bug", "payment", "feature", "question", "other"];

// This form posts to Metis OS, which files the Linear ticket, records the
// submission and pings Discord. arotaro.ai holds no Linear key and does not
// know Linear is involved — see ~/src/metis-os/kit/services/feedback.md.
//
// The key is PUBLIC and committed on purpose. It ships in this bundle either
// way, so treating it as a secret only buys useless work: it identifies the
// caller so Metis OS knows where to file, and gives us a revoke button. What
// actually limits abuse is the origin allowlist, the per-source rate limit and
// the ability to retire the source — all of them in Metis OS, none of them
// needing a change here.
const FEEDBACK_ENDPOINT = "https://os.metis-ai.io/api/feedback";
const FEEDBACK_SOURCE = "arotaro-site";
const FEEDBACK_KEY = "fbk_arotaro-site_k7m2q9xr4bd8vnf3tj6wzp5h";

/**
 * Which sentence to show for a failed submission, by status code.
 *
 * Metis OS's own `error` string is deliberately ignored: it is English, and it
 * is a telemetry marker rather than user-facing copy. `413` is folded into the
 * generic message because the form caps attachments client-side at 3MB, so it
 * should be unreachable from here.
 */
function submitErrorKey(status) {
  if (status === 429) return "submit-error-rate-limited";
  if (status === 502 || status === 503) return "submit-error-unavailable";
  return "submit-error";
}

export default function Questions() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
      const res = await fetch(FEEDBACK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: FEEDBACK_SOURCE,
          key: FEEDBACK_KEY,
          // The raw TOPIC_KEYS value, never the translated label: one
          // vocabulary drives labels, titles and triage filters in every
          // locale, and a localized string here is a 400.
          category: topic,
          content,
          name,
          email,
          attachment: attachment || undefined,
        }),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.ok) {
        // Classified on the status code, never on `result.error` — those
        // strings are English telemetry markers, not UI, and rendering them
        // here showed English copy to a Japanese or Korean reader.
        setErrors({ submit: t(submitErrorKey(res.status)) });
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

          {/* The honeypot field that used to sit here is gone. It was only ever
              read by this site's own /api/feedback, which no longer receives
              these submissions, so keeping it would have left a hidden input
              nothing anywhere inspected. It was never much of a control: it
              does nothing against a script posting to the endpoint directly.
              The origin allowlist and the per-source rate limit in Metis OS are
              what actually bound this form now. */}

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
