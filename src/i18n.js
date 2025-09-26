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

// Detect user's browser language
const detectUserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;

  if (browserLang.startsWith("en")) return "en";
  if (browserLang.startsWith("ko")) return "ko";
  if (browserLang.startsWith("ja")) return "ja";

  // Default to Korean if language not supported
  return "ko";
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: detectUserLanguage(),
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
  });

export default i18n;
