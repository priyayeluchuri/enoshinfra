import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/WhatsAppbutton.module.css';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher'; // adjust the path as needed
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, ChevronRight, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Navbar() {
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  let menuTimeout, servicesTimeout;
  // Fallback text if translations are not ready yet
  const ctaText = t('navbar.cta', { defaultValue: "Need a space or looking for tenants? Let's Talk!" });
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

  const closeMenuOnItemClick = () => {
    if (isMobile) {
      setIsOpen(false); // Close the menu when a link is clicked
    }
  };
  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" locale={i18n.language}>
          <Image
            src="/fullfav.png"
            alt="Enosh Infra Logo"
            width={112} // 14 (h-14) x 8 for scaling proportionally
            height={56}
            priority // Ensures the logo loads quickly for better LCP
            sizes="(max-width: 768px) 56px, 112px" // Optimizes size for responsiveness
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        {/* Right Section (CTA + WhatsApp Button + Language Switcher) */}
        <div className="flex flex-col items-end gap-1">
          <div className="text-sm text-blue-400">
            <Link href="/contact" locale={i18n.language} className="hover:underline">
              {ctaText}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {/* WhatsApp Button */}
            <div className="text-sm">
              <Link href={`https://wa.me/+918073582033?text=${encodeURIComponent("I'm interested in your property services")}`} passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
                  <FontAwesomeIcon icon={faWhatsapp} className={styles.whatsappIcon} />
                  {t('whatsapp.cta')}
                </a>
              </Link>
            </div>
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
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
            aria-label="Toggle navigation menu"
	  >
            <Menu size={24} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 shadow-lg rounded-lg">
              <ul className="py-2">
                <li>
                  <Link href="/" className="block px-4 py-2 hover:bg-blue-500 hover:text-white"  locale={i18n.language} onClick={closeMenuOnItemClick}>{t('navbar.home')}</Link>
                </li>
                <li>
                  <Link href="/about" className="block px-4 py-2 hover:bg-blue-500 hover:text-white"  locale={i18n.language} onClick={closeMenuOnItemClick}>{t('navbar.about')}</Link>
                </li>
                <li
                  className="relative"
                  onMouseEnter={() => { clearServicesTimeout(); setIsServicesOpen(true); }}
                  onMouseLeave={closeServicesWithDelay}
                >
                  <button
                    onClick={handleServicesClick}
                    className="w-full text-left flex justify-between items-center px-4 py-2 hover:bg-blue-500 hover:text-white"
                  >
                    {t('navbar.services')} {isMobile ? <ChevronDown size={18} /> : <ChevronRight size={18} className={`transition-transform ${isServicesOpen ? 'rotate-90' : ''}`} />}
                  </button>
                  {isServicesOpen && (
                    <ul className={`absolute ${isMobile ? 'relative mt-0 w-full' : 'right-full top-0 w-56 mr-2'} bg-gray-700 rounded-md shadow-lg`}>
                      <li>
                        <Link href="/services/warehouses"  locale={i18n.language} className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={closeMenuOnItemClick}>{t('navbar.warehouses')}</Link>
                      </li>
                      <li>
                        <Link href="/services/tech-parks" locale={i18n.language}  className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={closeMenuOnItemClick}>{t('navbar.techParks')}</Link>
                      </li>
                      <li>
                        <Link href="/services/commercial-retail" locale={i18n.language}  className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={closeMenuOnItemClick}>{t('navbar.commercialRetail')}</Link>
                      </li>
                      <li>
                        <Link href="/services/co-working"  locale={i18n.language} className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={closeMenuOnItemClick}>{t('navbar.coworking')}</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link href="/contact"  locale={i18n.language} className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={closeMenuOnItemClick}>{t('navbar.contact')}</Link>
                </li>
                <li>
                  <Link href="/blogs-partners"  locale={i18n.language}  className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={closeMenuOnItemClick}>{t('navbar.blogsPartners')}</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

