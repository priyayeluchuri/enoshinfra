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
    // Exclude translated versions of English-only pages
    '/hi/warehouses-for-rent',
    '/kn/warehouses-for-rent',
    '/te/warehouses-for-rent',
    '/zh/warehouses-for-rent',
    '/ja/warehouses-for-rent',
    '/ar/warehouses-for-rent',
    '/ru/warehouses-for-rent',
    '/fr/warehouses-for-rent',
    '/de/warehouses-for-rent',
  ],
  transform: async (config, path) => {
    // Exclude any remaining translated warehouses paths that might slip through
    if (path.includes('/warehouses-for-rent') && path !== '/warehouses-for-rent') {
      return null; // This excludes the path from sitemap
    }
    
    if (path === '/') return { loc: path, changefreq: 'daily', priority: 1.0 };
    if (path === '/warehouses-for-rent') return { loc: path, changefreq: 'weekly', priority: 0.9 };
    return { loc: path, changefreq: config.changefreq, priority: config.priority };
  },
};
