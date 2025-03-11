import SEO from '../components/seo';
import Link from 'next/link';

export default function Services() {
  return (
    <>
      <SEO
        title="Our Services - Enosh Infra"
        description="Explore the comprehensive range of real estate consultancy services offered by Enosh Infra, specializing in premium commercial properties."
        url="https://www.enoshinfra.com/services"
        image="https://www.enoshinfra.com/hero-bg.jpg"
      />

      <main className="w-full min-h-screen p-6 pt-12 text-white bg-gray-900">
        <section className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-4">Our Services</h1>
          <p className="text-lg leading-relaxed mb-4">
            Enosh Infra offers a diverse range of real estate solutions tailored to meet the specific needs of businesses seeking premium properties in India. Our services include:
          </p>
          <ul className="list-disc pl-6 text-lg leading-relaxed mb-4">
            <li>
              <Link href="/services/warehouses" className="text-blue-400 hover:underline">
                Warehouses & Logistics Solutions
              </Link>
            </li>
            <li>
              <Link href="/services/tech-parks" className="text-blue-400 hover:underline">
                Tech Parks for Innovative Enterprises
              </Link>
            </li>
            <li>
              <Link href="/services/commercial-retail" className="text-blue-400 hover:underline">
                Commercial & Retail Spaces for Growing Businesses
              </Link>
            </li>
            <li>
              <Link href="/services/co-working" className="text-blue-400 hover:underline">
                Modern Co-Working Spaces
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #111827;
        }
      `}</style>
    </>
  );
}

