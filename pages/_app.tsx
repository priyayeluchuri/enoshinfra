import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Enosh Infra - Real Estate Consultancy</title>
        <meta name="description" content="Enosh Infra - Your trusted real estate consultancy for industrial, commercial, and residential properties." />
      </Head>

      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Enosh Infra</h1>
        <nav>
          <ul className="flex gap-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li className="relative group">
              <button className="focus:outline-none">Services</button>
              <ul className="absolute left-0 hidden group-hover:flex flex-col bg-white text-black shadow-lg rounded mt-2 w-48 p-2 group-hover:block">
                <li className="p-2 hover:bg-gray-200">
                  <Link href="/services/warehouse-for-rent-bangalore">Warehouse for Rent</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <main className="p-8">
        <Component {...pageProps} />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center mt-8">
        <p>&copy; {new Date().getFullYear()} Enosh Infra. All rights reserved.</p>
      </footer>
    </>
  );
}

