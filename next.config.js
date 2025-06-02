const { i18n } = require("./next-i18next.config");
const redirects = require('./config/redirects.json');

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000 , must-revalidate',
          }
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
  i18n,
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: '/api/preview',
        has: [
          {
            type: 'header',
            key: 'x-custom-header',
            value: '(?<preview>.*)',
          },
        ],
        destination: '/api/preview',
        permanent: false,
      },
      ...Object.keys(redirects).map((source) => {
        const { destination, permanent } = redirects[source];
        return {
          source,
          destination,
          permanent,
        };
      }),
      {
        source: "/ru/:path*",
        destination: "/:path*",
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;