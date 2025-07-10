import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../../components/seo';

export default function OptimizingWarehouseEfficiency() {
  const { t, i18n } = useTranslation('common'); // Accessing the 'common' namespace

  return (
    <>
      <SEO
        title={t('optimizingWarehouse.seo.title')}
        description={t('optimizingWarehouse.seo.description')}
        url={`https://www.enoshinfra.com/${i18n.language}/blogs/optimizing-warehouse-efficiency`}
        keywords={t('optimizingWarehouse.seo.keywords')}
      />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">{t('optimizingWarehouse.title')}</h1>
          <p className="text-lg mb-6">
            {t('optimizingWarehouse.intro.text1')}
            <strong>{t('optimizingWarehouse.intro.highlight1')}</strong>
            {t('optimizingWarehouse.intro.text2')}
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>
              <strong>{t('optimizingWarehouse.list.item1.title')}</strong>
              {t('optimizingWarehouse.list.item1.description')}
            </li>
            <li>
              <strong>{t('optimizingWarehouse.list.item2.title')}</strong>
              {t('optimizingWarehouse.list.item2.description')}
            </li>
            <li>
              <strong>{t('optimizingWarehouse.list.item3.title')}</strong>
              {t('optimizingWarehouse.list.item3.description')}
            </li>
            <li>
              <strong>{t('optimizingWarehouse.list.item4.title')}</strong>
              {t('optimizingWarehouse.list.item4.description')}
            </li>
            <li>
              <strong>{t('optimizingWarehouse.list.item5.title')}</strong>
              {t('optimizingWarehouse.list.item5.description')}
            </li>
            <li>
              <strong>{t('optimizingWarehouse.list.item6.title')}</strong>
              {t('optimizingWarehouse.list.item6.description')}
            </li>
          </ul>
          <p className="text-lg">
            {t('optimizingWarehouse.closing.text1')}
            <strong>{t('optimizingWarehouse.closing.highlight1')}</strong>
            {t('optimizingWarehouse.closing.text2')}
          </p>
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
