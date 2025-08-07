import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/seo';

export default function About() {
  const { t, i18n } = useTranslation('common'); // Import translations from 'common.json'
  const canonicalUrl = i18n.language === 'en' 
  ? `https://www.enoshinfra.com/about`  // Clean URL for English
  : `https://www.enoshinfra.com/${i18n.language}/about`; // Prefixed for other languages

  return (
    <>
      <SEO
        title={t('about.title')} // Title from the translations
        description={t('about.description')} // Description from the translations
        url={canonicalUrl}
      />

      <main className="w-full h-[85vh] p-6 pt-12 text-white bg-gray-900">
        <section className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-4">{t('about.title')}</h1>

          <p className="text-lg leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('about.intro.welcome') }} />
          <p className="text-lg leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('about.intro.location') }} />

          <p className="text-lg leading-relaxed mb-4">
            {t('about.description')}
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-3 text-center">{t('about.whyChoose.heading')}</h2>
          <ul className="list-disc pl-6 text-lg leading-relaxed mb-4">
            {t('about.whyChoose.points', { returnObjects: true }).map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          <p className="text-xl font-semibold text-center text-blue-400 mt-6" dangerouslySetInnerHTML={{ __html: t('about.motto') }} />
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // load the 'common' namespace
    },
  };
}

