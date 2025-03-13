import SEO from '../components/seo';
import Link from 'next/link';

export default function PartnersResources() {
  return (
    <>
      <SEO
        title="Partners & Resources - Enosh Infra"
        description="Explore partnerships and valuable resources in the commercial real estate sector with Enosh Infra."
        url="https://enoshinfra.com/partners-resources"
      />
      <section className="w-full h-[85vh] p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-6">Our Partners & Resources</h1>
          <p className="text-lg mb-8">Discover valuable collaborations and industry insights that drive success in commercial real estate.</p>
          <ul className="space-y-4">
	      <p>Benefits of partnering with Enosh Infra:</p>
	    <ul className="list-disc list-inside">
             <li>Access to prime property listings</li>
             <li>Collaborative marketing initiatives</li>
             <li>Dedicated partnership support</li>
            </ul>
            <li>
              <Link href="/contact" className="text-blue-500 hover:underline">Join Our Partnership Program</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

