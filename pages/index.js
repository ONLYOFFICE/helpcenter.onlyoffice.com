import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import getMainPageData from "@lib/strapi/getMainPageData";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Header from "@components/screens/header";
import MainContent from "@components/screens/main-content";
import Accordion from "@components/screens/common/accordion";
import Footer from "@components/screens/footer";

const MainPage = ({ locale, data }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);

  return (
    <Layout>
     <Layout.PageHead>
        <HeadSEO
          title={t("titleIndexPage")}
          description={t("ONLYOFFICEMeta")}
        />
      </Layout.PageHead>
       <Layout.PageHeader>
        <Header
          t={t}
          locale={locale}
          data={data}
          isMain={true}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      </Layout.PageHeader>
       <Layout.SectionMain>
        <MainContent
          t={t}
          locale={locale}
          data={data}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
        <Accordion t={t} locale={locale} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, preview }) => {
  const data = await getMainPageData(locale, preview);
  const allowedLocales = ["en", "de", "fr"];

  if (!allowedLocales.includes(locale)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      data,
      preview: !!preview
    },
  };
};

export default MainPage;