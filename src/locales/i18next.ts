import i18n from "i18next";
import commonRu from "../locales/ru/common.json";
import commonUz from "../locales/uz/common.json";
import { initReactI18next } from "react-i18next";
import { getLanguage } from "@/helpers/Storage";

const resources = {
  ru: {
    translation: {
      ...commonRu,
    },
  },
  uz: {
    translation: {
      ...commonUz,
    },
  },
};

i18n.use(initReactI18next).init({
  detection: {
    order: ["querystring", "localStorage", "cookie", "navigator"],
    caches: ["localStorage", "cookie"],
  },
  resources,
  lng: getLanguage(),
  fallbackLng: "ru",
  debug: false,
  interpolation: { escapeValue: false },
});

export default i18n;
