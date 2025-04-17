import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import hi from './locales/hi/common.json';
import kn from './locales/kn/common.json';
import zh from './locales/zh/common.json';
import ru from './locales/ru/common.json';
import fr from './locales/fr/common.json';
import ge from './locales/ge/common.json';
import te from './locales/te/common.json';
import jp from './locales/te/common.json';

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
      jp: { common: jp },
      ru: { common: ru },
      fr: { common: fr },
      ge: { common: ge }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18next;

