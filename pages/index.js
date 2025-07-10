import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/seo';
import HeroSection from '../components/HeroSection';
import PropertyOverview from '../components/PropertyOverview';

export default function Home({ locale }) {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO pageKey="seo" locale={locale} />
      <main className="bg-gray-900 text-white">
        <h1 className="sr-only">{t('home.title')}</h1>
        <HeroSection />
        <PropertyOverview />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      locale,
    },
  };
}
