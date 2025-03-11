import SEO from '../../components/seo';

export default function Warehouses() {
  return (
    <>
      <SEO
        title="Warehouses & Logistics - EnoshInfra"
        description="Find premium warehouse and logistics spaces in Bengaluru with EnoshInfra."
        url="https://www.enoshinfra.com/services/warehouses"
        image="https://www.enoshinfra.com/hero-bg.jpg"
      />
      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">Warehouses & Logistics</h1>
        <p className="text-lg leading-relaxed mb-6">
          EnoshInfra specializes in helping businesses find <span className="text-blue-400">premium warehouse and logistics spaces</span> in Bengaluru.
          Our extensive network ensures that you get the best locations for seamless supply chain operations.
        </p>
        <h2 className="text-3xl font-semibold mt-10 mb-4">Key Features</h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>Large storage capacities with modern infrastructure</li>
          <li>Prime locations for easy accessibility</li>
          <li>Flexible lease options tailored to business needs</li>
          <li>End-to-end support, including legal and compliance guidance</li>
        </ul>
        <p className="text-xl font-semibold text-center text-blue-400 mt-10">Ideal for: E-commerce, distribution hubs, manufacturing, and storage facilities.</p>
      </section>
    </>
  );
}

