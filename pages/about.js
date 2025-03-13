import SEO from '../components/seo';

export default function About() {
  return (
    <>
      <SEO
        title="About Us - Enosh Infra"
        description="Discover Enosh Infra, a premier real estate consultancy firm dedicated to providing tailored commercial property solutions in India."
        url="https://www.enoshinfra.com/about"
        //image="https://www.enoshinfra.com/hero-bg.jpg"
      />

      <main className="w-full h-[85vh] p-6 pt-12 text-white bg-gray-900">
        <section className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-4">About Us</h1>

          <p className="text-lg leading-relaxed mb-4">
            Welcome to <span className="text-blue-400 font-semibold">Enosh Infra</span>, a premier real estate consultancy specializing in commercial property rentals for multinational corporations and foreign enterprises seeking to establish a presence in India. Based in <span className="text-blue-400 font-semibold">Bengaluru</span>, India's thriving business hub, we are committed to delivering customized, high-quality real estate solutions.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            Our expert team excels in navigating the complexities of the Indian real estate market. We provide comprehensive services, including market analysis, location scouting, legal assistance, and negotiation support, ensuring a seamless experience for businesses entering the Indian landscape.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            Leveraging our robust network of developers, landlords, and government agencies, we facilitate access to premium office spaces that align with your strategic objectives and corporate vision.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-3 text-center">Why Choose Enosh Infra?</h2>
          <ul className="list-disc pl-6 text-lg leading-relaxed mb-4">
            <li>Specialists in commercial real estate for global corporations.</li>
            <li>Exclusive access to prime office spaces in Bengaluru.</li>
            <li>AI-powered property matching for optimal selection.</li>
            <li>End-to-end consultancy from research to legal formalities.</li>
            <li>Strong industry connections for seamless transactions.</li>
            <li>Dedicated experts ensuring efficient and effective solutions.</li>
          </ul>

          <p className="text-xl font-semibold text-center text-blue-400 mt-6">
            Our Motto: <span className="italic">"Transforming Real Estate with AI-Driven Precision."</span>
          </p>
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

