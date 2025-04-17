import SEO from '../components/seo';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Services() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={`${t('our_services')} - Enosh Infra`}
        description={t('services_description')}
        url="https://www.enoshinfra.com/services"
      />

      <main className="w-full min-h-screen p-6 pt-12 text-white bg-gray-900">
        <section className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-4">{t('our_services')}</h1>
          <p className="text-lg leading-relaxed mb-4">
            {t('services_description')}
          </p>
          <ul className="list-disc pl-6 text-lg leading-relaxed mb-4">
            <li>
              <Link href="/services/warehouses" className="text-blue-400 hover:underline">
                {t('warehouses')}
              </Link>
            </li>
            <li>
              <Link href="/services/tech-parks" className="text-blue-400 hover:underline">
                {t('tech_parks')}
              </Link>
            </li>
            <li>
              <Link href="/services/commercial-retail" className="text-blue-400 hover:underline">
                {t('commercial_retail')}
              </Link>
            </li>
            <li>
              <Link href="/services/co-working" className="text-blue-400 hover:underline">
                {t('co_working')}
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #111827;
        }
      `}</style>
    </>
  );
}

// Add this to support SSR translation loading
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

