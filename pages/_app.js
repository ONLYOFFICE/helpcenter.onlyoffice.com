import { appWithTranslation } from "next-i18next";
import "../styles/global-styles.css";
import PreviewBanner from "@components/common/preview-banner";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      {pageProps.preview && <PreviewBanner />}
    </>
  );
};

export default appWithTranslation(App);
