import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const SEO = ({
  pageKey = 'seo', // Key in common.json (e.g., 'warehouse.seo', 'about.seo')
  locale, // Pass locale explicitly to construct URL
  image = 'https://www.enoshinfra.com/fullfav.png', // Updated to www
}) => {
  const { t } = useTranslation('common'); // Access common.json translations

  // Get title and description from common.json based on pageKey
  const title = t(`${pageKey}.title`, 'Enosh Infra - Real Estate Consultancy');
  const description = t(
    `${pageKey}.description`,
    'Your trusted real estate consultancy for industrial, commercial, and residential properties.'
  );

  // Construct locale-specific canonical URL
  const baseUrl = 'https://www.enoshinfra.com';
  const path = pageKey === 'seo' ? '' : pageKey.replace('.seo', '').replace('.', '/');
  const canonicalUrl = `${baseUrl}/${locale}/${path}`.replace(/\/$/, '');

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

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

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
