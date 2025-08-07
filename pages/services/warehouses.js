import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../../components/seo';
import Link from 'next/link';

export default function Warehouses() {
  const { t, i18n } = useTranslation('common'); // Accessing the 'common' namespace

  return (
    <>
      <SEO
        title={t('warehouse.seo.title')}
        description={t('warehouse.seo.description')}
        url={`https://www.enoshinfra.com/${i18n.language}/services/warehouses`}
      />

      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">
          {t('warehouse.title')}
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          {t('warehouse.intro.1')}
          <span className="text-blue-400"> {t('warehouse.intro.highlight1')} </span>
          {t('warehouse.intro.2')}
          <span className="text-blue-400"> {t('warehouse.intro.highlight2')} </span>.
        </p>

        <h2 className="text-3xl font-semibold mt-10 mb-4">
          {t('warehouse.whyTitle')}
        </h2>

        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>{t('warehouse.bullet1')}</li>
          <li>{t('warehouse.bullet2')}</li>
          <li>{t('warehouse.bullet3')}</li>
          <li>{t('warehouse.bullet4')}</li>
        </ul>

        <p className="text-xl font-semibold text-center text-blue-400 mt-10">
          {t('warehouse.closingLine')}
        </p>

        <Link
          href="/services/trending-warehouse"
          locale={i18n.language} // optional: to ensure locale persists
          className="block text-blue-400 underline text-xl text-center mt-4 mx-auto"
        >
          {t('warehouse.exploreTrending')}
        </Link>
        <Link
          href="/warehouses-for-rent"
          locale={i18n.language}
          className="block text-blue-400 underline text-xl text-center mt-2 mx-auto"
        >
          {t('warehouse.linkToRentals', 'Explore Warehouse Rentals Now')}
        </Link>
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
