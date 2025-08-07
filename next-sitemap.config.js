module.exports = {
  siteUrl: 'https://www.enoshinfra.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  alternateRefs: [
    'en',
    'hi',
    'kn',
    'te',
    'zh',
    'ja',
    'ar',
    'ru',
    'fr',
    'de',
  ],
  exclude: [
    '/api/*', // Exclude all API routes
  ],
  transform: async (config, path) => {
    if (path === '/') return { loc: path, changefreq: 'daily', priority: 1.0 };
    if (path.startsWith('/warehouses-for-rent')) return { loc: path, changefreq: 'weekly', priority: 0.9 };
    return { loc: path, changefreq: config.changefreq, priority: config.priority };
  },
};
