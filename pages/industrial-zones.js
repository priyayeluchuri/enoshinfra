import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/seo';
import Link from 'next/link';
import common from '../locales/en/common.json'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faWhatsapp } from '@fortawesome/free-solid-svg-icons';

export default function IndustrialZones() {
  const { t } = useTranslation('common');

  // CTA Buttons Component
  const CTAButtons = () => (
    <div className="flex space-x-4 justify-center">
      <Link href="/contact" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact Form
      </Link>
      <a href="tel:+918073582033" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call Us
      </a>
      <a href="https://wa.me/918073582033" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> WhatsApp
      </a>
    </div>
  );

  // Consolidated areas: KIADB + Generic from site (e.g., Mysore Road, Vemagal, Soukya Road, etc.)
  const allAreas = [
    // KIADB-Specific
    { type: 'KIADB', name: 'Whitefield', categories: 'Green', size: 'N/A', features: 'IT/e-commerce focused, urban connectivity.', sectors: 'E-commerce, Logistics' },
    { type: 'KIADB', name: 'Electronic City', categories: 'Green', size: '2,000+', features: 'Tech parks, electronics.', sectors: 'IT, Assembly' },
    { type: 'KIADB', name: 'Devanahalli', categories: 'Red, Orange, Green', size: '1,000+', features: 'Airport proximity, aerospace.', sectors: 'Pharma, Manufacturing' },
    { type: 'KIADB', name: 'Hebbal', categories: 'Green', size: 'N/A', features: 'Airport access, logistics.', sectors: 'E-commerce' },
    { type: 'KIADB', name: 'Bommasandra', categories: 'Red, Orange, Green', size: '2,000+', features: 'Electronics, auto; Hosur Road.', sectors: 'Manufacturing, Food' },
    { type: 'KIADB', name: 'Hoskote', categories: 'Red, Orange, Green', size: '1,500+', features: 'Logistics, apparel.', sectors: 'Textiles, Logistics' },
    { type: 'KIADB', name: 'Peenya', categories: 'Red, Orange, Green', size: '4,000+', features: 'Asia’s largest hub, engineering.', sectors: 'Heavy Manufacturing' },
    { type: 'KIADB', name: 'Jigani', categories: 'Red, Orange, Green', size: '2,000+', features: 'Mixed industrial.', sectors: 'Pharma, Textiles' },
    { type: 'KIADB', name: 'Doddaballapura', categories: 'Red, Orange, Green', size: '1,000+', features: 'Textiles, aerospace.', sectors: 'Apparel, Aerospace' },
    { type: 'KIADB', name: 'Nelamangala', categories: 'Red, Orange, Green', size: '2,500+', features: 'Warehousing, food processing.', sectors: 'Logistics, Food' },
    { type: 'KIADB', name: 'Attibele', categories: 'Orange, Green', size: '500+', features: 'Light industry.', sectors: 'Assembly' },
    { type: 'KIADB', name: 'Bengaluru Aerospace Park', categories: 'Red, Orange, Green', size: 'N/A', features: 'Aerospace focused.', sectors: 'Aerospace' },
    { type: 'KIADB', name: 'Bengaluru Hardware Park', categories: 'Red, Orange, Green', size: 'N/A', features: 'Hardware manufacturing.', sectors: 'Electronics' },
    { type: 'KIADB', name: 'Bengaluru IT Park', categories: 'Green', size: 'N/A', features: 'IT/tech.', sectors: 'IT, E-commerce' },
    { type: 'KIADB', name: 'Dabaspet', categories: 'Red, Orange, Green', size: 'N/A', features: 'General industrial.', sectors: 'Manufacturing' },
    { type: 'KIADB', name: 'Doddaballapura General', categories: 'Red, Orange, Green', size: 'N/A', features: 'Mixed.', sectors: 'General' },
    { type: 'KIADB', name: 'Doddaballapura Industrial Area', categories: 'Red, Orange, Green', size: 'N/A', features: 'Industrial.', sectors: 'Manufacturing' },
    { type: 'KIADB', name: 'Dyavasandra', categories: 'Orange, Green', size: 'N/A', features: 'Light.', sectors: 'Assembly' },
    { type: 'KIADB', name: 'Iggalur', categories: 'Orange, Green', size: 'N/A', features: 'Rural industrial.', sectors: 'Food' },
    { type: 'KIADB', name: 'Kadugodi', categories: 'Green', size: 'N/A', features: 'Tech proximity.', sectors: 'Logistics' },
    { type: 'KIADB', name: 'Kolar', categories: 'Red, Orange, Green', size: 'N/A', features: 'Mixed.', sectors: 'General' },
    { type: 'KIADB', name: 'Kumbalagodu', categories: 'Orange, Green', size: 'N/A', features: 'Leather/processing.', sectors: 'Textiles' },
    { type: 'KIADB', name: 'Mandya', categories: 'Red, Orange, Green', size: 'N/A', features: 'Agri-industrial.', sectors: 'Food' },
    { type: 'KIADB', name: 'Ramanagara', categories: 'Red, Orange, Green', size: 'N/A', features: 'Silk/textiles.', sectors: 'Apparel' },
    { type: 'KIADB', name: 'Sadaramangala', categories: 'Green', size: 'N/A', features: 'IT adjacent.', sectors: 'E-commerce' },
    { type: 'KIADB', name: 'Sompura', categories: 'Red, Orange, Green', size: 'N/A', features: 'General.', sectors: 'Manufacturing' },
    { type: 'KIADB', name: 'Veersandra Industrial Area', categories: 'Orange, Green', size: 'N/A', features: 'Light industrial.', sectors: 'Assembly' },

    // Generic locations from enoshinfra.com (added based on site mentions like Vemagal, Soukya Road, Mysore Road, etc.)
    { type: 'Generic', name: 'Vemagal', categories: 'Red, Orange, Green', size: 'N/A', features: 'Rural industrial with good highway access.', sectors: 'Manufacturing' },
    { type: 'Generic', name: 'Soukya Road', categories: 'Green', size: 'N/A', features: 'Logistics corridor near Hoskote.', sectors: 'Logistics, E-commerce' },
    { type: 'Generic', name: 'Mysore Road', categories: 'Orange, Green', size: 'N/A', features: 'Highway corridor for logistics and manufacturing access.', sectors: 'Logistics, Assembly' },
    { type: 'Generic', name: 'Bidadi', categories: 'Red, Orange', size: 'N/A', features: 'Industrial township with Toyota Kirloskar hub.', sectors: 'Automotive, Manufacturing' },
    { type: 'Generic', name: 'Harohalli', categories: 'Orange, Green', size: 'N/A', features: 'KIADB phase with food processing focus.', sectors: 'Food & Beverage' },
    { type: 'Generic', name: 'Kanakapura', categories: 'Green', size: 'N/A', features: 'Eco-friendly zone for light industries.', sectors: 'Textiles, Assembly' },
    { type: 'Generic', name: 'North Bengaluru', categories: 'Green', size: 'N/A', features: 'IT tech parks for multinational corporations.', sectors: 'IT, E-commerce' },
    { type: 'Generic', name: 'Bengaluru', categories: 'Mixed', size: 'N/A', features: 'Affordable industrial/commercial spaces across hubs.', sectors: 'General' },
    // Add more if needed from site
  ];

  return (
    <>
      <SEO pageKey="industrial-zones.seo" /> {/* Customize in seo.js if needed */}
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">Understanding KIADB Industrial Zones in Bengaluru: Classifications, Differences, and Sector Suitability</h1>
          
          {/* Jump Menu */}
          <nav className="flex flex-wrap justify-center mb-8 space-x-4 text-blue-500">
            <a href="#introduction" className="hover:text-blue-300">Introduction</a>
            <a href="#zone-meanings" className="hover:text-blue-300">Zone Meanings</a>
            <a href="#suitable-sectors" className="hover:text-blue-300">Suitable Sectors</a>
            <a href="#key-areas" className="hover:text-blue-300">Key Areas</a>
            <a href="/warehouse-listings/#procurement" className="hover:text-blue-300">Procurement Process</a>
          </nav>
          
          {/* Section 1: Introduction */}
          <section id="introduction" className="mb-8">
            <p className="text-lg mb-6 leading-relaxed">Navigating Bengaluru’s industrial landscape? KIADB manages over 170 industrial areas across Karnataka, including hotspots around Bengaluru like Peenya and Bommasandra. Zones are classified by pollution potential (Red, Orange, Green) to ensure environmental compliance. At Enosh Infra, we use AI to match your warehouse needs to the right zone, streamlining procurement. Explore below for explanations, differences, suitable sectors, and our tailored processes.</p>
            {/* Placeholder for infographic map */}
            <img src="/images/bengaluru-zone-map.jpg" alt="Infographic map of KIADB zones in Bengaluru" className="w-full mb-4" />
            <div className="text-center">
              <Link href="/warehouse-listings" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">Check available warehouses</Link>
            </div>
          </section>

          {/* Section 2: What Do the Zones Mean? (Table) */}
          <section id="zone-meanings" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Do the Zones Mean?</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-white">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">Zone</th>
                    <th className="border px-4 py-2 text-left">Meaning</th>
                    <th className="border px-4 py-2 text-left">Key Differences</th>
                    <th className="border px-4 py-2 text-left">Restrictions/Requirements</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Red</td>
                    <td className="border px-4 py-2">Highly polluting industries with significant environmental impact (e.g., air/water emissions).</td>
                    <td className="border px-4 py-2">Strictest clearances; longer timelines (6-12 months); higher fees (e.g., ₹50,000-2 lakh); mandatory EIA.</td>
                    <td className="border px-4 py-2">Cannot operate without KSPCB consent; higher monitoring; restricted near residential/eco-sensitive areas.</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Orange</td>
                    <td className="border px-4 py-2">Moderately polluting; balanced impact.</td>
                    <td className="border px-4 py-2">Moderate scrutiny; 3-6 months for approvals; fees ₹20,000-1 lakh.</td>
                    <td className="border px-4 py-2">Effluent treatment needed; common in mixed areas.</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Green</td>
                    <td className="border px-4 py-2">Low or negligible pollution; clean operations.</td>
                    <td className="border px-4 py-2">Fastest approvals (1-3 months); minimal fees (₹10,000-50,000); no EIA for most.</td>
                    <td className="border px-4 py-2">Encouraged in all areas; simple consents.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-gray-300">The main difference? Red zones prioritize heavy industry but demand robust compliance—think chemical plants vs. Green’s assembly lines. This affects your warehouse choice: Red for manufacturing might mean higher setup costs but larger spaces; Green for e-commerce ensures quicker launches.</p>
          </section>

          {/* Section 3: Suitable Sectors */}
          <section id="suitable-sectors" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Suitable Sectors for Each Zone</h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-300">
              <li><strong>Red Zones:</strong> Heavy manufacturing (e.g., chemicals, pharmaceuticals, cement, automotive parts). Suitable for sectors like Aerospace (e.g., Bengaluru Aerospace SEZ) or Petrochemicals. Why? Handles high emissions but requires advanced pollution controls.</li>
              <li><strong>Orange Zones:</strong> Food & beverage processing, textiles, plastics, medium engineering. Ideal for Apparel (e.g., Doddaballapura Apparel Park) or Electronics assembly. Balance: Moderate impact with operational flexibility.</li>
              <li><strong>Green Zones:</strong> IT/Tech parks, e-commerce logistics (Blinkit/Zepto), biotech, non-polluting assembly (e.g., furniture, software-related warehousing). Perfect for quick commerce or clean tech—low impact for sustainable operations.</li>
            </ul>
            <p className="mt-4">For example, if you’re in pharmaceuticals (Red), we’ll prioritize zones like Jigani for its infrastructure; for e-commerce (Green), Whitefield’s proximity to airports.</p>
            <p className="mt-4">For tailored procurement by zone and sector, check our <Link href="/warehouse-listings/#procurement" className="text-blue-500 hover:text-blue-300">Procurement Process</Link>.</p>
          </section>

          {/* Section 4: List of Key Industrial Areas (Updated Table) */}
          <section id="key-areas" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">List of Key Industrial Areas in/around Bengaluru</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-white">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">Type</th>
                    <th className="border px-4 py-2 text-left">Area</th>
                    <th className="border px-4 py-2 text-left">Allowed Zones</th>
                    <th className="border px-4 py-2 text-left">Size (Acres)</th>
                    <th className="border px-4 py-2 text-left">Key Features/Sectors</th>
                  </tr>
                </thead>
                <tbody>
                  {allAreas.map((area, index) => (
                    <tr key={index} id={area.name.toLowerCase().replace(/\s/g, '-')}>
                      <td className="border px-4 py-2">{area.type}</td>
                      <td className="border px-4 py-2">{area.name}</td>
                      <td className="border px-4 py-2">{area.categories}</td>
                      <td className="border px-4 py-2">{area.size}</td>
                      <td className="border px-4 py-2">{area.features}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-gray-300">Based on KIADB data; contact us for latest availability. Embed interactive map below:</p>
            {/* Placeholder for interactive map */}
            <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1ilSBmfog9cELEGbqMuMd1itCGP2I9mU&ehbc=2E312F" width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"></iframe>
          </section>

          {/* CTA */}
          <CTAButtons />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}
