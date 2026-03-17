import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Error404 from "@components/screens/404-content";

const Error404Page = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={t("Page 404")}
          description={t("Page 404")}
        />
      </Layout.PageHead>
      <Layout.SectionMain>
        <Error404 t={t} />
      </Layout.SectionMain>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"]))
  },
});

export default Error404Page;