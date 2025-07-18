import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { i18n } from '../next-i18next.config'; // Import your i18n config

const SEO = ({
  pageKey = 'seo', // Key in your common.json (e.g., 'warehouse.seo', 'about.seo')
  // No need to pass 'locale' as a prop, useRouter provides it
  image = 'https://www.enoshinfra.com/fullfav.png', // Default image, updated to www
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locales, defaultLocale } = i18n; // Get locales and defaultLocale from your config

  const title = t(`${pageKey}.title`, 'Enosh Infra - Real Estate Consultancy');
  const description = t(
    `${pageKey}.description`,
    'Your trusted real estate consultancy for industrial, commercial, and residential properties.'
  );

  const baseUrl = 'https://www.enoshinfra.com'; // Your primary canonical domain with www and https

  // router.asPath gives the full URL path including locale prefix (e.g., '/', '/en', '/hi/about')
  const currentAsPath = router.asPath;

  // --- Canonical URL Construction ---
  // The canonical URL should always include the locale prefix, even for the default language.
  // Example:
  // - If currentAsPath is '/', and locale is 'en', canonicalUrl should be 'https://www.enoshinfra.com/en/'
  // - If currentAsPath is '/en/about', canonicalUrl should be 'https://www.enoshinfra.com/en/about'
  // - If currentAsPath is '/hi/contact', canonicalUrl should be 'https://www.enoshinfra.com/hi/contact'
  const canonicalUrl = `${baseUrl}${currentAsPath === '/' ? `/${router.locale}` : currentAsPath}`;

  // --- Hreflang Tags Construction ---
  const hreflangTags = locales.map((lang) => {
    // For each language, construct the path using its locale.
    // We need to transform the currentAsPath from the current locale to the target locale.
    let specificHreflangPath;

    if (currentAsPath === '/') {
      // If the current path is just '/', the hreflang path is simply '/{lang}'
      specificHreflangPath = `/${lang}`;
    } else {
      // For other paths, replace the current locale prefix with the target locale prefix.
      // E.g., if currentAsPath is '/en/about', for 'hi' it becomes '/hi/about'.
      // Note: router.locale will be the locale of the currently rendered page.
      specificHreflangPath = currentAsPath.replace(`/${router.locale}`, `/${lang}`);
    }

    return (
      <link
        key={lang}
        rel="alternate"
        hrefLang={lang}
        href={`${baseUrl}${specificHreflangPath}`}
      />
    );
  });

  // --- x-default Hreflang Tag Construction ---
  // The x-default tag should point to the default language version of the *current content*.
  // This is the URL that Google should show if no other specific language version is more appropriate.
  let xDefaultHreflangPath;
  if (currentAsPath === '/') {
    // If the current path is '/', the x-default points to the default locale's root (e.g., /en)
    xDefaultHreflangPath = `/${defaultLocale}`;
  } else {
    // For other paths, it points to the default locale's version of that path.
    // E.g., if currentAsPath is '/hi/contact', x-default points to '/en/contact'.
    xDefaultHreflangPath = currentAsPath.replace(`/${router.locale}`, `/${defaultLocale}`);
  }

  const xDefaultHreflang = (
    <link
      rel="alternate"
      hrefLang="x-default"
      href={`${baseUrl}${xDefaultHreflangPath}`}
    />
  );

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

      {/* Hreflang Tags for all alternate languages */}
      {hreflangTags}

      {/* x-default Hreflang Tag */}
      {xDefaultHreflang}

      {/* Schema Markup: Organization */}
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

      {/* Schema Markup: LocalBusiness */}
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
