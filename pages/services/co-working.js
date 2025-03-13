import SEO from '../../components/seo';

export default function CoWorkingSpaces() {
  return (
    <>
      <SEO
        title="Co-Working Spaces - Enosh Infra"
        description="Discover premium co-working spaces with plug-and-play facilities tailored for startups, freelancers, and enterprises."
        url="https://www.enoshinfra.com/services/co-working"
        //image="https://www.enoshinfra.com/hero-bg.jpg"
      />
      <section className="container mx-auto py-12 px-6 text-white bg-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8">Co-Working Spaces</h1>
        <p className="text-lg leading-relaxed mb-6">
          Enosh Infra provides top-tier co-working spaces designed for startups, freelancers, and enterprises looking for a flexible and dynamic work environment. Our spaces offer state-of-the-art infrastructure, high-speed internet, and a collaborative atmosphere that fosters productivity and innovation.
        </p>
        <h2 className="text-3xl font-semibold mt-10 mb-4 text-center">Why Choose Our Co-Working Spaces?</h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed mb-6">
          <li>Flexible workspaces tailored to your needs.</li>
          <li>High-speed internet and 24/7 access.</li>
          <li>Fully furnished with ergonomic seating and modern interiors.</li>
          <li>Networking opportunities with like-minded professionals.</li>
          <li>Access to conference rooms, breakout areas, and cafeteria.</li>
          <li>Prime locations with excellent connectivity.</li>
        </ul>
        <h2 className="text-3xl font-semibold mt-10 mb-4 text-center">Plug-and-Play Facilities</h2>
        <p className="text-lg leading-relaxed mb-6">
          Our plug-and-play co-working spaces come fully equipped with office essentials, enabling you to set up and start working immediately. No hassle, no downtime—just walk in, plug in, and get to work!
        </p>
        <p className="text-xl font-semibold text-center text-blue-400 mt-10">Experience seamless workspaces with Enosh Infra.</p>
      </section>
    </>
  );
}

