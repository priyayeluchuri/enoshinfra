import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/seo';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Enosh Infra - Rent or Lease Industrial Spaces, co working spaces, tech parks, commercial and retail spaces in Bengaluru"
        description="Connect with Enosh Infra to rent out your industrial, commercial, godowns and warehouse spaces or find the perfect property in Bengaluru's prime industrial hubs like Nelamangala, Peenya, Bommasandra, Jigani, Hoskote, Kumbalgodu, Doddaballapura, Hebbal, Whitefield, HSR and KIADB industrial areas."
        url="https://www.enoshinfra.com"
        image="https://www.enoshinfra.com/default-og-image.jpg" 
      />
      <Navbar />
      
      {/* Add padding-bottom equal to footer height */}
      <main className="flex-grow mt-16">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;

