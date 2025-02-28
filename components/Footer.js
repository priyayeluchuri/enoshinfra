import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 text-left mt-auto">
      <div className="container mx-auto flex justify-between">
        <div>
          <h5 className="font-bold">Enosh Infra</h5>
          <p className="mt-2">193, LakeView Address, Electronic City, Bengaluru</p>
          <p>Email: info@enoshinfra.com</p>
          <p>Phone: (+91) 8073582033</p>
        </div>
        <div className="text-right">
          <h5 className="font-bold">Quick Links</h5>
          <ul className="mt-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

