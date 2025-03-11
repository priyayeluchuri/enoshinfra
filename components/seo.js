import Head from 'next/head';

const SEO = ({
  title = "Enosh Infra - Real Estate Consultancy",
  description = "Your trusted real estate consultancy for industrial, commercial, and residential properties.",
  url = "https://www.enoshinfra.com",
  image = "https://www.enoshinfra.com/favicon.png", // Replace with your actual image URL
}) => (
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
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    
    {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Schema Markup */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Enosh Infra",
            "url": "https://enoshinfra.com",
            "logo": "https://enoshinfra.com/logo.png",
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
            "description": "Enosh Infra is a leading real estate consultancy in Bengaluru, India, specializing in commercial, industrial, and residential property solutions."
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
            "url": "https://enoshinfra.com",
	    "description": "Trusted property consultants in Bengaluru, offering tailored solutions for industrial, commercial, and residential spaces."
          }
        `}
      </script>
  </Head>
);

export default SEO;

