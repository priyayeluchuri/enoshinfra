import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../../components/seo';
import Link from 'next/link';

export default function LargeWarehouseOfficeLeaseBengaluru() {
  const { t, i18n } = useTranslation('common');
  const canonicalUrl = i18n.language === 'en'
  ? `https://www.enoshinfra.com/blogs/large-warehouse-office-lease-bengaluru-2025`  // Clean URL for English
  : `https://www.enoshinfra.com/${i18n.language}/blogs/large-warehouse-office-lease-bengaluru-2025`; // Prefixed for other languages
  return (
    <>
      <SEO
        title={t('largeWarehouseOfficeBengaluru.seo.title')}
        description={t('largeWarehouseOfficeBengaluru.seo.description')}
        url={canonicalUrl}
        keywords={t('largeWarehouseOfficeBengaluru.seo.keywords')}
      />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">{t('largeWarehouseOfficeBengaluru.title')}</h1>
          <p className="text-lg mb-6">
            {t('largeWarehouseOfficeBengaluru.intro.text1')}
            <strong>{t('largeWarehouseOfficeBengaluru.intro.highlight1')}</strong>
            {t('largeWarehouseOfficeBengaluru.intro.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('largeWarehouseOfficeBengaluru.location.title')}</h2>
          <p className="text-lg mb-4">
            {t('largeWarehouseOfficeBengaluru.location.text1')}
            <strong>{t('largeWarehouseOfficeBengaluru.location.highlight1')}</strong>
            {t('largeWarehouseOfficeBengaluru.location.text2')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>{t('largeWarehouseOfficeBengaluru.location.area1.title')}</strong>: {t('largeWarehouseOfficeBengaluru.location.area1.text')}
            </li>
            <li>
              <strong>{t('largeWarehouseOfficeBengaluru.location.area2.title')}</strong>: {t('largeWarehouseOfficeBengaluru.location.area2.text')}
            </li>
            <li>
              <strong>{t('largeWarehouseOfficeBengaluru.location.area3.title')}</strong>: {t('largeWarehouseOfficeBengaluru.location.area3.text')}
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mb-4">{t('largeWarehouseOfficeBengaluru.features.title')}</h2>
          <p className="text-lg mb-4">
            {t('largeWarehouseOfficeBengaluru.features.text1')}
            <strong>{t('largeWarehouseOfficeBengaluru.features.highlight1')}</strong>
            {t('largeWarehouseOfficeBengaluru.features.text2')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>{t('largeWarehouseOfficeBengaluru.features.bullet1')}</li>
            <li>{t('largeWarehouseOfficeBengaluru.features.bullet2')}</li>
            <li>{t('largeWarehouseOfficeBengaluru.features.bullet3')}</li>
          </ul>

          <h2 className="text-3xl font-semibold mb-4">{t('largeWarehouseOfficeBengaluru.cost.title')}</h2>
          <p className="text-lg mb-4">
            {t('largeWarehouseOfficeBengaluru.cost.text1')}
            <strong>{t('largeWarehouseOfficeBengaluru.cost.highlight1')}</strong>
            {t('largeWarehouseOfficeBengaluru.cost.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('largeWarehouseOfficeBengaluru.scalability.title')}</h2>
          <p className="text-lg mb-4">
            {t('largeWarehouseOfficeBengaluru.scalability.text1')}
            <strong>{t('largeWarehouseOfficeBengaluru.scalability.highlight1')}</strong>
            {t('largeWarehouseOfficeBengaluru.scalability.text2')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>{t('largeWarehouseOfficeBengaluru.scalability.bullet1')}</li>
            <li>{t('largeWarehouseOfficeBengaluru.scalability.bullet2')}</li>
          </ul>

          <h2 className="text-3xl font-semibold mb-4">{t('largeWarehouseOfficeBengaluru.enoshInfra.title')}</h2>
          <p className="text-lg mb-4">
            {t('largeWarehouseOfficeBengaluru.enoshInfra.text1')}
            <strong>{t('largeWarehouseOfficeBengaluru.enoshInfra.highlight1')}</strong>
            {t('largeWarehouseOfficeBengaluru.enoshInfra.text2')}
            <Link
              href="/blogs/why-bengaluru-industrial-hub-2025"
              locale={i18n.language}
              className="text-blue-500 hover:underline"
            >
              {t('largeWarehouseOfficeBengaluru.enoshInfra.linkText')}
            </Link>
            {t('largeWarehouseOfficeBengaluru.enoshInfra.text3')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('largeWarehouseOfficeBengaluru.conclusion.title')}</h2>
          <p className="text-lg mb-4">
            {t('largeWarehouseOfficeBengaluru.conclusion.text1')}
            <strong>{t('largeWarehouseOfficeBengaluru.conclusion.highlight1')}</strong>
            {t('largeWarehouseOfficeBengaluru.conclusion.text2')}
          </p>

          <Link
            href="/contact"
            locale={i18n.language}
            className="text-blue-500 hover:underline"
          >
            {t('largeWarehouseOfficeBengaluru.cta')}
          </Link>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
