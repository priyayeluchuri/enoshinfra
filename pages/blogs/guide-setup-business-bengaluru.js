import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../../components/seo';
import Link from 'next/link';

export default function GuideSetupBusinessBengaluru() {
  const { t, i18n } = useTranslation('common'); // Accessing the 'common' namespace

  return (
    <>
      <SEO
        title={t('guideSetupBusiness.seo.title')}
        description={t('guideSetupBusiness.seo.description')}
        url={`https://www.enoshinfra.com/${i18n.language}/blogs/guide-setup-business-bengaluru`}
        keywords={t('guideSetupBusiness.seo.keywords')}
      />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">{t('guideSetupBusiness.title')}</h1>
          <p className="text-lg mb-6">
            {t('guideSetupBusiness.intro.text1')}
            <strong>{t('guideSetupBusiness.intro.highlight1')}</strong>
            {t('guideSetupBusiness.intro.text2')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('guideSetupBusiness.step1.title')}</h2>
          <p className="text-lg mb-4">
            {t('guideSetupBusiness.step1.text1')}
            <strong>{t('guideSetupBusiness.step1.highlight1')}</strong>
            {t('guideSetupBusiness.step1.text2')}
            <strong>{t('guideSetupBusiness.step1.highlight2')}</strong>
            {t('guideSetupBusiness.step1.text3')}
            <strong>{t('guideSetupBusiness.step1.highlight3')}</strong>
            {t('guideSetupBusiness.step1.text4')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('guideSetupBusiness.step2.title')}</h2>
          <p className="text-lg mb-4">
            {t('guideSetupBusiness.step2.text1')}
            <strong>{t('guideSetupBusiness.step2.highlight1')}</strong>
            {t('guideSetupBusiness.step2.text2')}
            <strong>{t('guideSetupBusiness.step2.highlight2')}</strong>
            {t('guideSetupBusiness.step2.text3')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('guideSetupBusiness.step3.title')}</h2>
          <p className="text-lg mb-4">
            {t('guideSetupBusiness.step3.text1')}
            <strong>{t('guideSetupBusiness.step3.highlight1')}</strong>
            {t('guideSetupBusiness.step3.text2')}
            <strong>{t('guideSetupBusiness.step3.highlight2')}</strong>
            {t('guideSetupBusiness.step3.text3')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('guideSetupBusiness.step4.title')}</h2>
          <p className="text-lg mb-4">
            {t('guideSetupBusiness.step4.text1')}
            <strong>{t('guideSetupBusiness.step4.highlight1')}</strong>
            {t('guideSetupBusiness.step4.text2')}
            <strong>{t('guideSetupBusiness.step4.highlight2')}</strong>
            {t('guideSetupBusiness.step4.text3')}
          </p>

          <h2 className="text-3xl font-semibold mb-4">{t('guideSetupBusiness.step5.title')}</h2>
          <p className="text-lg mb-4">
            {t('guideSetupBusiness.step5.text1')}
            <strong>{t('guideSetupBusiness.step5.highlight1')}</strong>
            {t('guideSetupBusiness.step5.text2')}
          </p>

          <Link
            href="/contact"
            locale={i18n.language}
            className="text-blue-500 hover:underline"
          >
            {t('guideSetupBusiness.cta')}
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
