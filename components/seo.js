import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'; // Import useRouter to get the current path
import { i18n } from '../next-i18next.config'; // Import your i18n config

const SEO = ({
  pageKey = 'seo', // Key in common.json (e.g., 'warehouse.seo', 'about.seo')
  locale, // Pass locale explicitly to construct URL
  image = 'https://www.enoshinfra.com/fullfav.png', // Updated to www
}) => {
  const { t } = useTranslation('common');
  const router = useRouter(); // Initialize router
  const { locales, defaultLocale } = i18n; // Get locales and defaultLocale from your config

  const title = t(`${pageKey}.title`, 'Enosh Infra - Real Estate Consultancy');
  const description = t(
    `${pageKey}.description`,
    'Your trusted real estate consultancy for industrial, commercial, and residential properties.'
  );

  const baseUrl = 'https://www.enoshinfra.com';

  // Determine the base path of the page *without* the locale prefix.
  // For example, if current path is '/en/about', this should be '/about'.
  // If current path is '/en', this should be '/'.
  let pagePath = router.pathname;
  if (pagePath === '/') {
      pagePath = '/'; // Ensure homepage is just '/'
  } else {
      // Remove the locale prefix from the router.pathname
      // Example: /en/about -> /about
      // This is safer than relying on pageKey for more complex routes.
      const localePrefix = `/${locale}`;
      if (pagePath.startsWith(localePrefix)) {
          pagePath = pagePath.substring(localePrefix.length);
          if (pagePath === '') { // If it was just '/en', make it '/'
              pagePath = '/';
          }
      }
  }

  // Construct the canonical URL for the *current* locale
  // Handle the root path specifically to avoid double slashes like /en//
  const canonicalUrl = `${baseUrl}/${locale}${pagePath === '/' ? '' : pagePath}`;


  return (
    <Head>
      {/* Primary Meta Tags */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL for the current page and locale */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags (NEW ADDITION) */}
      {locales.map((lang) => {
        // Construct the URL for each locale
        const hreflangUrl = `${baseUrl}/${lang}${pagePath === '/' ? '' : pagePath}`;
        return (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={hreflangUrl}
          />
        );
      })}

      {/* x-default Hreflang Tag (NEW ADDITION) */}
      {defaultLocale && ( // Ensure defaultLocale is defined
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${baseUrl}/${defaultLocale}${pagePath === '/' ? '' : pagePath}`}
        />
      )}

      {/* Schema Markup */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Enosh Infra",
            "url": "https://www.enoshinfra.com",
            "logo": "https://www.enoshinfra.com/logo.png",
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+918073582033",
              "contactType": "Customer Service"
            }],
            "sameAs": [
              "https://www.facebook.com/enoshinfra",
              "https://www.instagram.com/enoshinfra",
              "https://wa.me/918073582033"
            ],
            "description": "${description}"
          }
        `}
      </script>

      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Enosh Infra",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "#193, The Lakeview Address, E-City",
              "addressLocality": "Bengaluru",
              "addressRegion": "KA",
              "postalCode": "560001",
              "addressCountry": "IN"
            },
            "telephone": "+918073582033",
            "openingHours": "Mo-Fr 09:00-18:00",
            "url": "https://www.enoshinfra.com",
            "description": "${description}"
          }
        `}
      </script>
    </Head>
  );
};

export default SEO;
