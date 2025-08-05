import { useTranslation } from 'next-i18next';

const StructuredData = ({ locale }) => {
  const { t } = useTranslation('common');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `https://www.enoshinfra.com/${locale}/#service`,
          "serviceType": "AI-Powered Industrial Property Matching & Automated Real Estate Solutions",
          "name": "Industrial Shed & Warehouse Leasing",
          "description": "AI-driven matching platform offering smart warehouse solutions, automated property search, and tech parks across Bengaluru and Karnataka, tailored to business type, zoning, and approvals using advanced AI technology.",
          "provider": {
            "@type": "Organization",
            "@id": `https://www.enoshinfra.com/${locale}/#organization`,
            "name": "Enosh Infra",
            "url": `https://www.enoshinfra.com/${locale}`,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8073582033",
              "contactType": "Customer Support",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi", "Kannada", "Telugu", "Chinese", "Japanese", "Arabic", "Russian", "French", "German"]
            },
            "sameAs": [
              "https://www.linkedin.com/company/enoshinfra",
              `https://www.enoshinfra.com/${locale}`
            ]
          },
          "areaServed": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bengaluru",
              "addressRegion": "Karnataka",
              "addressCountry": "IN"
            }
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Space Leasing Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Mid-size Industrial Warehouses (10,000–50,000 sq ft)",
                  "description": "AI-powered space matching for mid-sized warehouses and industrial sheds in prime industrial areas such as Peenya, Bommasandra, Jigani, Attibele, Harohalli, Kumbalagodu, Whitefield, Electronic City, Rajajinagar, and Hoskote, supporting industries like manufacturing and logistics.",
                  "url": `https://www.enoshinfra.com/${locale}/services/warehouses`,
                  "areaServed": {
                    "@type": "Place",
                    "name": "Peenya, Bommasandra, Jigani, Attibele, Harohalli, Kumbalagodu, Whitefield, Electronic City, Rajajinagar, Hoskote, Bengaluru, Karnataka, India"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Large Industrial Warehouses (50,000+ sq ft)",
                  "description": "AI-powered matching for large-scale industrial sheds and warehouses above 50,000 sq ft in Bengaluru’s industrial areas including Peenya, Bommasandra, Jigani, Attibele, Harohalli, Kumbalagodu, Whitefield, Electronic City, Rajajinagar, and Hoskote, catering to manufacturing and logistics industries.",
                  "url": `https://www.enoshinfra.com/${locale}/services/warehouses`,
                  "areaServed": {
                    "@type": "Place",
                    "name": "Peenya, Bommasandra, Jigani, Attibele, Harohalli, Kumbalagodu, Whitefield, Electronic City, Rajajinagar, Hoskote, Bengaluru, Karnataka, India"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Tech Parks",
                  "description": "Modern plug-and-play office spaces designed for startups, R&D units, and enterprise tech teams in major tech areas of Bengaluru including Whitefield, Electronic City, Outer Ring Road, Marathahalli, Bellandur, Hebbal, Koramangala, and North Bangalore, with AI-optimized layouts.",
                  "url": `https://www.enoshinfra.com/${locale}/services/tech-parks`,
                  "areaServed": {
                    "@type": "Place",
                    "name": "Whitefield, Electronic City, Outer Ring Road, Marathahalli, Bellandur, Hebbal, Koramangala, North Bangalore, Bengaluru, Karnataka, India"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Commercial Retail Spaces",
                  "description": "Prime retail frontages and showrooms in commercial zones of Bengaluru including HSR Layout, Koramangala, Electronic City, and Jayanagar, enhanced by AI-driven location analysis.",
                  "url": `https://www.enoshinfra.com/${locale}/services/commercial-retail`,
                  "areaServed": {
                    "@type": "Place",
                    "name": "HSR Layout, Koramangala, Electronic City, Jayanagar, Bengaluru, Karnataka, India"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Co-working & Office Spaces",
                  "description": "Flexible co-working solutions and dedicated office spaces for startups and teams in Bengaluru, optimized with AI space planning.",
                  "url": `https://www.enoshinfra.com/${locale}/services/co-working`,
                  "areaServed": {
                    "@type": "Place",
                    "name": "Bengaluru, Karnataka, India"
                  }
                }
              }
            ]
          }
        }),
      }}
    />
  );
};

export default StructuredData;
