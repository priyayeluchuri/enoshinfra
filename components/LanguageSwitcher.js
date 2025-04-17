'use client';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();

  useEffect(() => {
  if (i18n.language !== router.locale) {
    i18n.changeLanguage(router.locale);
  }
}, [router.locale, i18n]);
  const changeLanguage = (e) => {
    const selectedLang = e.target.value;
    const { pathname, asPath, query } = router;

    router.push({ pathname, query }, asPath, { locale: selectedLang });
  };

  return (
    <select
      value={i18n.language}
      onChange={changeLanguage}
      className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="kn">ಕನ್ನಡ</option>
      <option value="te">తెలుగు</option>
      <option value="zh">中文</option>
      <option value="jp">日本語</option>
      <option value="ru">Русский</option>
      <option value="fr">Français</option>
      <option value="ge">Deutsch</option>
    </select>
  );
}

