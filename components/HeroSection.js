import Link from 'next/link';
export default function HeroSection() {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h2 className="text-4xl font-bold">Discover Premium Properties in Whitefield</h2>
        <p className="mt-4 text-lg">Find your dream home with Enosh Infra</p>
        <a href="/properties" className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full">Explore Now</a>
      </div>
    </section>
  );
}

