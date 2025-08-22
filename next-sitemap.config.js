module.exports = {
  siteUrl: 'https://www.enoshinfra.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/api/', '*/undefined', '*/locales'],
        crawlDelay: 5,
      },
      {
        userAgent: 'Googlebot',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'Gemini',
        allow: '/',
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'You-bot',
        allow: '/',
      },
      {
        userAgent: 'PhindBot',
        allow: '/',
      },
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'openai-crawler',
        allow: '/',
      },
    ],
  },
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
    '/hi/warehouses-for-rent',
    '/kn/warehouses-for-rent',
    '/te/warehouses-for-rent',
    '/zh/warehouses-for-rent',
    '/ja/warehouses-for-rent',
    '/ar/warehouses-for-rent',
    '/ru/warehouses-for-rent',
    '/fr/warehouses-for-rent',
    '/de/warehouses-for-rent',
    '/hi/warehouse-listings',
    '/kn/warehouse-listings',
    '/te/warehouse-listings',
    '/zh/warehouse-listings',
    '/ja/warehouse-listings',
    '/ar/warehouse-listings',
    '/ru/warehouse-listings',
    '/fr/warehouse-listings',
    '/de/warehouse-listings',
    '/hi/industrial-zones',
    '/kn/industrial-zones',
    '/te/industrial-zones',
    '/zh/industrial-zones',
    '/ja/industrial-zones',
    '/ar/industrial-zones',
    '/ru/industrial-zones',
    '/fr/industrial-zones',
    '/de/industrial-zones',
  ],
  transform: async (config, path) => {
    if (path.includes('/warehouses-for-rent') && path !== '/warehouses-for-rent') {
      return null;
    }
    if (path.includes('/warehouse-listings') && path !== '/warehouse-listings') {
      return null;
    }
    if (path.includes('/industrial-zones') && path !== '/industrial-zones') {
      return null;
    }

    let entry = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),  // General: Use build-time date for most pages
    };

    // Special handling for key pages
    if (path === '/') {
      entry.changefreq = 'daily';
      entry.priority = 1.0;
    } else if (path === '/warehouses-for-rent') {
      entry.changefreq = 'weekly';
      entry.priority = 0.9;
    } else if (path === '/warehouse-listings' || path === '/industrial-zones') {
      entry.changefreq = 'weekly';  // Signal frequent updates
      entry.priority = 0.9;  // Higher priority for new pages
      entry.lastmod = '2025-08-22';  // Mark as recently updated (current date)
    }

    return entry;
  },
  additionalSitemaps: [
    'https://www.enoshinfra.com/sitemap-0.xml',
  ],
};
