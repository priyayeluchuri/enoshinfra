import SEO from '../../components/seo';

export default function TechParks() {
  return (
    <>
      <SEO
        title="Tech Parks - Enosh Infra"
        description="Discover top-tier tech parks and IT office spaces in Bengaluru with Enosh Infra."
        url="https://www.enoshinfra.com/services/tech-parks"
        image="https://www.enoshinfra.com/hero-bg.jpg"
      />
      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">Tech Parks</h1>
        <p className="text-lg leading-relaxed mb-6">
          We connect global enterprises with world-class <span className="text-blue-400">tech parks and IT office spaces</span> that foster innovation and growth.
        </p>
        <h2 className="text-3xl font-semibold mt-10 mb-4">Key Features</h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>High-tech infrastructure with fiber-optic connectivity</li>
          <li>Proximity to major business hubs and transport networks</li>
          <li>Fully serviced office spaces for IT and software firms</li>
          <li>Sustainable, energy-efficient office environments</li>
        </ul>
        <p className="text-xl font-semibold text-center text-blue-400 mt-10">
          Ideal for: IT companies, startups, software firms, and global enterprises.
        </p>
      </section>
    </>
  );
}
