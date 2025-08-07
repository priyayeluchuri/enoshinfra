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

      <main className="w-full p-6 pt-12 text-white bg-gray-900 mb-20"> {/* Removed h-[85vh], added mb-20 */}
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

          <h2 className="text-3xl font-semibold mt-6 mb-3 text-center">Contact Us</h2>
          <div className="text-lg leading-relaxed mb-4">
            <p>Enosh Infra, Bangalore, Karnataka, India</p>
            <p>
              Phone:{' '}
              <a href="tel:+918073582033" className="text-blue-400 hover:underline">
                +91 80735 82033
              </a>
            </p>
            <p>
              WhatsApp:{' '}
              <a href="https://wa.me/918073582033" className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">
                +91 80735 82033
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:info@enoshinfra.com" className="text-blue-400 hover:underline">
                info@enoshinfra.com
              </a>
            </p>
            <p>
              Follow Us On:{' '}
              <a href="https://www.linkedin.com/company/enoshinfra" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>,{' '}
              <a href="https://www.instagram.com/enoshinfra" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>,{' '}
              <a href="https://x.com/enoshinfra" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </p>
          </div>

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
