import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { i18n } from '../next-i18next.config';

const SEO = ({
  pageKey = 'seo',
  image = 'https://www.enoshinfra.com/fullfav.png',
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locales, defaultLocale } = i18n;

  // Pages that should only exist in English
  const englishOnlyPages = ['/warehouses-for-rent'];
  const isEnglishOnlyPage = englishOnlyPages.includes(router.pathname);

  // Dynamic pageKey fallback for warehouses
  const effectivePageKey = router.pathname.includes('/warehouses') || router.pathname.includes('/services/warehouses') 
    ? 'warehouses.seo' 
    : router.pathname.includes('/blogs') 
      ? 'blogsPartners.seo' 
       : router.pathname.includes('/contact')
        ? 'seo'
        : pageKey;

  const title = t(`${effectivePageKey}.title`, {
    default: 'Enosh Infra - Warehouses for Rent in Bangalore',
    en: 'Enosh Infra - Warehouses for Rent in Bangalore',
    hi: 'एनोश इंफ्रा - बेंगलुरु में गोदाम किराए पर',
  });
  
  const description = t(`${effectivePageKey}.description`, {
    default: 'Discover large warehouses (>10,000 sqft) for rent in Bangalore with Enosh Infra’s AI-driven matching.',
    en: 'Discover large warehouses (>10,000 sqft), Godowns, Industrial Shed and Building, Manufacturing Units for rent/lease/sale in Bangalore with Enosh Infra’s AI-driven matching.',
    hi: 'एनोश इंफ्रा के AI-संचालित मिलान के साथ बेंगलुरु में बड़े गोदाम (>10,000 वर्ग फीट) किराए पर लें।',
  });

  const baseUrl = 'https://www.enoshinfra.com';
  const currentAsPath = router.asPath;

  // For English-only pages, always use clean URL without locale prefix
  const canonicalUrl = isEnglishOnlyPage 
    ? `${baseUrl}${currentAsPath}` 
    : router.locale === 'en' 
      ? `${baseUrl}${currentAsPath}` 
      : `${baseUrl}${currentAsPath.startsWith('/' + router.locale) ? currentAsPath : `/${router.locale}${currentAsPath}`}`;

  // Hreflang logic - for English-only pages, only generate English hreflang
  const hreflangTags = isEnglishOnlyPage 
    ? [
        <link
          key="en"
          rel="alternate"
          hrefLang="en"
          href={`${baseUrl}${currentAsPath}`}
        />
      ]
    : locales.map((lang) => {
        let specificHreflangPath;
        
        if (lang === 'en') {
          // For English, use clean URLs (remove any locale prefix)
          if (currentAsPath === '/') {
            specificHreflangPath = '';
          } else if (currentAsPath.startsWith('/en/')) {
            // Remove /en/ prefix if it exists
            specificHreflangPath = currentAsPath.replace('/en', '') || '/';
          } else {
            // Already clean URL
            specificHreflangPath = currentAsPath;
          }
        } else {
          // For other languages, add the language prefix
          if (currentAsPath === '/') {
            specificHreflangPath = `/${lang}`;
          } else if (currentAsPath.startsWith(`/${router.locale}/`)) {
            // Replace current locale with target locale
            specificHreflangPath = currentAsPath.replace(`/${router.locale}`, `/${lang}`);
          } else {
            // Add language prefix to clean URL
            specificHreflangPath = `/${lang}${currentAsPath}`;
          }
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

  // X-default hreflang - for English-only pages, point to the English version
  const xDefaultHref = isEnglishOnlyPage 
    ? `${baseUrl}${currentAsPath}`
    : `${baseUrl}${currentAsPath === '/' ? '' : currentAsPath.replace(new RegExp(`^\/${router.locale}`), '')}`;

  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={t(`${effectivePageKey}.keywords`, 'warehouse for rent, Bangalore warehouses, industrial sheds, large warehouse lease')} />

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

      <link rel="canonical" href={canonicalUrl} />
  
      {/* Hreflang tags */}
      {hreflangTags}
  
      {/* x-default hreflang */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={xDefaultHref}
      />

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
