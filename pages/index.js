import SEO from '../components/seo';
import HeroSection from '../components/HeroSection';
// import PropertyList from '../components/PropertyList';

export default function Home() {
  return (
    <>
      <SEO
	title="Enosh Infra - Rent or Lease Industrial, Commercial & Office Spaces in Bengaluru"
        description="Discover premium industrial, commercial, and co-working spaces for rent or lease in Bengaluru. Explore prime hubs like Nelamangala, Peenya, Bommasandra, Jigani, Hoskote, Kumbalgodu, Doddaballapura, Hebbal, Whitefield, HSR, and KIADB industrial areas with Enosh Infra."
        url="https://enoshinfra.com"
        //image="https://www.enoshinfra.com/hero-bg.jpg" // Replace with the actual image URL
      />

      <HeroSection />
      {/* <PropertyList /> */}
    </>
  );
}

