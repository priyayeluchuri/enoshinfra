/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://enoshinfra.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },
};

