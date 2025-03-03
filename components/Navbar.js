import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  let menuTimeout;
  let servicesTimeout;

  const closeMenuWithDelay = () => {
    menuTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 300); // Delay before hiding menu
  };

  const closeServicesWithDelay = () => {
    servicesTimeout = setTimeout(() => {
      setIsServicesOpen(false);
    }, 300); // Delay before hiding services submenu
  };

  const clearMenuTimeout = () => {
    clearTimeout(menuTimeout);
  };

  const clearServicesTimeout = () => {
    clearTimeout(servicesTimeout);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          EnoshInfra
        </Link>
        
        <div className="relative" onMouseLeave={closeMenuWithDelay} onMouseEnter={clearMenuTimeout}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-800 rounded-lg hover:bg-blue-500 transition"
          >
            <Menu size={24} />
          </button>
          
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg">
              <ul className="py-2">
                <li>
                  <Link href="/" className="block px-4 py-2 hover:bg-blue-500 hover:text-white">Home</Link>
                </li>
                <li>
                  <Link href="/about" className="block px-4 py-2 hover:bg-blue-500 hover:text-white">About</Link>
                </li>
                <li 
                  className="relative"
                  onMouseEnter={() => { clearServicesTimeout(); setIsServicesOpen(true); }}
                  onMouseLeave={closeServicesWithDelay}
                >
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white">
                    Services
                  </button>
                  {isServicesOpen && (
                    <ul className="absolute right-full top-0 bg-gray-700 rounded-md mt-0 mr-2 w-56 shadow-lg">
                      <li>
                        <Link href="/services/warehouses" className="block px-4 py-2 hover:bg-blue-500 hover:text-white">Warehouses & Logistics</Link>
                      </li>
                      <li>
                        <Link href="/services/tech-parks" className="block px-4 py-2 hover:bg-blue-500 hover:text-white">Tech Parks</Link>
                      </li>
                      <li>
                        <Link href="/services/commercial-retail" className="block px-4 py-2 hover:bg-blue-500 hover:text-white">Commercial & Retail</Link>
                      </li>
                      <li>
                        <Link href="/services/co-working" className="block px-4 py-2 hover:bg-blue-500 hover:text-white">Co-working Spaces</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link href="/contact" className="block px-4 py-2 hover:bg-blue-500 hover:text-white">Contact</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

