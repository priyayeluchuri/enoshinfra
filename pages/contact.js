// pages/contact.js
import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - Enosh Infra</title>
        <meta name="description" content="Get in touch with Enosh Infra for expert real estate consultancy." />
      </Head>
      <main className="p-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-4">Reach us at:</p>
        <p>Email: info@enoshinfra.com</p>
        <p>Phone: (+91) 8073582033</p>
      </main>
    </>
  );
}

