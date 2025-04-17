import { useRouter } from 'next/router';
import { useEffect } from 'react';
import i18n from '../i18n'; // ✅ import the correct instance

export default function LanguageSwitcher() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);

  const changeLanguage = (e) => {
    const selectedLang = e.target.value;
    const { pathname, asPath, query } = router;

    router.push({ pathname, query }, asPath, { locale: selectedLang });
  };

  return (
    <select
      value={router.locale}
      onChange={changeLanguage}
      className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="kn">ಕನ್ನಡ</option>
      <option value="te">తెలుగు</option>
      <option value="zh">中文</option>
      <option value="ja">日本語</option>
      <option value="ru">Русский</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
    </select>
  );
}

