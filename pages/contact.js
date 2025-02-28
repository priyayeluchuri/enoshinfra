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
        <br></br>
	<p className="mt-4">
	  We’d love to hear from you!
	</p>
	 <p> Whether you have a question, need expert real estate advice, or are ready to find the perfect commercial space, our team is here to help.
	</p>
	<br></br>
        <p>Email: info@enoshinfra.com</p>
        <p>Phone: (+91) 8073582033</p>
	<br></br>
	<p>Let’s connect and make your business expansion seamless and stress-free!</p>
      </main>
    </>
  );
}

