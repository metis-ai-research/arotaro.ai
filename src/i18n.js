import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import jaTranslation from "./locales/ja.json";
import koTranslation from "./locales/ko.json";

const resources = {
  en: { translation: enTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
