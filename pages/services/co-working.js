import SEO from '../../components/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function CoWorkingSpaces() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('coworking.seo.title')}
        description={t('coworking.seo.description')}
        url="https://www.enoshinfra.com/services/co-working"
      />
      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">{t('coworking.title')}</h1>
        <p className="text-lg leading-relaxed mb-6">{t('coworking.para1')}</p>

        <h2 className="text-3xl font-semibold mt-10 mb-4 text-center">
          {t('coworking.whyTitle')}
        </h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>{t('coworking.point1')}</li>
          <li>{t('coworking.point2')}</li>
          <li>{t('coworking.point3')}</li>
          <li>{t('coworking.point4')}</li>
          <li>{t('coworking.point5')}</li>
          <li>{t('coworking.point6')}</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-10 mb-4 text-center">
          {t('coworking.plugTitle')}
        </h2>
        <p className="text-lg leading-relaxed mb-6">{t('coworking.plugPara')}</p>

        <p className="text-xl font-semibold text-center text-blue-400 mt-10">
          {t('coworking.closing')}
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

