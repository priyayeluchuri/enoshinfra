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
              "frame-src 'self' https://www.google.com https://*.google.com https://*.googleapis.com;", // Allow Google Maps iframes
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
        // Special headers for llms.txt and AI-friendly files
        source: '/llms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // Cache for 24 hours
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow', // Ensure AI bots can index
          },
        ],
      },
      {
        // Headers for robots.txt
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600', // Cache for 1 hour
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
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow', // Prevent API routes from being indexed
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Redirect explicit /en/ URLs to clean URLs (for default locale)
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // Add redirect for common AI bot requests
      {
        source: '/ai.txt',
        destination: '/llms.txt',
        permanent: true,
      },
      {
        source: '/llm.txt', // Common alternative name
        destination: '/llms.txt',
        permanent: true,
      },
    ]; 
  },

  // Additional configuration for better AI bot compatibility
  async rewrites() {
    return [
      {
        source: '/ai-guidelines',
        destination: '/llms.txt',
      },
    ];
  },
};
