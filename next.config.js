const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en/',
        permanent: true,
        locale: false, // Apply before locale routing
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'enoshinfra.com' }],
        destination: 'https://www.enoshinfra.com/:path*',
        permanent: true,
      },
    ];
  },
};
