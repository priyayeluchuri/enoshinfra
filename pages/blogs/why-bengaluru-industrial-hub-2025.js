import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../../components/seo';
import Link from 'next/link';

export default function WhyBengaluruIndustrialHub() {
  const { t, i18n } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('bengaluruIndustrialHub.seo.title')}
        description={t('bengaluruIndustrialHub.seo.description')}
        url="https://enoshinfra.com/blogs/why-bengaluru-industrial-hub-2025"
        keywords={t('bengaluruIndustrialHub.seo.keywords')}
      />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">{t('bengaluruIndustrialHub.title')}</h1>
          <p className="text-lg mb-6">
            {t('bengaluruIndustrialHub.intro.text1')}
            <strong>{t('bengaluruIndustrialHub.intro.highlight1')}</strong>
            {t('bengaluruIndustrialHub.intro.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('bengaluruIndustrialHub.whyBengaluru.title')}</h2>
          <p className="text-lg mb-4">
            {t('bengaluruIndustrialHub.whyBengaluru.text1')}
            <strong>{t('bengaluruIndustrialHub.whyBengaluru.highlight1')}</strong>
            {t('bengaluruIndustrialHub.whyBengaluru.text2')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>{t('bengaluruIndustrialHub.whyBengaluru.bullet1')}</li>
            <li>{t('bengaluruIndustrialHub.whyBengaluru.bullet2')}</li>
            <li>{t('bengaluruIndustrialHub.whyBengaluru.bullet3')}</li>
            <li>{t('bengaluruIndustrialHub.whyBengaluru.bullet4')}</li>
          </ul>

          <h2 className="text-3xl font-semibold mb-4">{t('bengaluruIndustrialHub.tariffs.title')}</h2>
          <p className="text-lg mb-4">
            {t('bengaluruIndustrialHub.tariffs.text1')}
            <strong>{t('bengaluruIndustrialHub.tariffs.highlight1')}</strong>
            {t('bengaluruIndustrialHub.tariffs.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('bengaluruIndustrialHub.keyAreas.title')}</h2>
          <p className="text-lg mb-4">
            {t('bengaluruIndustrialHub.keyAreas.text1')}
            <strong>{t('bengaluruIndustrialHub.keyAreas.highlight1')}</strong>
            {t('bengaluruIndustrialHub.keyAreas.text2')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>{t('bengaluruIndustrialHub.keyAreas.area1.title')}</strong>: {t('bengaluruIndustrialHub.keyAreas.area1.text')}
            </li>
            <li>
              <strong>{t('bengaluruIndustrialHub.keyAreas.area2.title')}</strong>: {t('bengaluruIndustrialHub.keyAreas.area2.text')}
            </li>
            <li>
              <strong>{t('bengaluruIndustrialHub.keyAreas.area3.title')}</strong>: {t('bengaluruIndustrialHub.keyAreas.area3.text')}
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mb-4">{t('bengaluruIndustrialHub.enoshInfra.title')}</h2>
          <p className="text-lg mb-4">
            {t('bengaluruIndustrialHub.enoshInfra.text1')}
            <strong>{t('bengaluruIndustrialHub.enoshInfra.highlight1')}</strong>
            {t('bengaluruIndustrialHub.enoshInfra.text2')}
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>{t('bengaluruIndustrialHub.enoshInfra.bullet1')}</li>
            <li>{t('bengaluruIndustrialHub.enoshInfra.bullet2')}</li>
            <li>{t('bengaluruIndustrialHub.enoshInfra.bullet3')}</li>
          </ul>

          <h2 className="text-3xl font-semibold mb-4">{t('bengaluruIndustrialHub.conclusion.title')}</h2>
          <p className="text-lg mb-4">
            {t('bengaluruIndustrialHub.conclusion.text1')}
            <strong>{t('bengaluruIndustrialHub.conclusion.highlight1')}</strong>
            {t('bengaluruIndustrialHub.conclusion.text2')}
          </p>

          <Link
            href="/contact"
            locale={i18n.language}
            className="text-blue-500 hover:underline"
          >
            {t('bengaluruIndustrialHub.cta')}
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
