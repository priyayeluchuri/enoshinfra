import SEO from '../../components/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function CommercialRetail() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('commercial.seo.title')}
        description={t('commercial.seo.description')}
        url="https://www.enoshinfra.com/services/commercial-retail"
      />
      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">{t('commercial.title')}</h1>
        <p className="text-lg leading-relaxed mb-6">{t('commercial.para1')}</p>
        <p className="text-lg leading-relaxed mb-6">{t('commercial.para2')}</p>

        <h2 className="text-3xl font-semibold mt-10 mb-4 text-center">
          {t('commercial.whyTitle')}
        </h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>{t('commercial.point1')}</li>
          <li>{t('commercial.point2')}</li>
          <li>{t('commercial.point3')}</li>
          <li>{t('commercial.point4')}</li>
          <li>{t('commercial.point5')}</li>
        </ul>

        <p className="text-xl font-semibold text-center text-blue-400 mt-10">
          {t('commercial.closing')}
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

