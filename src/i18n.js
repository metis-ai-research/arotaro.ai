import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en.json";
import koTranslation from "./locales/ko.json";
import jaTranslation from "./locales/ja.json";

const resources = {
  en: { translation: enTranslation },
  ko: { translation: koTranslation },
  ja: { translation: jaTranslation },
};

// The arotaro app links here with ?locale=<code>; normalize its aliases to
// our locale codes. Region variants (en-US, ja-JP) resolve on their own.
const LOCALE_ALIASES = { kr: "ko", jp: "ja" };

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: "localeQuerystring",
  lookup() {
    if (typeof window === "undefined") return undefined;
    const value = new URLSearchParams(window.location.search).get("locale");
    if (!value) return undefined;
    const lower = value.toLowerCase();
    return LOCALE_ALIASES[lower] || lower;
  },
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ko",
    supportedLngs: ["en", "ko", "ja"],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // localeQuerystring first: an explicit ?locale= from the app must beat
      // the visitor's cached choice in localStorage.
      order: ["localeQuerystring", "querystring", "localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      lookupQuerystring: "lng",
    },
  });

export default i18n;
