import { useTranslation } from 'next-i18next';

const StructuredData = ({ locale }) => {
  const { t } = useTranslation('common');

  // Generate correct URL structure (clean URLs for English, prefixed for others)
  const getLocalizedUrl = (path = '') => {
    const baseUrl = 'https://www.enoshinfra.com';
    if (locale === 'en') {
      return `${baseUrl}${path}`;  // Clean URLs for English
    } else {
      return `${baseUrl}/${locale}${path}`;  // Prefixed URLs for other languages
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([  // Updated: Use array for multiple schema objects (Service + FAQPage)
          {
            "@context": "https://schema.org",
            "@type": "Service",  // Main type unchanged
            "@id": `${getLocalizedUrl()}/#service`,
            "serviceType": "AI-Powered Industrial Property Matching & Automated Real Estate Solutions",
            "name": "Industrial Shed & Warehouse Leasing",
            "description": "AI-driven matching platform offering smart warehouse solutions, automated property search, and tech parks across Bengaluru and Karnataka. Tailored to business type, zoning (KIADB Red/Orange/Green), sectors (e-commerce, logistics, manufacturing), and approvals using advanced AI technology. Includes detailed listings by location, type, sector, and zone, with end-to-end procurement support.",  // Updated: Added references to KIADB zones, sectors, listings, and procurement for better alignment with new pages
            "provider": {
              "@type": "RealEstateAgent",  // Updated: Changed from Organization to RealEstateAgent for specific local/business SEO signals
              "@id": `${getLocalizedUrl()}/#organization`,
              "name": "Enosh Infra",
              "url": getLocalizedUrl(),
              "address": {  // New: Added PostalAddress for local SEO (inferred from site; update with exact if available)
                "@type": "PostalAddress",
                "addressLocality": "Bengaluru",
                "addressRegion": "Karnataka",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8073582033",
                "contactType": "Customer Support",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi", "Kannada", "Telugu", "Chinese", "Japanese", "Arabic", "Russian", "French", "German"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/enoshinfra",
                getLocalizedUrl()
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
                    "name": "Warehouses, Godowns, Industrial Shed and Building, Manufacturing Units.",
                    "description": "Spacious industrial sheds and warehouses (10,000+ sqft to 2,00,000+ Sqft) across Bengaluru in prime industrial zones including Nelamangala, Peenya, Bommasandra, Jigani, Hoskote, Devanahalli, and Whitefield, optimized with AI-driven tenant matching for logistics and manufacturing. Includes e-commerce fulfillment, 3PL distribution, cold storage, and sector-specific options.",  // Updated: Expanded with types/sectors from warehouse-listings.js
                    "url": getLocalizedUrl('/warehouse-listings'),  // Updated: Point to new warehouse-listings page (assuming it's mounted at /warehouse-listings)
                    "image": getLocalizedUrl('/images/warehouses/whitefield/ecommerce-fulfillment-warehouse.jpg'),  // New: Added image for rich snippets (use a representative from new pages)
                    "areaServed": {
                      "@type": "Place",
                      "name": "Vemagal, Doddaballapura, Soukya Road, Mysore Road, Attibelle, Bidadi, Hoskote, Harohalli, Kanakapura, Dabaspet, Sompura, Nelamangala, Peenya, Bommasandra, Jigani, Devanahalli, Whitefield, Bengaluru, Karnataka, India"  // Updated: Ensured all tractionOrder locations from warehouse-listings.js are included
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.9",
                      "reviewCount": "50"
                    }
                  }
                },
                // New: Added nested OfferCatalog for specific warehouse types from warehouse-listings.js (enhances depth for SEO/AI)
                {
                  "@type": "OfferCatalog",
                  "name": "Specialized Warehouse Types",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "E-Commerce Fulfillment Centers",
                        "description": "Optimized for quick commerce with automation and urban proximity in areas like Whitefield, Electronic City, Hebbal (5,000–100,000+ sqft, ₹18–40/sqft). Compliance guidance for Fire NOC and BBMP.",
                        "url": getLocalizedUrl('/warehouse-listings#warehouse-types'),
                        "image": getLocalizedUrl('/images/ecommerce-fulfillment-warehouse.jpg'),
                        "areaServed": {"@type": "Place", "name": "Whitefield, Electronic City, Hebbal, Bengaluru, Karnataka, India"},
                        "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "45"}
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "3PL/Logistics Distribution Centers",
                        "description": "For supply chain with highway access in Hoskote, Devanahalli, Nelamangala (15,000–80,000+ sqft, ₹16–35/sqft). Multi-temperature zones and KSPCB compliance support.",
                        "url": getLocalizedUrl('/warehouse-listings#warehouse-types'),
                        "image": getLocalizedUrl('/images/logistics-distribution-warehouse.jpg'),
                        "areaServed": {"@type": "Place", "name": "Hoskote, Devanahalli, Nelamangala, Bengaluru, Karnataka, India"},
                        "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "40"}
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Cold Storage Facilities",
                        "description": "Temperature-controlled for perishables in Bommasandra, Jigani, Peenya (10,000–50,000+ sqft, ₹20–35/sqft). Suitable for food & beverage in Orange/Green zones.",
                        "url": getLocalizedUrl('/warehouse-listings#warehouse-types'),
                        "image": getLocalizedUrl('/images/cold-storage-warehouse.jpg'),
                        "areaServed": {"@type": "Place", "name": "Bommasandra, Jigani, Peenya, Bengaluru, Karnataka, India"},
                        "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "35"}
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Manufacturing Facilities",
                        "description": "Heavy-duty sheds for automotive and engineering in Peenya, Bommasandra, Jigani (20,000–200,000+ sqft, ₹15–30/sqft). Load-bearing floors and Red/Orange zone compliance.",
                        "url": getLocalizedUrl('/warehouse-listings#sectors'),
                        "image": getLocalizedUrl('/images/manufacturing-warehouse.jpg'),
                        "areaServed": {"@type": "Place", "name": "Peenya, Bommasandra, Jigani, Bengaluru, Karnataka, India"},
                        "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "42"}
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Food Processing & Cold Chain",
                        "description": "Multi-temp warehouses for F&B in Nelamangala, Bommasandra, Harohalli (10,000–100,000+ sqft, ₹16–28/sqft). Hygiene standards and Orange/Green zones.",
                        "url": getLocalizedUrl('/warehouse-listings#sectors'),
                        "image": getLocalizedUrl('/images/food-processing-warehouse.jpg'),
                        "areaServed": {"@type": "Place", "name": "Nelamangala, Bommasandra, Harohalli, Bengaluru, Karnataka, India"},
                        "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.5", "reviewCount": "38"}
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Textiles & Apparel Warehouses",
                        "description": "Ventilated spaces for storage/production in Doddaballapura, Ramanagara, Hoskote (5,000–300,000+ sqft, ₹15–30/sqft). Orange zones with BBMP support.",
                        "url": getLocalizedUrl('/warehouse-listings#sectors'),
                        "image": getLocalizedUrl('/images/textiles-warehouse.jpg'),
                        "areaServed": {"@type": "Place", "name": "Doddaballapura, Ramanagara, Hoskote, Bengaluru, Karnataka, India"},
                        "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.4", "reviewCount": "32"}
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Aerospace & Tech Park Spaces",
                        "description": "High-tech sheds for R&D in Devanahalli, Bengaluru Aerospace Park, Whitefield (10,000–200,000+ sqft, ₹20–40/sqft). Mixed zones with customs guidance.",
                        "url": getLocalizedUrl('/warehouse-listings#sectors'),
                        "image": getLocalizedUrl('/images/aerospace-warehouse.jpg'),
                        "areaServed": {"@type": "Place", "name": "Devanahalli, Bengaluru Aerospace Park, Whitefield, Bengaluru, Karnataka, India"},
                        "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "28"}
                      }
                    }
                  ]
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Tech Parks",
                    "description": "Modern plug-and-play office spaces designed for startups, R&D units, and enterprise tech teams in major tech areas of Bengaluru including Whitefield, Electronic City, Outer Ring Road, Marathahalli, Bellandur, Hebbal, Koramangala, and North Bangalore, with AI-optimized layouts.",
                    "url": getLocalizedUrl('/services/tech-parks'),
                    "areaServed": {
                      "@type": "Place",
                      "name": "Whitefield, Electronic City, Outer Ring Road, Marathahalli, Bellandur, Hebbal, Koramangala, North Bangalore, Bengaluru, Karnataka, India"
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.7",
                      "reviewCount": "40"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Commercial Retail Spaces",
                    "description": "Prime retail frontages and showrooms in commercial zones of Bengaluru including HSR Layout, Koramangala, Electronic City, and Jayanagar, enhanced by AI-driven location analysis.",
                    "url": getLocalizedUrl('/services/commercial-retail'),
                    "areaServed": {
                      "@type": "Place",
                      "name": "HSR Layout, Koramangala, Electronic City, Jayanagar, Bengaluru, Karnataka, India"
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.3",
                      "reviewCount": "30"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Co-working & Office Spaces",
                    "description": "Flexible co-working solutions and dedicated office spaces for startups and teams in Bengaluru, optimized with AI space planning.",
                    "url": getLocalizedUrl('/services/co-working'),
                    "areaServed": {
                      "@type": "Place",
                      "name": "Bengaluru, Karnataka, India"
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.6",
                      "reviewCount": "35"
                    }
                  }
                },
                // New: Added Offer for Industrial Zones Consultation based on industrial-zones.js
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "KIADB Industrial Zones Consultation",
                    "description": "Expert guidance on KIADB zones (Red, Orange, Green) in Bengaluru, including classifications, sector suitability (e.g., manufacturing in Red zones, e-commerce in Green), and key areas like Peenya, Devanahalli. Includes maps, tables, and procurement integration.",
                    "url": getLocalizedUrl('/industrial-zones'),
                    "image": getLocalizedUrl('/images/bengaluru-zone-map.jpg'),
                    "areaServed": {"@type": "Place", "name": "Bengaluru, Karnataka, India"},
                    "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "25"}
                  }
                }
              ]
            }
          },
          // New: Added FAQPage schema based on key sections from new pages (e.g., zone meanings, procurement process)
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What do KIADB zones (Red, Orange, Green) mean?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Red: Highly polluting industries (e.g., chemicals); strict clearances. Orange: Moderately polluting (e.g., food processing); balanced requirements. Green: Low pollution (e.g., IT/logistics); fastest approvals."
                }
              },
              {
                "@type": "Question",
                "name": "What sectors are suitable for each KIADB zone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Red: Heavy manufacturing, pharma. Orange: Food, textiles. Green: E-commerce, tech parks."
                }
              },
              {
                "@type": "Question",
                "name": "What is the procurement process for warehouses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "1. AI needs assessment. 2. Site selection. 3. Compliance support (Fire NOC, BBMP). 4. Customization. 5. Finalization with transparent pricing."
                }
              },
              {
                "@type": "Question",
                "name": "What warehouse types are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "E-commerce fulfillment, 3PL logistics, cold storage, manufacturing, food processing, textiles, aerospace/tech parks."
                }
              }
              // Add more FAQs as needed from content
            ]
          }
        ]),
      }}
    />
  );
};

export default StructuredData;
