import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Quick Links */}
        <nav className="flex space-x-6">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/about" className="hover:text-blue-400">About</Link>
          <Link href="/services" className="hover:text-blue-400">Services</Link>
          <Link href="/contact" className="hover:text-blue-400">Contact</Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com/enoshinfra" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 hover:text-blue-400" />
          </a>
          <a href="https://www.twitter.com/enoshinfra" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 hover:text-blue-400" />
          </a>
          <a href="https://www.instagram.com/enoshinfra" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 hover:text-blue-400" />
          </a>
          <a href="mailto:info@enoshinfra.com">
            <Mail className="w-6 h-6 hover:text-blue-400" />
          </a>
          <a href="tel:+918073582033">
            <Phone className="w-6 h-6 hover:text-blue-400" />
          </a>
          <a href="https://wa.me/918073582033" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-6 h-6 hover:text-green-400" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-4">
        © {new Date().getFullYear()} EnoshInfra. All rights reserved.
      </div>
    </footer>
  );
}

