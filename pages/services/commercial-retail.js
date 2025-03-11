import SEO from '../../components/seo';

export default function CommercialRetail() {
  return (
    <>
      <SEO
        title="Commercial & Retail Spaces - EnoshInfra"
        description="Explore premium commercial and retail spaces with EnoshInfra, your trusted real estate consultancy in Bengaluru." 
        url="https://www.enoshinfra.com/services/commercial-retail"
        image="https://www.enoshinfra.com/hero-bg.jpg"
      />
      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">Commercial & Retail Spaces</h1>
        <p className="text-lg leading-relaxed mb-6">
          EnoshInfra specializes in helping businesses find the perfect commercial and retail spaces that align with their needs and brand image. Whether you are looking for a prime storefront, a shopping complex, or a high-visibility commercial unit, we provide expert guidance to secure the best locations in Bengaluru.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Our deep market insights and strategic partnerships with top developers enable us to offer high-end commercial spaces in key business districts, ensuring maximum footfall and brand exposure.
        </p>
        <h2 className="text-3xl font-semibold mt-10 mb-4 text-center">Why Choose Our Commercial & Retail Spaces?</h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>Prime locations in Bengaluru’s business hubs.</li>
          <li>High footfall areas for maximum visibility.</li>
          <li>Flexible leasing options tailored to business needs.</li>
          <li>Customizable spaces for retail, restaurants, and showrooms.</li>
          <li>Expert negotiation support for the best deals.</li>
        </ul>
        <p className="text-xl font-semibold text-center text-blue-400 mt-10">
          Let EnoshInfra help you establish your presence in Bengaluru’s thriving commercial landscape.
        </p>
      </section>
    </>
  );
}

