import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white relative bg-gray-900 text-white bg-cover bg-center h-[80vh] flex items-center">
     <div className="absolute inset-0">
        <Image
	src="/hero-bg.jpg"
        alt="Enosh Infra Hero Background"
        fill // Replaces legacy `layout="fill"`
        className="object-cover" // Replaces legacy `objectFit="cover"`
        priority
        sizes="100vw" // Ensures full-width responsiveness
        />
     <div className="absolute inset-0 bg-black bg-opacity-60" />
    </div> {/* Dark overlay for contrast */}
    <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Premium Commercial Spaces in Namma Bengaluru
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Enosh Infra is your trusted partner in securing high-quality commercial, industrial, and warehouse properties in Bangalore. Elevate your business with strategic locations and seamless transactions.
        </p>
      </div> 
    </section>
  );
}

