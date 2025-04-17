import SEO from '../../components/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function TrendingWarehouses() {
  const { t } = useTranslation('common');

  const locations = [
    {
      name: 'Bommasandra',
      zone: t('trending.zoneSouth'),
      description: t('trending.bommasandra'),
    },
    {
      name: 'Nelamangala',
      zone: t('trending.zoneWest'),
      description: t('trending.nelamangala'),
    },
    {
      name: 'Peenya',
      zone: t('trending.zoneNorth'),
      description: t('trending.peenya'),
    },
    {
      name: 'Jigani',
      zone: t('trending.zoneSouth'),
      description: t('trending.jigani'),
    },
    {
      name: 'Hoskote',
      zone: t('trending.zoneEast'),
      description: t('trending.hoskote'),
    },
    {
      name: 'Kumbalgodu',
      zone: t('trending.zoneWest'),
      description: t('trending.kumbalgodu'),
    },
    {
      name: 'Doddaballapura',
      zone: t('trending.zoneNorth'),
      description: t('trending.doddaballapura'),
    },
    {
      name: 'Hebbal',
      zone: t('trending.zoneNorth'),
      description: t('trending.hebbal'),
    },
    {
      name: 'Whitefield',
      zone: t('trending.zoneEast'),
      description: t('trending.whitefield'),
    },
  ];

  return (
    <>
      <SEO
        title={t('trending.seo.title')}
        description={t('trending.seo.description')}
        url="https://www.enoshinfra.com/services/warehouses/trending"
      />
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-center mb-8">{t('trending.title')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc, idx) => (
              <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold">{loc.name}</h3>
                <h4 className="text-md text-gray-300">{loc.zone}</h4>
                <p className="text-gray-400">{loc.description}</p>
              </div>
            ))}
          </div>
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

