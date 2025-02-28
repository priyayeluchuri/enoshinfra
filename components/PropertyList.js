import Link from 'next/link';

export default function PropertyList() {
  return (
    <section className="py-12 pb-24 bg-gray-900"> {/* Added pb-24 to avoid footer overlap */}
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8 text-white">
          Our Featured Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <img
              src="/path-to-property-image.jpg"
              alt="Property Name"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-white">Property Name</h4>
              <p className="mt-2 text-gray-300">
                Brief description of the property highlighting key features.
              </p>
              <Link href="/property-details" className="mt-4 inline-block text-blue-400 hover:text-blue-500 transition duration-300">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

