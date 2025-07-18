// next.config.js
const { i18n } = require('./next-i18next.config'); // Ensure this path is correct

module.exports = {
  i18n, // Essential for Next.js i18n routing
  reactStrictMode: true, // Recommended for Next.js apps
  // Add other Next.js config options here if you have them

  async redirects() {
    console.log('Applying redirects in next.config.js'); // Debug log will still show if function runs
    return [
      // IMPORTANT: The redirect for source: '/' to destination: '/en' is REMOVED.
      // Next.js's built-in i18n routing will now serve the defaultLocale's content ('en')
      // directly at the root URL (e.g., http://localhost:3000/ or https://www.enoshinfra.com/).
      // Your SEO component will then set the canonical tag to https://www.enoshinfra.com/en/.

      // You can keep other redirects here if you have them,
      // for example, to enforce locale prefixes for non-locale-prefixed paths:
      // {
      //   // This redirect will catch any path that does NOT start with a valid locale
      //   // and redirect it to the default locale's version (e.g., /about -> /en/about)
      //   // Be careful with this regex, ensure it accurately excludes _next, static, api, etc.
      //   source: '/:path((?!_next|static|public|api|en|hi|kn|te|zh|ja|ar|ru|fr|de).*)/', // Paths that don't start with known locales
      //   destination: '/en/:path', // Redirect to the English version
      //   permanent: true,
      // },
      // {
      //   source: '/:path((?!_next|static|public|api|en|hi|kn|te|zh|ja|ar|ru|fr|de).*)*', // Catch all other non-locale paths
      //   destination: '/en/:path*', // Redirect to the English version
      //   permanent: true,
      // },
    ];
  },
};
