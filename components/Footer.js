import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white p-6 text-center mt-auto">
      <div className="container mx-auto flex justify-between">
        <div>
          <h5 className="font-bold">Enosh Infra</h5>
          <p className="mt-2">1234 Street Name, City, State, 56789</p>
          <p>Email: info@enoshinfra.com</p>
          <p>Phone: (+91) 8073582033</p>
        </div>
        <div className="text-right">
          <h5 className="font-bold">Quick Links</h5>
          <ul className="mt-2 space-y-2">
            <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-400">About</Link></li>
            <li><Link href="/services" className="hover:text-gray-400">Services</Link></li>
            <li><Link href="/contact" className="hover:text-gray-400">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

