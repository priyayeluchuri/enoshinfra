import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SEO from '../components/seo';
import Link from 'next/link';

export default function WarehousesForRent({ forceEnglish }) {
  const { t } = useTranslation('common');
  const router = useRouter();

  // Remove the redirect logic since we want to show content for all locales
  // The page will always show English content regardless of the URL locale

  return (
    <>
      <SEO pageKey="warehouses.seo" />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">{t('warehouses.title', 'Warehouses for Rent in Bangalore')}</h1>
          <p className="text-lg mb-6">{t('warehouses.description', 'Explore large warehouses (>10,000 sqft) with AI-driven matching.')}</p>
          
          {/* Locations Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('warehouses.locations', 'Available Locations')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('warehouses.location.vemagal', 'Vemagal: 50,000–150,000+ sqft, Rs. 15–25/sq.ft')}</li>
              <li>{t('warehouses.location.doddaballapura', 'Doddaballapura: 10,000–300,000+ sqft, Rs. 15–25/sq.ft')}</li>
              <li>{t('warehouses.location.attibelle', 'Attibelle: 20,000–100,000+ sqft, Rs. 18–30/sq.ft')}</li>
              <li>{t('warehouses.location.hoskote', 'Hoskote: 8,000–400,000+ sqft, Rs. 18–30/sq.ft')}</li>
              <li>{t('warehouses.location.soukyaRoad', 'Soukya Road: 8,000–200,000+ sqft, Rs. 18–30/sq.ft')}</li>
              <li>{t('warehouses.location.mysoreRoad', 'Mysore Road: 10,000–60,000+ sqft, Rs. 20–35/sq.ft')}</li>
              <li>{t('warehouses.location.bidadi', 'Bidadi: 10,000–60,000+ sqft, Rs. 15–25/sq.ft')}</li>
              <li>{t('warehouses.location.harohalli', 'Harohalli: 5,000–65,000+ sqft, Rs. 15–25/sq.ft')}</li>
              <li>{t('warehouses.location.kanakapuraRoad', 'Kanakapura Road: 5,000–60,000+ sqft, Rs. 20–35/sq.ft')}</li>
              <li>{t('warehouses.location.hosurRoad', 'Hosur Road: 20,000–100,000+ sqft, Rs. 18–30/sq.ft')}</li>
              <li>{t('warehouses.location.devanahalli', 'Devanahalli: 40,000–100,000+ sqft, Rs. 20–35/sq.ft')}</li>
              <li>{t('warehouses.location.whitefield', 'Whitefield: 10,000–50,000+ sqft, Rs. 25–40/sq.ft')}</li>
              <li>{t('warehouses.location.malur', 'Malur: 10,000–300,000+ sqft, Rs. 18–30/sq.ft')}</li>
              <li>{t('warehouses.location.bommasandra', 'Bommasandra: 5,000–100,000+ sqft, Rs. 18–30/sq.ft')}</li>
              <li>{t('warehouses.location.jigani', 'Jigani: 5,000–200,000+ sqft, Rs. 25–40/sq.ft')}</li>
              <li>{t('warehouses.location.tumkurRoad', 'Tumkur Road: 10,000–110,000+ sqft, Rs. 20–35/sq.ft')}</li>
              <li>{t('warehouses.location.nelamangala', 'Nelamangala: 10,000–150,000+ sqft, Rs. 15–25/sq.ft')}</li>
              <li>{t('warehouses.location.peenya', 'Peenya: 7,000–80,000+ sqft, Rs. 25–40/sq.ft')}</li>
              <li>{t('warehouses.location.yeshwantpur', 'Yeshwantpur: 7,000–20,000+ sqft, Rs. 30–45/sq.ft')}</li>
              <li>{t('warehouses.location.bannerghattaRoad', 'Bannerghatta Road: 5,000–50,000+ sqft, Rs. 25–40/sq.ft')}</li>
              <li>{t('warehouses.location.narsapura', 'Narsapura: 9,000–100,000+ sqft, Rs. 18–30/sq.ft')}</li>
            </ul>
            <p className="mt-4 text-sm">{t('warehouses.costNote', 'Costs vary based on amenities and accessibility. Contact us for tailored options.')}</p>
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
