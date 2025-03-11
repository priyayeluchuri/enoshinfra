import SEO from '../../components/seo';

export default function TrendingWarehouses() {
  return (
    <>
      <SEO
        title="Trending Warehouse Locations - Enosh Infra"
        description="Explore the most sought-after warehouse locations in Bengaluru with Enosh Infra."
        url="https://www.enoshinfra.com/services/warehouses/trending"
        image="https://www.enoshinfra.com/hero-bg.jpg"
      />
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-center mb-8">Trending Warehouse Locations</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold">Bommasandra</h3>
              <p className="text-gray-400">A strategic hub with excellent connectivity to major industrial corridors.</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold">Nelamangala</h3>
              <p className="text-gray-400">Ideal for large-scale logistics operations with spacious infrastructure.</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold">Peenya</h3>
              <p className="text-gray-400">One of the largest industrial areas, perfect for warehousing needs.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

