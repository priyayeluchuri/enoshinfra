import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SEO from '../components/seo';
import Link from 'next/link';
import common from '../locales/en/common.json'; 

export default function WarehousesForRent({ forceEnglish }) {
  const { t } = useTranslation('common');
  const router = useRouter();

  // Remove the redirect logic since we want to show content for all locales
  // The page will always show English content regardless of the URL locale
  // Convert the location object into an array of objects with name, size, cost
  const locations = Object.entries(common.warehouses.location).map(([key, value]) => {
    // Example value: "Vemagal: 50,000–150,000+ sqft, Rs. 15–25/sq.ft"
    const colonIndex = value.indexOf(':');
    const name = value.slice(0, colonIndex).trim();
    const rest = value.slice(colonIndex + 1).trim();
    const [sizeRaw, costRaw] = rest.split(', Rs.');
    const size = sizeRaw.replace('sqft', '').trim();
    const cost = costRaw.replace('/sq.ft', '').trim();

    return { key, name, size, cost };
  });

  return (
    <>
      <SEO pageKey="warehouses.seo" />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">{t('warehouses.title', 'Warehouses for Rent in Bangalore')}</h1>
          <p className="text-lg mb-6">{t('warehouses.description', 'Explore large warehouses (>10,000 sqft) with AI-driven matching.')}</p>
          
	  {/* Locations Section */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">
       {t('warehouses.locations', 'Available Locations')}
      </h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Location</th>
            <th className="border px-4 py-2 text-left">Size Range (sqft)</th>
            <th className="border px-4 py-2 text-left">Rent (₹/sq.ft)</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(({ key, name, size, cost }) => (
            <tr key={key}>
              <td className="border px-4 py-2">{name}</td>
              <td className="border px-4 py-2">{size}</td>
              <td className="border px-4 py-2">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </div>
          {/* Compliance Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('warehouses.compliance.title', 'Compliance Requirements')}</h2>
            <p>{t('warehouses.compliance.fireNOC', 'Fire NOC: Mandatory for warehouses over 500 sq.m., issued by Karnataka Fire and Emergency Services. Requires fire safety audits, extinguishers, and exit plans. Processing takes 30–60 days with fees of Rs. 10,000–50,000 based on size.')}</p>
            <p>{t('warehouses.compliance.bdaBBMP', 'BDA/BBMP Approvals: Requires building plan approvals, occupancy certificates, and trade licenses from Bangalore Development Authority (BDA) and Bruhat Bengaluru Mahanagara Palike (BBMP). Costs range from Rs. 30,000–1 lakh depending on built-up area, with approval timelines of 30–90 days.')}</p>
            <p className="mt-4 text-sm">{t('warehouses.compliance.note', 'Compliance ensures zoning, setbacks, and FSI adherence. Contact us for assistance.')}</p>
          </div>
          
          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('warehouses.services.title', 'Expert Services by Enosh Infra')}</h2>
            <p>{t('warehouses.services.description', 'At Enosh Infra, we guide you through a seamless and transparent process with expertise in compliance assistance, approvals, legal opinions, property inspections, property evaluations, and building contracts. Our AI-driven approach ensures tailored solutions for your warehouse needs.')}</p>
            <p className="mt-4 text-sm">{t('warehouses.services.note', 'Trust our experts for a hassle-free experience from start to finish.')}</p>
          </div>
          
          {/* CTA */}
          <Link
            href="/contact"
            locale="en"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {t('navbar.cta', 'Need a WareHouse? Let’s Talk!')}
          </Link>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  // Always generate the page but force English translations for all locales
  return {
    props: {
      ...(await serverSideTranslations('en', ['common'])), // Always use English translations
      forceEnglish: true, // Flag to indicate this is an English-only page
    },
  };
}
