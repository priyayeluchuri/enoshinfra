import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../../components/seo';
import Link from 'next/link';

export default function TopIndustrialAreasBengaluru() {
  const { t, i18n } = useTranslation('common'); // Accessing the 'common' namespace

  return (
    <>
      <SEO
        title={t('topIndustrialAreas.seo.title')}
        description={t('topIndustrialAreas.seo.description')}
        url="https://enoshinfra.com/blogs/top-industrial-areas-bengaluru-2025"
        keywords={t('topIndustrialAreas.seo.keywords')}
      />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">{t('topIndustrialAreas.title')}</h1>
          <p className="text-lg mb-6">
            {t('topIndustrialAreas.intro.text1')}
            <strong>{t('topIndustrialAreas.intro.highlight1')}</strong>
            {t('topIndustrialAreas.intro.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('topIndustrialAreas.area1.title')}</h2>
          <p className="text-lg mb-4">
            {t('topIndustrialAreas.area1.text1')}
            <strong>{t('topIndustrialAreas.area1.highlight1')}</strong>
            {t('topIndustrialAreas.area1.text2')}
            <strong>{t('topIndustrialAreas.area1.highlight2')}</strong>
            {t('topIndustrialAreas.area1.text3')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('topIndustrialAreas.area2.title')}</h2>
          <p className="text-lg mb-4">
            {t('topIndustrialAreas.area2.text1')}
            <strong>{t('topIndustrialAreas.area2.highlight1')}</strong>
            {t('topIndustrialAreas.area2.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('topIndustrialAreas.area3.title')}</h2>
          <p className="text-lg mb-4">
            {t('topIndustrialAreas.area3.text1')}
            <strong>{t('topIndustrialAreas.area3.highlight1')}</strong>
            {t('topIndustrialAreas.area3.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('topIndustrialAreas.area4.title')}</h2>
          <p className="text-lg mb-4">
            {t('topIndustrialAreas.area4.text1')}
            <strong>{t('topIndustrialAreas.area4.highlight1')}</strong>
            {t('topIndustrialAreas.area4.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('topIndustrialAreas.area5.title')}</h2>
          <p className="text-lg mb-4">
            {t('topIndustrialAreas.area5.text1')}
            <strong>{t('topIndustrialAreas.area5.highlight1')}</strong>
            {t('topIndustrialAreas.area5.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('topIndustrialAreas.legal.title')}</h2>
          <p className="text-lg mb-4">{t('topIndustrialAreas.legal.text')}</p>

          <h2 className="text-3xl font-semibold mb-4">{t('topIndustrialAreas.conclusion.title')}</h2>
          <p className="text-lg mb-4">
            {t('topIndustrialAreas.conclusion.text1')}
            <strong>{t('topIndustrialAreas.conclusion.highlight1')}</strong>
            {t('topIndustrialAreas.conclusion.text2')}
          </p>

          <Link
            href="/contact"
            locale={i18n.language}
            className="text-blue-500 hover:underline"
          >
            {t('topIndustrialAreas.cta')}
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
