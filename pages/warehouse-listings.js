import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/seo';
import Link from 'next/link';
import common from '../locales/en/common.json'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faWhatsapp } from '@fortawesome/free-solid-svg-icons';
import fs from 'fs/promises';  // For dynamic file reading
import path from 'path';
import Carousel from 'react-multi-carousel';  // Install: npm install react-multi-carousel
import 'react-multi-carousel/lib/styles.css';  // Import styles

export default function WarehouseListings({ locationImages }) {
  const { t } = useTranslation('common');

  // Traction order for sorting locations
  const tractionOrder = [
    'Whitefield', 'Electronic City', 'Devanahalli', 'Hebbal', 'Bommasandra', 
    'Hoskote', 'Peenya', 'Jigani', 'Doddaballapura', 'Nelamangala',
    'Attibele', 'Bengaluru Aerospace Park', 'Bengaluru Hardware Park', 'Bengaluru IT Park',
    'Dabaspet', 'Doddaballapura General', 'Doddaballapura Industrial Area', 'Dyavasandra',
    'Iggalur', 'Kadugodi', 'Kolar', 'Kumbalagodu', 'Mandya', 'Ramanagara', 'Sadaramangala',
    'Sompura', 'Veersandra Industrial Area', 'Vemagal', 'Soukya Road', 'Mysore Road', 'Bidadi', 'Harohalli', 'Kanakapura', 'North Bengaluru', 'Bengaluru'  // Added generics
  ];

  // Static ranges per location (hardcoded; expand as needed)
  const locationData = {
    'Vemagal': { area: '5,000–50,000+ sqft', cost: '₹15–40' },
    'Whitefield': { area: '10,000–50,000+ sqft', cost: '₹25–40' },
    'Electronic City': { area: '5,000–100,000+ sqft', cost: '₹18–30' },
    'Devanahalli': { area: '40,000–100,000+ sqft', cost: '₹20–35' },
    'Hebbal': { area: '7,000–20,000+ sqft', cost: '₹20–35' },
    'Bommasandra': { area: '5,000–100,000+ sqft', cost: '₹18–30' },
    // Add for all locations, e.g.
    'Mysore Road': { area: '10,000–200,000+ sqft', cost: '₹15–28' },
    // Fallback for unknown
  };

  // Parse locations from common.json for area/cost
  const jsonLocations = Object.entries(common.warehouses.location).map(([key, value]) => {
    const colonIndex = value.indexOf(':');
    const name = value.slice(0, colonIndex).trim();
    const rest = value.slice(colonIndex + 1).trim();
    const [sizeRaw, costRaw] = rest.split(', Rs.');
    const size = sizeRaw.replace('sqft', '').trim();
    const cost = costRaw.replace('/sq.ft', '').trim();

    return { name, size, cost };
  });

  // Discovered locations from images folder, sorted by traction
  const discoveredLocations = Object.keys(locationImages).sort((a, b) => tractionOrder.indexOf(a) - tractionOrder.indexOf(b));

  // CTA Buttons Component (Reusable)
  const CTAButtons = () => (
    <div className="flex space-x-4 justify-center">
      <Link href="/contact" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact Form
      </Link>
      <a href="tel:+918073582033" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call Us
      </a>
      <a href="https://wa.me/918073582033" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> WhatsApp
      </a>
    </div>
  );

  // Carousel responsive config (for multiple images)
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <>
      <SEO pageKey="warehouses.seo" /> {/* Reuse warehouses SEO; customize in common.json if needed */}
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">Warehouse Listings in Bengaluru: Tailored for Your Needs</h1>
          
          {/* Horizontal Jump Menu */}
          <nav className="flex flex-wrap justify-center mb-8 space-x-4 text-blue-500">
            <a href="#introduction" className="hover:text-blue-300">Introduction</a>
            <a href="#locations" className="hover:text-blue-300">By Location</a>
            <a href="#warehouse-types" className="hover:text-blue-300">By Type</a>
            <a href="#sectors" className="hover:text-blue-300">By Sector</a>
            <a href="#zones" className="hover:text-blue-300">By KIADB Zone</a>
            <a href="#procurement" className="hover:text-blue-300">Procurement Process</a>
          </nav>
          
          {/* Introduction Section with CTA Buttons */}
          <section id="introduction" className="mb-8">
            <p className="text-lg mb-6 leading-relaxed">Discover our curated warehouse listings in Bengaluru’s top hubs, from Nelamangala’s logistics corridors to Bommasandra’s industrial belts. With spaces ranging from 5,000 to 400,000+ sqft at competitive rates (₹15–40/sqft), we segregate options into new age warehouses for fast-paced sectors like quick commerce (e.g., Blinkit, Zepto) and traditional ones for heavy manufacturing. Leverage our AI-driven matching and end-to-end procurement process for hassle-free leasing. Explore below for images, costs, areas, and sector-specific tailoring.</p>
            <CTAButtons />
          </section>

          {/* Listings by Location (Dynamic cards based on images folder) */}
          <section id="locations" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Warehouse Listings by Location</h2>
            <p className="mb-4 text-gray-300">Browse previews of warehouse listings by key Bengaluru locations, consolidated from KIADB zones and our site. Sorted by traction (e.g., investment growth in areas like Whitefield, Electronic City). For a complete summary table, visit our <Link href="/warehouses-for-rent" className="text-blue-500 hover:text-blue-300">Warehouses for Rent</Link> page.</p>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {discoveredLocations.map((location) => {
                const images = locationImages[location] || [];
                const exampleImage = images[0]?.path || '/images/default-warehouse.jpg';  // First image or fallback
                // Parse unique zones/types from images
                const zones = [...new Set(images.map(img => img.zone).filter(Boolean))].join('/') || 'Mixed';
                const types = [...new Set(images.map(img => img.type).filter(Boolean))].join('/') || 'Mixed';

                const matchingLocation = jsonLocations.find(loc => loc.name.toLowerCase() === location.toLowerCase());
                const area = matchingLocation ? matchingLocation.size : '5,000–50,000+ sqft';  // From common.json or fallback
                const cost = matchingLocation ? matchingLocation.cost : '15–40';  // From common.json or fallback

                return (
                  <div key={location} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg min-w-[300px]">
                    {images.length > 1 ? (
                      <Carousel responsive={responsive} autoPlay={true} infinite={true} showDots={true} className="h-48">
                        {images.map((img, idx) => (
                          <img key={idx} src={img.path} alt={`Warehouse in ${location} - ${img.name}`} className="w-full h-48 object-cover" />
                        ))}
                      </Carousel>
                    ) : (
                      <img src={exampleImage} alt={`Warehouse in ${location}`} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <h4 className="text-lg font-semibold">Location: {location}</h4>
                      <p>Area: {area}</p>
                      <p>Cost: ₹{cost}/sqft</p>
                      <div className="mt-4 flex space-x-4">
                        <Link href={`/industrial-zones#${location.toLowerCase().replace(/\s/g, '-')}`}>View Industrial Zone</Link>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${location}+Bengaluru`} target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                      </div>
                      <div className="mt-2">
                        <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-4">
              <Link href="/warehouses-for-rent" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Show Locations</Link>
            </div>
          </section>

          {/* Segregated by Type (With CTA on cards) */}
          <section id="warehouse-types" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Warehouse Listings by Type</h2>
            
            {/* E-Commerce Fulfillment Centers */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">E-Commerce Fulfillment Centers</h3>
              <p className="mb-4 text-gray-300">Optimized for quick commerce with automation and urban proximity. Highest traction in Bangalore (44% demand).</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/ecommerce-fulfillment-warehouse.jpg" alt="E-Commerce warehouse in Whitefield Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Location: Whitefield</h4>
                    <p>Area: 10,000–50,000+ sqft</p>
                    <p>Cost: ₹25–40/sqft</p>
                    <p>Features: Automation-ready, high-speed access for same-day delivery.</p>
                    <p>Compliance: Guidance on obtaining Fire NOC and BBMP approvals; full compliance support.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#whitefield" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Whitefield+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/ecommerce-fulfillment-warehouse-2.jpg" alt="E-Commerce warehouse in Electronic City Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Location: Electronic City</h4>
                    <p>Area: 5,000–100,000+ sqft</p>
                    <p>Cost: ₹18–30/sqft</p>
                    <p>Features: Plug-and-play setups for quick commerce fulfillment.</p>
                    <p>Compliance: Guidance on obtaining Fire NOC and BBMP approvals; full compliance support.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#electronic-city" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Electronic+City+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/ecommerce-fulfillment-warehouse-3.jpg" alt="E-Commerce warehouse in Hebbal Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Location: Hebbal</h4>
                    <p>Area: 7,000–20,000+ sqft</p>
                    <p>Cost: ₹20–35/sqft</p>
                    <p>Features: Tech-enabled inventory systems for global logistics.</p>
                    <p>Compliance: Guidance on obtaining Fire NOC and BBMP approvals; full compliance support.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#hebbal" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Hebbal+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 3PL/Logistics Distribution Centers */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">3PL/Logistics Distribution Centers</h3>
              <p className="mb-4 text-gray-300">For supply chain and shipping with highway access. High traction (42% demand).</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/logistics-distribution-warehouse.jpg" alt="Logistics warehouse in Hoskote Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Hoskote</h4>
                    <p>Area: 15,000–80,000+ sqft</p>
                    <p>Cost: ₹20–30/sqft</p>
                    <p>Features: Multi-temperature zones for multi-purpose logistics.</p>
                    <p>Compliance: Guidance on Fire NOC and BBMP approvals.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#hoskote" className="text-blue-500 hover:text-blue-300">View Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Hoskote+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/logistics-distribution-warehouse-2.jpg" alt="Logistics warehouse in Nelamangala Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Nelamangala</h4>
                    <p>Area: 50,000–200,000+ sqft</p>
                    <p>Cost: ₹16–28/sqft</p>
                    <p>Features: Multiple loading docks, highway access for bulk distribution.</p>
                    <p>Compliance: Guidance on Fire NOC and BBMP approvals.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#nelamangala" className="text-blue-500 hover:text-blue-300">View Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Nelamangala+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/logistics-distribution-warehouse-3.jpg" alt="Logistics warehouse in Peenya Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Peenya</h4>
                    <p>Area: 30,000–120,000+ sqft</p>
                    <p>Cost: ₹15–25/sqft</p>
                    <p>Features: Automated sorting for wholesale supply chains.</p>
                    <p>Compliance: Guidance on Fire NOC and BBMP approvals.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#peenya" className="text-blue-500 hover:text-blue-300">View Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Peenya+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Industrial/Manufacturing Warehouses */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Industrial/Manufacturing Warehouses</h3>
              <p className="mb-4 text-gray-300">For heavy goods and assembly with robust infrastructure. Medium traction (14% demand).</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/peenya-manufacturing.jpg" alt="Manufacturing warehouse in Peenya Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Peenya</h4>
                    <p>Area: 7,000–80,000+ sqft</p>
                    <p>Cost: ₹15–25/sqft</p>
                    <p>Features: High-load capacity for machinery.</p>
                    <p>Compliance: Guidance on BDA approvals and legal opinions.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#peenya" className="text-blue-500 hover:text-blue-300">View Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Peenya+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/jigani-manufacturing.jpg" alt="Manufacturing warehouse in Jigani Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Jigani</h4>
                    <p>Area: 5,000–200,000+ sqft</p>
                    <p>Cost: ₹25–40/sqft</p>
                    <p>Features: Bannerghatta Road connectivity for assembly lines.</p>
                    <p>Compliance: Guidance on Fire NOC and BBMP approvals.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#jigani" className="text-blue-500 hover:text-blue-300">View Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Jigani+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/doddaballapura-manufacturing.jpg" alt="Manufacturing warehouse in Doddaballapura Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Doddaballapura</h4>
                    <p>Area: 10,000–300,000+ sqft</p>
                    <p>Cost: ₹15–25/sqft</p>
                    <p>Features: Airport proximity for export-oriented manufacturing.</p>
                    <p>Compliance: Guidance on BDA approvals and legal opinions.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#doddaballapura" className="text-blue-500 hover:text-blue-300">View Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Doddaballapura+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cold Storage Warehouses */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Cold Storage Warehouses</h3>
              <p className="mb-4 text-gray-300">For perishables and temperature-sensitive goods like food and pharma. Growing traction with agri-processing.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/cold-storage-warehouse.jpg" alt="Cold storage warehouse in Devanahalli Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Devanahalli</h4>
                    <p>Area: 20,000–100,000+ sqft</p>
                    <p>Cost: ₹22–35/sqft</p>
                    <p>Features: Refrigeration systems, proximity to airport for exports.</p>
                    <p>Compliance: Guidance on FSSAI and Fire NOC.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#devanahalli" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Devanahalli+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/cold-storage-warehouse-2.jpg" alt="Cold storage warehouse in Hoskote Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Hoskote</h4>
                    <p>Area: 15,000–80,000+ sqft</p>
                    <p>Cost: ₹20–30/sqft</p>
                    <p>Features: Multi-temperature zones for beverages and perishables.</p>
                    <p>Compliance: Guidance on FSSAI and BBMP approvals.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#hoskote" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Hoskote+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/cold-storage-warehouse-3.jpg" alt="Cold storage warehouse in Bommasandra Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Bommasandra</h4>
                    <p>Area: 10,000–60,000+ sqft</p>
                    <p>Cost: ₹18–28/sqft</p>
                    <p>Features: Humidity control for biotech and dairy.</p>
                    <p>Compliance: Guidance on FSSAI and legal opinions.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#bommasandra" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Bommasandra+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grade A Warehouses */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Grade A Warehouses</h3>
              <p className="mb-4 text-gray-300">Modern high-spec warehouses for all sectors with efficient designs. General traction across Bangalore.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/grade-a-warehouse.jpg" alt="Grade A warehouse in North Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Location: North Bengaluru</h4>
                    <p>Area: 50,000–200,000+ sqft</p>
                    <p>Cost: ₹20–35/sqft</p>
                    <p>Features: High-spec for IT and e-commerce with sustainable designs.</p>
                    <p>Compliance: Guidance on Fire NOC and BBMP approvals.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#north-bengaluru" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=North+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/grade-a-warehouse-2.jpg" alt="Grade A warehouse in Devanahalli Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Location: Devanahalli</h4>
                    <p>Area: 30,000–150,000+ sqft</p>
                    <p>Cost: ₹20–32/sqft</p>
                    <p>Features: Premium for aerospace and manufacturing with advanced facilities.</p>
                    <p>Compliance: Guidance on customs approvals and Fire NOC.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#devanahalli" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Devanahalli+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img src="/images/grade-a-warehouse-3.jpg" alt="Grade A warehouse in Jigani Bengaluru" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">Location: Jigani</h4>
                    <p>Area: 5,000–200,000+ sqft</p>
                    <p>Cost: ₹25–40/sqft</p>
                    <p>Features: Versatile for assembly and storage with Bannerghatta Road access.</p>
                    <p>Compliance: Guidance on BDA approvals and Fire NOC.</p>
                    <div className="mt-4 flex space-x-4">
                      <Link href="/industrial-zones#jigani" className="text-blue-500 hover:text-blue-300">View Industrial Zone</Link>
                      <a href="https://www.google.com/maps/search/?api=1&query=Jigani+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">View Area Map</a>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="sectors" className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">Warehouse Listings by Industrial Sectors</h2>
  <p className="mb-6 text-gray-300">At Enosh Infra, we tailor warehouses to diverse sectors using our 7+ years of expertise. Below are sector-specific recommendations with sample listings. Cards include KIADB zone info (Red for high polluting like pharma, Orange for moderate like food, Green for low like e-commerce/IT).</p>
  <ul className="space-y-8">
    <li>
      <h3 className="text-xl font-medium">E-Commerce/Logistics</h3>
      <p className="text-gray-300">Highest traction (~44% demand) driven by online retail and quick commerce like Blinkit/Zepto. Focus on urban/green zones for fast fulfillment.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/ecommerce-fulfillment-warehouse.jpg" alt="E-Commerce warehouse in Whitefield Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Whitefield</h4>
            <p>Area: 10,000–50,000+ sqft</p>
            <p>Cost: ₹25–40/sqft</p>
            <p>Features: Automation for same-day delivery.</p>
            <p>Zone: Green</p>
            <p>Compliance: Guidance on Fire NOC and BBMP approvals.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#whitefield" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Whitefield+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/ecommerce-fulfillment-warehouse-2.jpg" alt="E-Commerce warehouse in Electronic City Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Electronic City</h4>
            <p>Area: 5,000–100,000+ sqft</p>
            <p>Cost: ₹18–30/sqft</p>
            <p>Features: Tech-enabled for global logistics.</p>
            <p>Zone: Green</p>
            <p>Compliance: Guidance on BDA approvals.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#electronic-city" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Electronic+City+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/ecommerce-fulfillment-warehouse-3.jpg" alt="E-Commerce warehouse in Hebbal Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Hebbal</h4>
            <p>Area: 7,000–20,000+ sqft</p>
            <p>Cost: ₹20–35/sqft</p>
            <p>Features: Airport access for fast distribution.</p>
            <p>Zone: Green</p>
            <p>Compliance: Guidance on full compliance support.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#hebbal" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Hebbal+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <h3 className="text-xl font-medium">Manufacturing/Automotive</h3>
      <p className="text-gray-300">Medium traction (~14% demand) supported by heavy industry growth. Focus on red/orange zones for robust operations.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/peenya-manufacturing.jpg" alt="Manufacturing warehouse in Peenya Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Peenya</h4>
            <p>Area: 7,000–80,000+ sqft</p>
            <p>Cost: ₹15–25/sqft</p>
            <p>Features: High-load capacity for machinery.</p>
            <p>Zone: Red/Orange/Green</p>
            <p>Compliance: Guidance on BDA approvals and legal opinions.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#peenya" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Peenya+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/jigani-manufacturing.jpg" alt="Manufacturing warehouse in Jigani Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Jigani</h4>
            <p>Area: 5,000–200,000+ sqft</p>
            <p>Cost: ₹25–40/sqft</p>
            <p>Features: Bannerghatta Road connectivity for assembly lines.</p>
            <p>Zone: Red/Orange/Green</p>
            <p>Compliance: Guidance on Fire NOC and BBMP approvals.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#jigani" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Jigani+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/doddaballapura-manufacturing.jpg" alt="Manufacturing warehouse in Doddaballapura Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Doddaballapura</h4>
            <p>Area: 10,000–300,000+ sqft</p>
            <p>Cost: ₹15–25/sqft</p>
            <p>Features: Airport proximity for export-oriented manufacturing.</p>
            <p>Zone: Red/Orange/Green</p>
            <p>Compliance: Guidance on BDA approvals and legal opinions.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#doddaballapura" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Doddaballapura+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <h3 className="text-xl font-medium">Pharma/Biotech</h3>
      <p className="text-gray-300">Growing traction (~10-15%) due to exports and agri-processing. Focus on red zones with temperature control.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/devanahalli-pharma.jpg" alt="Pharma warehouse in Devanahalli Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Devanahalli</h4>
            <p>Area: 40,000–100,000+ sqft</p>
            <p>Cost: ₹20–35/sqft</p>
            <p>Features: Temperature-controlled for pharma/biotech.</p>
            <p>Zone: Red</p>
            <p>Compliance: Guidance on FSSAI and Fire NOC.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#devanahalli" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Devanahalli+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/jigani-pharma.jpg" alt="Pharma warehouse in Jigani Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Jigani</h4>
            <p>Area: 5,000–200,000+ sqft</p>
            <p>Cost: ₹25–40/sqft</p>
            <p>Features: Hygienic designs for biotech.</p>
            <p>Zone: Red/Orange</p>
            <p>Compliance: Guidance on KSPCB consents.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#jigani" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Jigani+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/bommasandra-pharma.jpg" alt="Pharma warehouse in Bommasandra Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Bommasandra</h4>
            <p>Area: 5,000–100,000+ sqft</p>
            <p>Cost: ₹18–30/sqft</p>
            <p>Features: Backup generators for biotech.</p>
            <p>Zone: Red</p>
            <p>Compliance: Guidance on legal opinions and KSPCB.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#bommasandra" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Bommasandra+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <h3 className="text-xl font-medium">Food & Beverage</h3>
      <p className="text-gray-300">Medium traction (~10%) with agri-processing. Focus on orange/green zones with cold storage.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/hoskote-food.jpg" alt="Food warehouse in Hoskote Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Hoskote</h4>
            <p>Area: 8,000–400,000+ sqft</p>
            <p>Cost: ₹18–30/sqft</p>
            <p>Features: Cold storage integrations for perishables.</p>
            <p>Zone: Orange</p>
            <p>Compliance: Guidance on FSSAI and Fire NOC.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#hoskote" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Hoskote+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/mandya-food.jpg" alt="Food warehouse in Mandya Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Mandya</h4>
            <p>Area: 8,000–400,000+ sqft</p>
            <p>Cost: ₹18–30/sqft</p>
            <p>Features: Hygienic for dairy and beverages.</p>
            <p>Zone: Orange</p>
            <p>Compliance: Guidance on KSPCB consents.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#mandya" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Mandya+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/nelamangala-food.jpg" alt="Food warehouse in Nelamangala Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Nelamangala</h4>
            <p>Area: 50,000–200,000+ sqft</p>
            <p>Cost: ₹16–28/sqft</p>
            <p>Features: Multi-temp for food processing.</p>
            <p>Zone: Orange/Green</p>
            <p>Compliance: Guidance on Fire NOC.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#nelamangala" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Nelamangala+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <h3 className="text-xl font-medium">Textiles/Apparel</h3>
      <p className="text-gray-300">Lower traction (~8%) with versatile storage/production. Focus on orange/green zones.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/doddaballapura-textiles.jpg" alt="Textiles warehouse in Doddaballapura Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Doddaballapura</h4>
            <p>Area: 10,000–300,000+ sqft</p>
            <p>Cost: ₹15–25/sqft</p>
            <p>Features: Spacious for storage/production.</p>
            <p>Zone: Orange</p>
            <p>Compliance: Guidance on BBMP approvals.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#doddaballapura" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Doddaballapura+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/ramanagara-textiles.jpg" alt="Textiles warehouse in Ramanagara Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Ramanagara</h4>
            <p>Area: 5,000–100,000+ sqft</p>
            <p>Cost: ₹18–30/sqft</p>
            <p>Features: Silk/textiles focus with ventilation.</p>
            <p>Zone: Orange</p>
            <p>Compliance: Guidance on KSPCB consents.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#ramanagara" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Ramanagara+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/hoskote-textiles.jpg" alt="Textiles warehouse in Hoskote Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Hoskote</h4>
            <p>Area: 15,000–80,000+ sqft</p>
            <p>Cost: ₹20–30/sqft</p>
            <p>Features: Multi-purpose for apparel logistics.</p>
            <p>Zone: Orange/Green</p>
            <p>Compliance: Guidance on Fire NOC.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#hoskote" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Hoskote+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <h3 className="text-xl font-medium">Aerospace/Tech Parks</h3>
      <p className="text-gray-300">Lower traction (~5%) with high-tech sheds in mixed zones for R&D and enterprise.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/devanahalli-aerospace.jpg" alt="Aerospace warehouse in Devanahalli Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Devanahalli</h4>
            <p>Area: 30,000–150,000+ sqft</p>
            <p>Cost: ₹20–32/sqft</p>
            <p>Features: High-tech for aerospace R&D.</p>
            <p>Zone: Red/Green</p>
            <p>Compliance: Guidance on customs approvals.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#devanahalli" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Devanahalli+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/bengaluru-aerospace-park.jpg" alt="Aerospace warehouse in Bengaluru Aerospace Park" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Bengaluru Aerospace Park</h4>
            <p>Area: 50,000–200,000+ sqft</p>
            <p>Cost: ₹20–35/sqft</p>
            <p>Features: MRO facilities for tech parks.</p>
            <p>Zone: Red/Orange/Green</p>
            <p>Compliance: Guidance on KSPCB consents.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#bengaluru-aerospace-park" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Bengaluru+Aerospace+Park" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src="/images/whitefield-tech.jpg" alt="Tech warehouse in Whitefield Bengaluru" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Whitefield</h4>
            <p>Area: 10,000–50,000+ sqft</p>
            <p>Cost: ₹25–40/sqft</p>
            <p>Features: IT-compatible setups for tech parks.</p>
            <p>Zone: Green</p>
            <p>Compliance: Guidance on Fire NOC.</p>
            <div className="mt-4 flex space-x-4">
              <Link href="/industrial-zones#whitefield" className="text-blue-500 hover:text-blue-300">View Zone</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=Whitefield+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
            </div>
            <div className="mt-2">
              <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</section>

<section id="zones" className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">Warehouse Listings by KIADB Zone</h2>
  <p className="mb-4 text-gray-300">Segregated by KIADB pollution categories: Red (high polluting, e.g., chemicals/pharma), Orange (moderate, e.g., food/manufacturing), Green (low, e.g., IT/logistics). Choose based on your industry needs.</p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img src="/images/red-zone-warehouse.jpg" alt="Warehouse in Red Zone Bengaluru" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold">Red Zone Example: Devanahalli</h4>
        <p>Area: 40,000–100,000+ sqft</p>
        <p>Cost: ₹20–35/sqft</p>
        <p>Features: Temperature-controlled, compliance-ready for pharma.</p>
        <p>Compliance: Guidance on obtaining Fire NOC and BBMP approvals; full compliance support.</p>
        <div className="mt-4 flex space-x-4">
          <Link href="/industrial-zones#devanahalli" className="text-blue-500 hover:text-blue-300">View Zone</Link>
          <a href="https://www.google.com/maps/search/?api=1&query=Devanahalli+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
        </div>
        <div className="mt-2">
          <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
        </div>
      </div>
    </div>
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img src="/images/orange-zone-warehouse.jpg" alt="Warehouse in Orange Zone Bengaluru" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold">Orange Zone Example: Jigani</h4>
        <p>Area: 5,000–200,000+ sqft</p>
        <p>Cost: ₹25–40/sqft</p>
        <p>Features: Versatile for food processing and textiles.</p>
        <p>Compliance: Guidance on obtaining Fire NOC and BBMP approvals; full compliance support.</p>
        <div className="mt-4 flex space-x-4">
          <Link href="/industrial-zones#jigani" className="text-blue-500 hover:text-blue-300">View Zone</Link>
          <a href="https://www.google.com/maps/search/?api=1&query=Jigani+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
        </div>
        <div className="mt-2">
          <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
        </div>
      </div>
    </div>
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img src="/images/green-zone-warehouse.jpg" alt="Warehouse in Green Zone Bengaluru" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold">Green Zone Example: Whitefield</h4>
        <p>Area: 10,000–50,000+ sqft</p>
        <p>Cost: ₹25–40/sqft</p>
        <p>Features: Eco-friendly designs for IT/logistics.</p>
        <p>Compliance: Guidance on obtaining Fire NOC and BBMP approvals; full compliance support.</p>
        <div className="mt-4 flex space-x-4">
          <Link href="/industrial-zones#whitefield" className="text-blue-500 hover:text-blue-300">View Zone</Link>
          <a href="https://www.google.com/maps/search/?api=1&query=Whitefield+Bengaluru" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded">Map</a>
        </div>
        <div className="mt-2">
          <Link href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Enquire Now</Link>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Procurement Process */}
          <section id="procurement" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Tailored Procurement Process</h2>
            <p className="mb-4 text-gray-300">Enosh Infra’s procurement process is AI-powered and sector-specific for seamless leasing:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Needs Assessment: Use our AI tool to match your requirements (e.g., quick commerce needs urban proximity; manufacturing needs load-bearing floors).</li>
              <li>Site Selection & Inspections: From trending locations like Nelamangala, we conduct evaluations.</li>
              <li>Compliance & Legal Support: Provide guidance on Fire NOC (₹10,000–50,000), BBMP approvals (₹30,000–1 lakh), and contracts (clients apply directly).</li>
              <li>Customization: Tailor for sectors—e.g., automation for e-commerce, heavy infrastructure for factories.</li>
              <li>Finalization: Transparent pricing, no hidden fees, with post-lease support. Service charge: 1 month rent + GST.</li>
            </ol>
            <p className="mt-4 text-gray-300">This process ensures 100% compliance and fits your business, faster than competitors.</p>
            <img src="/images/procurement-infographic-pastel-adjusted.jpg" alt="Infographic of AI matching dashboard and procurement flowchart" className="w-full mt-4" />
          </section>

          {/* Global CTA */}
          <CTAButtons />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  // Dynamic location images (scans /public/images/warehouses/[location]/)
  const imagesDir = path.join(process.cwd(), 'public/images/warehouses');
  const locationImages = {};
  const locationFolders = await fs.readdir(imagesDir).catch(() => []);  // Get locations
  for (const location of locationFolders) {
    const locationPath = path.join(imagesDir, location);
    if ((await fs.stat(locationPath)).isDirectory()) {
      const files = await fs.readdir(locationPath);
      const parsedImages = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png')).map(file => {
        const parts = file.split('_');
        let zone = '';
        let type = '';
        let name = file;
        if (parts.length >= 3) {
          zone = parts[0] || '';
          type = parts[1] || '';
          name = parts.slice(2).join('_');
        } else if (parts.length === 2) {
          zone = parts[0] || '';
          name = parts[1];
        }
        return { zone, type, name, path: `/images/warehouses/${location}/${file}` };
      });
      if (parsedImages.length > 0) {
        locationImages[location] = parsedImages;
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
      locationImages,  // Pass to component
    },
  };
}
