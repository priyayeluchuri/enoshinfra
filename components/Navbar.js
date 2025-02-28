import Link from 'next/link';
import { useState } from 'react';

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
    <header className="fixed w-full bg-gray-900 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4 text-white relative">
        <h1 className="text-xl font-bold">Enosh Infra</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-400">About</Link></li>
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-gray-400">Services</button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 shadow-lg z-50">
                  <li>
                    <Link href="/services/warehouse-for-rent-bangalore" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Warehouse for Rent
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li><Link href="/contact" className="hover:text-gray-400">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

