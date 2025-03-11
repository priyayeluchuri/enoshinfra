import SEO from '../components/seo';
import HeroSection from '../components/HeroSection';
// import PropertyList from '../components/PropertyList';

export default function Home() {
  return (
    <>
      <SEO 
        title="Enosh Infra - Find Your Perfect Space"
        description="Discover the best industrial, commercial, and residential properties with Enosh Infra."
        url="https://www.enoshinfra.com"
        image="https://www.enoshinfra.com/hero-bg.jpg" // Replace with the actual image URL
      />

      <HeroSection />
      {/* <PropertyList /> */}
    </>
  );
}

