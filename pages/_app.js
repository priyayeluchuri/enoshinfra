import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/seo';

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Enosh Infra - Real Estate Consultancy" 
        description="Your trusted real estate consultancy for industrial, commercial, and residential properties." 
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

