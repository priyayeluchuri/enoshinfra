import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Enosh Infra - Real Estate Consultancy</title>
        <meta name="description" content="Your trusted real estate consultancy for industrial, commercial, and residential properties." />
      </Head>
      <Navbar />
      
      {/* Add padding-bottom equal to footer height */}
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>

      <Footer />
    </div>
  );
}

export default MyApp;

