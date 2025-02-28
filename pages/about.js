import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Enosh Infra</title>
        <meta name="description" content="Learn more about Enosh Infra, a trusted real estate consultancy firm." />
      </Head>
      <main className="w-full min-h-screen p-6 pt-12 text-white bg-gray-900">
        <section className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-4">About Us</h1>
          
          <p className="text-lg leading-relaxed mb-4">
            Welcome to <span className="text-blue-400 font-semibold">EnoshInfra</span>, a premier real estate consultancy firm specializing in commercial space rentals for multinational corporations and foreign enterprises looking to establish their presence in India. Headquartered in <span className="text-blue-400 font-semibold">Bengaluru</span>, the thriving business capital of India, we are dedicated to providing highly reliable and premium real estate solutions tailored to the unique needs of global businesses.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            With years of expertise in the industry, our team understands the complexities of securing the perfect commercial space in a dynamic and competitive market. We offer end-to-end solutions, from market research and location scouting to negotiations and legal support, ensuring a seamless transition for businesses entering the Indian market.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            Our deep-rooted connections with top developers, landlords, and government agencies allow us to facilitate prime office spaces that align with your operational goals and corporate vision.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-3 text-center">Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-lg leading-relaxed mb-4">
            <li>Expertise in commercial real estate for multinational corporations.</li>
            <li>Exclusive access to premium office spaces in Bengaluru.</li>
            <li>AI-powered matching system for optimized property selection.</li>
            <li>Comprehensive support from market research to lease negotiations.</li>
            <li>Strong network with top developers and government agencies.</li>
            <li>Dedicated team ensuring a smooth and efficient process.</li>
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

