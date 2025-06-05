const { i18n } = require("./next-i18next.config");
const redirects = require('./config/redirects.json');

const nextConfig = {
  
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  
  assetPrefix: process.env.NODE_ENV === 'production' ? `/_next` : '',
  async headers() {
    return [
      {
        source: '/:all*(js)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          }
        ],
      },
      {
        source: '/:all*(svg|jpg|png|css)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          }
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
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