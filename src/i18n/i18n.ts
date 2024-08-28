import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en, english } from "./locales/en"; 
import { fr, french } from "./locales/fr";  
import { ar, arabic } from "./locales/ar"; 

export const languages = [
  english, 
  french, 
  arabic 
].sort((a, b) => a.name.localeCompare(b.name));

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en, 
      fr, 
      ar,
      
    },
  });

export default i18n;
