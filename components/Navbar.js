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
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        <h1 className="text-xl font-bold">Enosh Infra</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
            <li 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-blue-600">Services</button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50">
                  <li>
                    <Link href="/services/warehouse-for-rent-bangalore" className="block px-4 py-2 hover:bg-gray-100">
                      Warehouse for Rent
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

