import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, ChevronRight, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  let menuTimeout, servicesTimeout;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile = width < 768px
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenuWithDelay = () => {
    menuTimeout = setTimeout(() => setIsOpen(false), 300);
  };

  const closeServicesWithDelay = () => {
    servicesTimeout = setTimeout(() => setIsServicesOpen(false), 300);
  };
  
  const clearMenuTimeout = () => clearTimeout(menuTimeout);
  const clearServicesTimeout = () => clearTimeout(servicesTimeout);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServicesClick = () => {
    setIsServicesOpen(true);
    setTimeout(() => {
      router.push('/services');
    }, 200);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
        <Image
        src="/fullfav.png"
        alt="Enosh Infra Logo"
        width={112} // 14 (h-14) x 8 for scaling proportionally
        height={56} 
        priority // Ensures the logo loads quickly for better LCP
        sizes="(max-width: 768px) 56px, 112px" // Optimizes size for responsiveness
        />
	</Link>
	  {/* CTA Text - Adapts to Mobile and Desktop */}
        <div className="text-sm text-blue-400">
          <Link href="/contact" className="hover:underline">
            Need a space or looking for tenants? Let's Talk!
          </Link>
        </div>
        {/* Mobile & Desktop Menu */}
        <div
          className="relative"
          ref={menuRef}
          onMouseLeave={closeMenuWithDelay}
          onMouseEnter={clearMenuTimeout}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-800 rounded-lg hover:bg-blue-500 transition"
          >
            <Menu size={24} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 shadow-lg rounded-lg">
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
                  <button 
		   onClick={handleServicesClick}
		   className="w-full text-left flex justify-between items-center px-4 py-2 hover:bg-blue-500 hover:text-white">
                    Services {isMobile ? <ChevronDown size={18} /> : <ChevronRight size={18} className={`transition-transform ${isServicesOpen ? 'rotate-90' : ''}`} />}
                  </button>

                  {isServicesOpen && (
                    <ul className={`absolute ${isMobile ? 'relative mt-0 w-full' : 'right-full top-0 w-56 mr-2'} bg-gray-700 rounded-md shadow-lg`}>
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
		<li>
                  <Link href="/blogs-partners" className="block px-4 py-2 hover:bg-blue-500 hover:text-white">Blogs & Partners</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

