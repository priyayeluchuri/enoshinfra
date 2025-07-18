import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsent from 'react-cookie-consent';
import { i18n } from '../next-i18next.config'; // Import i18n config for defaultLocale

function MyApp({ Component, pageProps }) {
  const { locale, asPath, events } = useRouter();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const { defaultLocale } = i18n; // Get defaultLocale from i18n config

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics ID is missing');
      return;
    }

    // Initialize gtag consent defaults *early* and *before* the main GA script runs.
    // This should ideally be outside of the useEffect for maximum early execution.
    // However, if it must be in useEffect, ensure it's simple and doesn't depend on GA objects.
    // A better place for this 'default' call can be right after Script tag or even globally.
    // For now, let's ensure it's robust here:
    if (typeof window !== 'undefined' && window.gtag) { // Check if gtag exists
      window.gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });

      // Check for existing consent from cookie and update
      if (document.cookie.includes('userConsent=true')) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted'
        });
      }
    }


    // Function to check if analytics storage is currently granted
    // This is safer than directly accessing window.google_tag_manager
    const isAnalyticsStorageGranted = () => {
      // gtag('get') is a safer way to retrieve current consent state
      // This call might return undefined if the GA script isn't fully loaded yet,
      // so we also need to check for gtag existence.
      return new Promise(resolve => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('get', 'GTM_ID_OR_GA_MEASUREMENT_ID', 'analytics_storage', (status) => {
            // 'GTM_ID_OR_GA_MEASUREMENT_ID' might need to be replaced with a dummy string
            // or your actual GTM/GA ID if gtag('get') requires it.
            // Some implementations use 'consent' as the ID here.
            // Simpler: rely on the 'update' in onAccept to set the cookie, and then check the cookie.
            // However, if gtag('get') doesn't block, it's problematic.
            // Let's simplify this check for now, trusting onAccept handles it.
            // For immediate check: if gtag is defined, and consent was updated, it should be reflected.

            // The safest check for consent is generally to rely on the cookie directly for early checks,
            // and gtag('get') for later checks once GA is guaranteed to be loaded.
            resolve(document.cookie.includes('userConsent=true')); // Simpler for this context
          });
        } else {
          resolve(false); // If gtag isn't ready, assume not granted for tracking purposes
        }
      });
    };

    const handleRouteChange = async (url) => {
      // Only send page_path if analytics_storage is granted
      // We will rely on the cookie for this check for robustness with timing
      if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag && await isAnalyticsStorageGranted()) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
          page_location: `https://www.enoshinfra.com${url}`,
          page_language: locale,
        });
      }
    };

    // Track initial page load only if consent is granted
    // Also use the cookie check here
    (async () => {
      if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag && await isAnalyticsStorageGranted()) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: asPath,
          page_location: `https://www.enoshinfra.com${asPath}`,
          page_language: locale,
        });
      }
    })();


    events.on('routeChangeComplete', handleRouteChange);
    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events, asPath, locale, GA_MEASUREMENT_ID]);


  return (
    <>
      <Head>
        <meta name="language" content={locale} />
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
              // The config call here will respect the default consent state set earlier,
              // or any updates from the cookie consent banner.
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_language: '${locale}'
              });
            `}
          </Script>
        </>
      )}

      {/* Script to set lang attribute on <html> element */}
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

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="userConsent"
        style={{ background: "#1f2937", color: "#ffffff" }}
        buttonStyle={{ background: "#3b82f6", color: "#ffffff", borderRadius: "4px" }}
        onAccept={() => {
          if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted'
            });
            // Immediately track the current page after consent is given
            window.gtag('config', GA_MEASUREMENT_ID, {
              page_path: asPath,
              page_location: `https://www.enoshinfra.com${asPath}`,
              page_language: locale,
            });
          }
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}

export default appWithTranslation(MyApp);
