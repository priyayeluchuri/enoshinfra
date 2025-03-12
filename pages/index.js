import SEO from '../components/seo';
import HeroSection from '../components/HeroSection';
// import PropertyList from '../components/PropertyList';

export default function Home() {
  return (
    <>
      <SEO 
        title="Enosh Infra - Rent or Lease Industrial Spaces, co working spaces, tech parks, commercial and retail spaces in Bengaluru"
        description="Connect with Enosh Infra to rent out your industrial, commercial, godowns and warehouse spaces or find the perfect property in Bengaluru's prime industrial hubs like Nelamangala, Peenya, Bommasandra, Jigani, Hoskote, Kumbalgodu, Doddaballapura, Hebbal, Whitefield, HSR and KIADB industrial areas."
        url="https://www.enoshinfra.com"
        image="https://www.enoshinfra.com/hero-bg.jpg" // Replace with the actual image URL
      />

      <HeroSection />
      {/* <PropertyList /> */}
    </>
  );
}

