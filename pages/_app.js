import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/seo';
import WhatsAppButton from '../components/WhatsAppbutton';

const supportedLocales = ['en', 'hi', 'kn', 'zh']; // match next-i18next config

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

      {/* ✅ Script to set <html lang="..."> properly using next/script */}
      <Script id="set-lang" strategy="afterInteractive">
        {`document.documentElement.lang = "${locale}";`}
      </Script>

      <div className="flex flex-col min-h-screen">
        <SEO
          title="Enosh Infra - Rent or Lease Industrial Spaces, co working spaces, tech parks, commercial and retail spaces in Bengaluru"
          description="Connect with Enosh Infra to rent out your industrial, commercial, godowns and warehouse spaces or find the perfect property in Bengaluru's prime industrial hubs like Nelamangala, Peenya, Bommasandra, Jigani, Hoskote, Kumbalgodu, Doddaballapura, Hebbal, Whitefield, HSR and KIADB industrial areas."
          url="https://www.enoshinfra.com"
        />
        <Navbar />
        <main className="flex-grow mt-16">
          <Component {...pageProps} />
          <WhatsAppButton />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default appWithTranslation(MyApp);

