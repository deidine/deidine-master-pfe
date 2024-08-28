 
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Use import for JSON files
import enCommon from '../locales/en/common.json';
import frCommon from '../locales/fr/common.json';
import arCommon from '../locales/ar/common.json';
import {  english } from "../locales/en"; 
import {  french } from "../locales/fr";  
import {  arabic } from "../locales/ar"; 

export const languages = [
  english, 
  french, 
  arabic 
].sort((a, b) => a.name.localeCompare(b.name));

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: enCommon },
      fr: { translation: frCommon },
      ar: { translation: arCommon },
    },
  });

export default i18n;
