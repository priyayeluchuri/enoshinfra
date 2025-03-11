import Link from 'next/link';

export default function PartnershipProgram() {
  return (
    <section className="w-full h-[85vh] p-6 pt-12 text-white bg-gray-900 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-4">Partner with Enosh Infra</h1>
      <p className="text-lg max-w-2xl text-center mb-6">
        Join our exclusive partnership program and be a part of Bengaluru's leading infrastructure growth. Collaborate with us to offer premium commercial spaces that drive business success.
      </p>
      <div className="space-y-4">
        <p>Benefits of partnering with Enosh Infra:</p>
        <ul className="list-disc list-inside">
          <li>Access to prime property listings</li>
          <li>Collaborative marketing initiatives</li>
          <li>Dedicated partnership support</li>
        </ul>
        <p>Interested in joining us? <Link href="/contact" className="text-blue-400 hover:underline">Contact us</Link> today to start the conversation.</p>
      </div>
    </section>
  );
}

