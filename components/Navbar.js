import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Arrow icon

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setIsDropdownOpen(false); 
    }, 200); // Delay hiding the menu
  };

  return (
    <header className="fixed w-full bg-gray-900 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        <h1 className="text-xl font-bold text-white">Enosh Infra</h1>
        <nav>
          <ul className="flex space-x-6 text-white">
            <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-blue-400 flex items-center">
                Services <ChevronDown size={16} className="ml-1" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-56 bg-gray-800 border border-gray-700 shadow-lg rounded-lg z-50">
                  <li><Link href="/services/warehouses" className="block px-4 py-3 hover:bg-gray-700">Warehouses & Logistics</Link></li>
                  <li><Link href="/services/tech-parks" className="block px-4 py-3 hover:bg-gray-700">Tech Parks</Link></li>
                  <li><Link href="/services/commercial-retail" className="block px-4 py-3 hover:bg-gray-700">Commercial & Retail</Link></li>
                  <li><Link href="/services/co-working" className="block px-4 py-3 hover:bg-gray-700">Co-working Spaces</Link></li>
                </ul>
              )}
            </li>
            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

