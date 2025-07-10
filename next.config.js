const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  async redirects() {
    console.log('Applying redirects in next.config.js'); // Debug log
    return [
      {
        source: '/',
        destination: '/en/',
        permanent: true,
        locale: false,
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
