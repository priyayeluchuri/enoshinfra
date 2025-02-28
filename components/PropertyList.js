import Link from 'next/link';
export default function PropertyList() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8">Our Featured Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/path-to-property-image.jpg" alt="Property Name" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h4 className="text-xl font-semibold">Property Name</h4>
              <p className="mt-2 text-gray-600">Brief description of the property highlighting key features.</p>
              <a href="/property-details" className="mt-4 inline-block text-blue-600 hover:underline">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

