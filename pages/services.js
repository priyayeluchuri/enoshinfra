// pages/services.js
import Head from 'next/head';
import Link from 'next/link';

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services - Enosh Infra</title>
        <meta name="description" content="Discover our range of real estate consultancy services." />
      </Head>
      <main className="p-8">
        <h1 className="text-3xl font-bold">Our Services</h1>
        <p className="mt-4">We offer various real estate solutions, including:</p>
        <ul className="mt-4 list-disc list-inside">
          <li>
            <Link href="/services/warehouses" className="text-blue-600 hover:underline">
              Warehouses & Logistics
            </Link>
          </li>
        </ul>
	  <ul className="mt-4 list-disc list-inside">
          <li>
            <Link href="/services/tech-parks" className="text-blue-600 hover:underline">
              Tech Parks
            </Link>
          </li>
        </ul>
	  <ul className="mt-4 list-disc list-inside">
          <li>
            <Link href="/services/commercial-retail" className="text-blue-600 hover:underline">
              Commercial & Retail
            </Link>
          </li>
        </ul>
	  <ul className="mt-4 list-disc list-inside">
          <li>
            <Link href="/services/co-working" className="text-blue-600 hover:underline">
              Co-Working Spaces
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}

