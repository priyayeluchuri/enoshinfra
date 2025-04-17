import SEO from '../components/seo';
import HeroSection from '../components/HeroSection';
import { useTranslation } from 'next-i18next'; // correct import
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // for SSR/SSG i18n

export default function Home() {
  const { t } = useTranslation('common'); // specify the namespace

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url="https://enoshinfra.com"
      />
      <HeroSection />
      {/* <PropertyList /> */}
    </>
  );
}

// 👇 Add this at the bottom of the file
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

