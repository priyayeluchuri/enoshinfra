import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const supportedLocales = ['en', 'hi', 'kn', 'te', 'zh', 'ja', 'ru', 'fr', 'de'];

function MyApp({ Component, pageProps }) {
  const { locale, asPath } = useRouter();

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
