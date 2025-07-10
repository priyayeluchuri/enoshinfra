import { useState, useEffect } from 'react'; // Import useState and useEffect
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence for smooth transitions

const ITEMS_PER_PAGE = 3; // Define how many items to show at a time

export default function PropertyOverview() {
  const { t } = useTranslation('common');
  const propertyOverview = t('propertyOverview', { returnObjects: true });

  const services = propertyOverview.services || []; // Ensure services is an array
  const locations = propertyOverview.locationList || [];

  const [currentServicePage, setCurrentServicePage] = useState(0);
  const [currentLocationPage, setCurrentLocationPage] = useState(0);

  // Effect for cycling services
  useEffect(() => {
    if (services.length === 0) return;
    const maxServicePages = Math.ceil(services.length / ITEMS_PER_PAGE);
    const interval = setInterval(() => {
      setCurrentServicePage((prevPage) => (prevPage + 1) % maxServicePages);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [services.length]); // Re-run if services length changes

  // Effect for cycling locations
  useEffect(() => {
    if (locations.length === 0) return;
    const maxLocationPages = Math.ceil(locations.length / ITEMS_PER_PAGE);
    const interval = setInterval(() => {
      setCurrentLocationPage((prevPage) => (prevPage + 1) % maxLocationPages);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [locations.length]); // Re-run if locations length changes

  const getDisplayedItems = (arr, currentPage) => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    return arr.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const displayedServices = getDisplayedItems(services, currentServicePage);
  const displayedLocations = getDisplayedItems(locations, currentLocationPage);

  return (
    <section className="relative py-12 bg-gray-900 text-white h-[80vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {propertyOverview.title}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto overflow-y-auto h-[calc(80vh-180px)] p-4 custom-scrollbar">
          {/* Services Section */}
          <div className="flex-1 text-base md:text-lg bg-gray-800 p-6 rounded-lg flex flex-col justify-start"> {/* Added justify-start for alignment */}
            <h3 className="text-xl md:text-2xl font-semibold mb-4">{propertyOverview.servicesHeading}</h3>
            <ul className="list-disc list-inside mt-2 space-y-2 flex-grow"> {/* Adjusted mt-2 for closer alignment */}
              <AnimatePresence mode='wait'>
                {displayedServices.map((service, index) => (
                  <motion.li
                    key={service} // Use service itself as key assuming uniqueness
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    {service}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Locations Section */}
          <div className="flex-1 text-base md:text-lg bg-gray-800 p-6 rounded-lg flex flex-col justify-start"> {/* Added justify-start for alignment */}
            <h3 className="text-xl md:text-2xl font-semibold mb-4">{propertyOverview.locationsHeading}</h3>
            <ul className="list-disc list-inside mt-2 space-y-2 flex-grow"> {/* Adjusted mt-2 for closer alignment */}
              <AnimatePresence mode='wait'>
                {displayedLocations.map((location, index) => (
                  <motion.li
                    key={location} // Use location itself as key assuming uniqueness
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    {location}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles (optional, add to globals.css if you want to reuse) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937; /* Footer background */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6; /* Blue */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #60a5fa; /* Lighter blue */
        }
      `}</style>
    </section>
  );
}
