// next-i18next.config.js
const path = require('path');
module.exports = {
  i18n: {
    locales: ['en', 'hi', 'kn', 'te', 'zh', 'ja', 'ar', 'ru', 'fr', 'de'], // English, Hindi, Kannada, Chinese
    defaultLocale: 'en',
    localeDetection: false,
  },
   localePath: path.resolve('./locales'),
};

