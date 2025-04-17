import SEO from '../../components/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function TechParks() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('techParks.seo.title')}
        description={t('techParks.seo.description')}
        url="https://www.enoshinfra.com/services/tech-parks"
      />
      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">{t('techParks.title')}</h1>
        <p className="text-lg leading-relaxed mb-6">
          {t('techParks.intro.1')} <span className="text-blue-400">{t('techParks.intro.highlight')}</span> {t('techParks.intro.2')}
        </p>
        <h2 className="text-3xl font-semibold mt-10 mb-4">{t('techParks.featuresTitle')}</h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>{t('techParks.bullet1')}</li>
          <li>{t('techParks.bullet2')}</li>
          <li>{t('techParks.bullet3')}</li>
          <li>{t('techParks.bullet4')}</li>
        </ul>
        <p className="text-xl font-semibold text-center text-blue-400 mt-10">
          {t('techParks.closing')}
        </p>
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

