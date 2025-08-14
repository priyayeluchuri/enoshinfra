// next.config.js
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  reactStrictMode: true,
  trailingSlash: true,
  async headers() {
    return [
      {
        // Apply to all non-API routes, including localized ones (e.g., /en, /hi)
        source: '/((?!api).*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Block all iframe embedding
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "frame-ancestors 'none';", // Block all iframe embedding
              "default-src 'self';", // Default to same-origin resources
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com https://maps.googleapis.com;", // Allow GA, GTM, and Maps scripts
              "style-src 'self' 'unsafe-inline';", // Allow inline styles for Next.js
              "img-src 'self' data: https://*.googleapis.com https://*.gstatic.com;", // Allow images for Maps
              "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;", // Allow Google Fonts if used
              "connect-src 'self' https://www.enoshinfra.com https://www.google-analytics.com https://www.googletagmanager.com https://maps.googleapis.com https://*.googleapis.com;", // Allow form submissions and API calls
              "form-action 'self';", // Restrict form submissions to same origin
            ].join(' '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevent MIME-type sniffing
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Enable XSS filtering for older browsers
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Control referrer information
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains', // Enforce HTTPS
          },
        ],
      },
      {
        // Apply to API routes (e.g., /api/properties)
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Protect API routes from iframe embedding
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.enoshinfra.com', // Restrict API access to your domain
          },
        ],
      },
    ];
  },

  async redirects() {
    console.log('Applying redirects in next.config.js');
    return [
      // Redirect explicit /en/ URLs to clean URLs (for default locale)
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ]; 
  },
};
