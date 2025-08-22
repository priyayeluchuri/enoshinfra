import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

export default function HeroSection() {
  const { t,i18n } = useTranslation('common');
  const options = t('hero.options', { returnObjects: true });

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
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
         {t('hero.headline')}
	</h1>

        {/* Dynamic Changing Text */}
        <motion.h2
          key={index}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {options[index]}
        </motion.h2>

        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
         {t('hero.subheadline')}
	</p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
	    href={`/${i18n.language}/contact`} 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-medium text-base sm:text-lg"
          >
            {t('hero.cta')}
          </a>
          <a
            href="/warehouse-listings"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg text-white font-medium text-base sm:text-lg"
          >
            Check Listings
          </a>
	  <a
            href="/services"
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 transition rounded-lg text-white font-medium text-base sm:text-lg"
          >
            Our Services
          </a>

        </div>
      </div>
    </section>
  );
}
