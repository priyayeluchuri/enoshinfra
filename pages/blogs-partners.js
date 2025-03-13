import SEO from '../components/seo';
import Link from 'next/link';

export default function BlogsPartners() {
  return (
    <>
      <SEO
        title="Blogs & Partners - Enosh Infra"
        description="Explore insightful blogs and valuable partnerships in the commercial real estate sector with Enosh Infra. Discover industry trends, property insights, and collaboration opportunities."
        url="https://enoshinfra.com/blogs-partners"
      />
      <section className="w-full h-auto p-6 pt-12 text-white bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">Blogs & Partnerships</h1>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Latest Blogs</h2>
            <p className="text-lg mb-6">Stay informed with our latest blogs covering industrial spaces, commercial leasing trends, and property investment insights.</p>
            <ul className="space-y-4">
              <li>
                <Link href="/blogs/guide-setup-it-tech-startup" className="text-blue-500 hover:underline">From Idea to Office: Setting Up Your IT Startup in Bengaluru Made Easy</Link>
              </li>
              <li>
                <Link href="/blogs/guide-setup-business-bengaluru" className="text-blue-500 hover:underline">New to Bengaluru? Step by Step Guide on How to Set Up Your Business Space with Our Guidance</Link>
              </li>
              <li>
                <Link href="/blogs/optimizing-warehouse-efficiency" className="text-blue-500 hover:underline">Keep Optimizing Warehouse Space for Maximum Efficiency</Link>
              </li>
              <li>
                <Link href="/blogs/top-industrial-areas-bengaluru" className="text-blue-500 hover:underline">Top Industrial Areas in Bengaluru for Business Growth</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4">Partnership Opportunities</h2>
            <p className="text-lg mb-6">Collaborate with Enosh Infra to gain access to prime industrial and commercial properties, strategic marketing initiatives, and dedicated support.</p>
            <ul className="list-disc list-inside mb-4">
              <li>Access to exclusive property listings in Bengaluru's prime locations.</li>
              <li>Collaborative marketing initiatives for wider outreach.</li>
              <li>Dedicated support for long-term partnership success.</li>
            </ul>
            <Link href="/contact" className="text-blue-500 hover:underline">Join Our Partnership Program</Link>
          </div>
        </div>
      </section>
    </>
  );
}

