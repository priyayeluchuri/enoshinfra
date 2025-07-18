// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.enoshinfra.com', // Your base domain
  generateRobotsTxt: true, // Generate robots.txt
  sitemapSize: 7000, // Max URLs per sitemap file, adjust as needed
  changefreq: 'weekly', // Default change frequency for URLs
  priority: 0.7, // Default priority for URLs

  // **REQUIRED for i18n sitemaps**
  // Define your locales here, matching your next-i18next.config.js
  i18n: {
    locales: ['en', 'hi', 'kn', 'te', 'zh', 'ja', 'ar', 'ru', 'fr', 'de'],
    defaultLocale: 'en',
  },

  // Exclude specific paths if necessary (e.g., dynamic routes you don't want in sitemap)
  exclude: [
    '/404', // Exclude 404 page
    '/api/*', // Your existing API exclude rule
    // Potentially exclude other dynamic paths if they shouldn't be directly indexed
  ],

  // **CRUCIAL: This transform function handles i18n logic and canonicalization**
  transform: async (config, path) => {
    // Determine the base path without any locale prefix (e.g., '/about' from '/en/about')
    // This regex looks for any of your defined locales at the start of the path
    const nonLocalePath = path.replace(/^\/(en|hi|kn|te|zh|ja|ar|ru|fr|de)/, '');

    // 1. Exclude the non-prefixed root path (e.g., '/') from the sitemap.
    //    Also exclude any non-locale-prefixed paths if they should canonicalize to /en/ versions.
    //    We explicitly allow paths that start with a locale (e.g., /en, /hi/about)
    if (path === '/' || (config.i18n.locales.includes(path.split('/')[1]) === false && path !== '/404')) {
      return null; // Return null to exclude this path from the sitemap
    }

    // 2. Generate alternate URLs for hreflang tags for all other paths
    const alternateRefs = config.i18n.locales.map((locale) => {
      // Construct the full URL for each locale version of the current page
      const localeHref = `${config.siteUrl}/${locale}${nonLocalePath}`;

      return {
        href: localeHref,
        hreflang: locale,
      };
    });

    // 3. Add x-default hreflang pointing to the default locale's prefixed URL
    //    This is for users whose browser language doesn't match any specific locale.
    alternateRefs.push({
      href: `${config.siteUrl}/${config.i18n.defaultLocale}${nonLocalePath}`,
      hreflang: 'x-default',
    });

    // Return the sitemap entry for the current path
    return {
      loc: `${config.siteUrl}${path}`, // The canonical URL for this specific sitemap entry (e.g., https://www.enoshinfra.com/en/about)
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.lastmod, // next-sitemap automatically sets this to build time
      alternateRefs: alternateRefs, // The array of hreflang tags
    };
  },
  // If you want to customize robots.txt beyond simple allow/disallow:
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    // Add any sitemap specific instructions if you have multiple sitemaps
    // sitemap: 'https://www.enoshinfra.com/sitemap.xml',
  },
};
