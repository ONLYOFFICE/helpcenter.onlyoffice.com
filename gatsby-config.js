const languages = require("./languages.json");
const { defaultLanguage } = require("./config.json");

const availableLanguages = languages.map((el) => el.shortKey);

module.exports = {
  siteMetadata: {
    siteUrl: "https://helpcenter.onlyoffice.com",
    title: "helpcenter-gatsby",
  },
  plugins: [
    { resolve: "gatsby-plugin-styled-components" },
    { resolve: "gatsby-plugin-image" },
    { resolve: "gatsby-plugin-sharp" },
    { resolve: "gatsby-transformer-sharp" },
    { resolve: "gatsby-plugin-react-helmet" },
    { resolve: "gatsby-transformer-json" },
    { resolve: "gatsby-transformer-remark" },
    { resolve: "gatsby-plugin-mdx" },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./static/data",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: "locale",
        languages: availableLanguages,
        defaultLanguage,
        siteUrl: "https://helpcenter.onlyoffice.com",
        redirect: false,
        i18nextOptions: {
          fallbackLng: defaultLanguage,
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [`Open Sans:200,300,400,400i,500,600,700,800`],
      },
    },
    {
      resolve: "gatsby-plugin-portal",
      options: {
        key: "portal",
        id: "portal",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.react.svg$/,
        },
      },
    }
  ],
};
