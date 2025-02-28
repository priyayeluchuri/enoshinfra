// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Enosh Infra</title>
        <meta name="description" content="Learn more about Enosh Infra, a trusted real estate consultancy firm." />
      </Head>
      <main className="p-8">
        <h1 className="text-3xl font-bold">About Enosh Infra</h1>
        <p className="mt-4">We specialize in industrial, commercial, and residential real estate consultancy.</p>
      </main>
    </>
  );
}

