import SEO from '../components/seo';
import HeroSection from '../components/HeroSection';
import PropertyOverview from '../components/PropertyOverview';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t, i18n } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url={`https://www.enoshinfra.com/${i18n.language}`}
      />
      <HeroSection />
      <PropertyOverview />
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
