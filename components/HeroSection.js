import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  const options = [
    "Premium Warehouses in Bengaluru – Affordable & Hassle-Free",
    "Find a Tenant for Your Warehouse – Quick & Easy Listings",
    "Co-Working Spaces – Flexible, Affordable & Ready to Move In",
    "List Your Co-Working Space – Get Tenants Fast with Zero Hassle",
    "Industrial Spaces – High-Quality, Budget-Friendly & Strategic Locations",
    "Lease Your Industrial Space – Connect with Verified Tenants",
    "Commercial Spaces – Prime Locations at Competitive Prices",
    "Rent Out Your Commercial Space – Get Instant Inquiries",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % options.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gray-900 text-white bg-cover bg-center h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Enosh Infra Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Premium & Affordable Commercial Spaces in Namma Bengaluru
        </h1>

        {/* Dynamic Changing Text */}
        <motion.h2
          key={index}
          className="text-2xl md:text-3xl font-semibold mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {options[index]}
        </motion.h2>

        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Enosh Infra is your trusted partner in securing high-quality commercial, industrial, and warehouse properties in Bangalore. Elevate your business with strategic locations and seamless transactions.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-medium text-lg"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

