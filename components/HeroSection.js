import Link from 'next/link';
export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white relative bg-gray-900 text-white bg-cover bg-center h-[80vh] flex items-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Dark overlay for contrast */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Premium Commercial Spaces in Bangalore
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Enosh Infra is your trusted partner in securing high-quality commercial, industrial, and warehouse properties in Bangalore. Elevate your business with strategic locations and seamless transactions.
        </p>
	  {/*
        <div className="mt-6">
          <Link href="/services" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300">
            Explore Our Listings
          </Link>
        </div>
	*/}
      </div>
    </section>
  );
}

