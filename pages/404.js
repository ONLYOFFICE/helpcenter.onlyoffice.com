import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@components/layout";
import Error404 from "@components/screens/404-page";
import HeadSEO from "@components/screens/head-content";

const Error404Page = ({ locale }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Layout.PageHead>
      <HeadSEO
          title={t("Page 404")}
          metaSiteNameOg={t("Page 404")}
          metaDescription={t("Page 404")}
          metaDescriptionOg={t("Page 404")}
          currentLanguage={locale}
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
    ...(await serverSideTranslations(locale, "common")),
    locale
  },
});

export default Error404Page;