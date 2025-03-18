import Head from "next/head";
import Script from "next/script";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import languages from "@config/languages.json";

const HeadSEO = ({
    title,
    description
  }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta id="ctl00_MetaSiteNameOG" property="og:site_name" content={title} />
        <meta id="ctl00_MetaTitleOG" property="og:title" content={title} />
        <meta id="ctl00_MetaDescriptionOG" property="og:description" content={description} />
        <meta property="og:url" content="https://helpcenter.onlyoffice.com/" />
        <meta id="ctl00_MetaImageOG" property="og:image" content="https://static.onlyoffice.com/studio/tag/personal.11.5.3/skins/default/images/logo/fb_icon_325x325.jpg" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3, shrink-to-fit=no, viewport-fit=cover" />
        <meta id="ctl00_MetaKeywords" name="keywords" content={title} />
        <meta name="description" content={description} />
        <link rel="icon" href="https://static-helpcenter.onlyoffice.com/images/favicon.ico" sizes="192x192" />
        <link rel="apple-touch-icon" href="https://static-helpcenter.onlyoffice.com/images/favicon.ico" />
        <meta name="google" content="notranslate" />
        <meta name="google" content="nositelinkssearchbox" />
        <link rel="canonical" href={`https://helpcenter.onlyoffice.com${router.locale === "en" ? "" : `/${router.locale}`}${router.asPath.replace(/^.*\/\/[^/]+/, "") === null ? "" : router.asPath.replace(/^.*\/\/[^/]+/, "")}`} />

        {languages.map((lng) => {
          const { key, shortKey } = lng;

          return (
            <link
              key={key}
              rel="alternate"
              hrefLang={key}
              href={`https://helpcenter.onlyoffice.com${shortKey === "en" ? "" : `/${shortKey}`}${router.asPath.replace(/^.*\/\/[^/]+/, "") === null ? "" : router.asPath.replace(/^.*\/\/[^/]+/, "")}`}
            />
          );
        })}
      </Head>
      <Script
        id="googletagmanager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5NW47TX');
        `,
        }}
      />
    </>
  );
};

HeadSEO.propTypes = {
  /** Title for your HTML document */
  title: PropTypes.string,
  /** Description of your web page */
  description: PropTypes.string
};

HeadSEO.defaultProps = {
  title: null,
  description: null
};

export default HeadSEO;
