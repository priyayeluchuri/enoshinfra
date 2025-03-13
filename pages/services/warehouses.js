import SEO from '../../components/seo';
import Link from 'next/link';

export default function Warehouses() {
  return (
    <>
      <SEO
        title="Warehouse & Logistics Spaces for Rent in Bengaluru - Enosh Infra"
        description="Discover premium warehouse and logistics spaces for rent in Bengaluru, including prime locations like Nelamangala, Peenya, Bommasandra, Jigani, Hoskote, Kumbalgodu, Doddaballapura, Hebbal, Whitefield, HSR, and KIADB industrial areas. Enosh Infra connects property owners with businesses seeking top industrial spaces."
        url="https://www.enoshinfra.com/services/warehouses"
      />
      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">Warehouses & Logistics Spaces in Bengaluru</h1>
        <p className="text-lg leading-relaxed mb-6">
          Enosh Infra specializes in helping businesses find <span className="text-blue-400">premium warehouse and logistics spaces for rent in Bengaluru</span>. 
          Our extensive network ensures you secure the best locations for seamless supply chain operations, from <span className="text-blue-400">Bommasandra to Peenya, Jigani to Whitefield</span>.
        </p>
        <h2 className="text-3xl font-semibold mt-10 mb-4">Why Choose Enosh Infra?</h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>Access to prime commercial properties including warehouses and office spaces</li>
          <li>Strategic locations to optimize logistics and distribution</li>
          <li>Flexible leasing options with legal and compliance support</li>
          <li>Ideal spaces for e-commerce, manufacturing, and large-scale storage</li>
        </ul>
        <p className="text-xl font-semibold text-center text-blue-400 mt-10">
          Discover opportunities in Bengaluru's top industrial zones.
        </p>
        <Link href="/services/trending-warehouse" className="block text-blue-400 underline text-xl text-center mt-4 mx-auto">
          Explore Most Trending Locations
        </Link>
      </section>
    </>
  );
}
