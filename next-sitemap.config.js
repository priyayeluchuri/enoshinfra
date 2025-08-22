// Fixed next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.enoshinfra.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/api/', '*/undefined', '*/locales'],
        allow: ['/llms.txt', '/sitemap.xml', '/robots.txt'],
        crawlDelay: 5,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // AI Bots with faster access
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'openai-crawler',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Gemini',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'BardBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'You-bot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'PhindBot',
        allow: '/',
        crawlDelay: 1,
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
    ],
    // REMOVED: additionalSitemaps array - this was causing the duplicate
    // The main sitemap.xml should handle all sub-sitemaps automatically
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
    '/api/*',
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
      lastmod: new Date().toISOString(),
    };

    // Special handling for key pages
    if (path === '/') {
      entry.changefreq = 'daily';
      entry.priority = 1.0;
    } else if (path === '/warehouses-for-rent') {
      entry.changefreq = 'weekly';
      entry.priority = 0.9;
    } else if (path === '/warehouse-listings' || path === '/industrial-zones') {
      entry.changefreq = 'weekly';
      entry.priority = 0.9;
      entry.lastmod = '2025-08-22';
    } else if (path === '/services' || path === '/about' || path === '/contact') {
      entry.changefreq = 'monthly';
      entry.priority = 0.8;
    }

    return entry;
  },
};
