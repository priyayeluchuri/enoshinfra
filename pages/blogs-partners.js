import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/seo';
import Link from 'next/link';

export default function BlogsPartners() {
  const { t, i18n } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('blogsPartners.seo.title')}
        description={t('blogsPartners.seo.description')}
        url="https://enoshinfra.com/blogs-partners"
        keywords={t('blogsPartners.seo.keywords')}
      />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">{t('blogsPartners.title')}</h1>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">{t('blogsPartners.blogs.title')}</h2>
            <p className="text-lg mb-6">
              {t('blogsPartners.blogs.text1')}
              <strong>{t('blogsPartners.blogs.highlight1')}</strong>
              {t('blogsPartners.blogs.text2')}
            </p>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/blogs/why-bengaluru-industrial-hub-2025"
                  locale={i18n.language}
                  className="text-blue-500 hover:underline"
                >
                  {t('blogsPartners.blogs.list.item1')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs/guide-setup-it-tech-startup"
                  locale={i18n.language}
                  className="text-blue-500 hover:underline"
                >
                  {t('blogsPartners.blogs.list.item2')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs/guide-setup-business-bengaluru"
                  locale={i18n.language}
                  className="text-blue-500 hover:underline"
                >
                  {t('blogsPartners.blogs.list.item3')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs/optimizing-warehouse-efficiency"
                  locale={i18n.language}
                  className="text-blue-500 hover:underline"
                >
                  {t('blogsPartners.blogs.list.item4')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs/top-industrial-areas-bengaluru"
                  locale={i18n.language}
                  className="text-blue-500 hover:underline"
                >
                  {t('blogsPartners.blogs.list.item5')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4">{t('blogsPartners.partnerships.title')}</h2>
            <p className="text-lg mb-6">
              {t('blogsPartners.partnerships.text1')}
              <strong>{t('blogsPartners.partnerships.highlight1')}</strong>
              {t('blogsPartners.partnerships.text2')}
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>{t('blogsPartners.partnerships.bullet1')}</li>
              <li>{t('blogsPartners.partnerships.bullet2')}</li>
              <li>{t('blogsPartners.partnerships.bullet3')}</li>
            </ul>
            <Link
              href="/contact"
              locale={i18n.language}
              className="text-blue-500 hover:underline"
            >
              {t('blogsPartners.partnerships.cta')}
            </Link>
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
