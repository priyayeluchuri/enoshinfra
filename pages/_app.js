import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const supportedLocales = ['en', 'hi', 'kn', 'te', 'zh', 'ja', 'ru', 'fr', 'de'];

function MyApp({ Component, pageProps }) {
  const { locale, asPath, events } = useRouter();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  // Google Analytics page view tracking
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics ID is missing');
      return;
    }

    const handleRouteChange = (url) => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_location: `https://www.enoshinfra.com${url}`,
        page_language: locale, // Track the locale
      });
    };

    // Track initial page load
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: asPath,
      page_location: `https://www.enoshinfra.com${asPath}`,
      page_language: locale,
    });

    // Track route changes
    events.on('routeChangeComplete', handleRouteChange);

    // Cleanup event listener on unmount
    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events, asPath, locale]);

  return (
    <>
      <Head>
        <meta name="language" content={locale} />
        {supportedLocales.map((lng) => (
          <link
            key={lng}
            rel="alternate"
            hrefLang={lng}
            href={`https://www.enoshinfra.com/${lng}${asPath === '/' ? '' : asPath}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`https://www.enoshinfra.com${asPath}`} />
      </Head>

      {/* Google Analytics Script */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_language: '${locale}'
              });
            `}
          </Script>
        </>
      )}

      <Script id="set-lang" strategy="afterInteractive">
        {`document.documentElement.lang = "${locale}";`}
      </Script>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-16">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default appWithTranslation(MyApp);
