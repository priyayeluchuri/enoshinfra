import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import hi from './locales/hi/common.json';
import kn from './locales/kn/common.json';
import zh from './locales/zh/common.json';
import ru from './locales/ru/common.json';
import fr from './locales/fr/common.json';
import de from './locales/de/common.json';
import te from './locales/te/common.json';
import ja from './locales/ja/common.json';
import ar from './locales/ar/common.json';
// Initialize i18next
i18next
  .use(initReactI18next) // Pass i18next instance to react-i18next
  .init({
    resources: {
      en: { common: en },
      hi: { common: hi },
      kn: { common: kn },
      te: { common: te },
      zh: { common: zh },
      ja: { common: ja },
      ar: { common: ar },
      ru: { common: ru },
      fr: { common: fr },
      ge: { common: de }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18next;

