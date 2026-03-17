import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import getFunctions from "@lib/strapi/getFunctions";
import Layout from "@components/layout";
import Header from "@components/screens/header";
import Footer from "@components/screens/footer";
import HeadSEO from "@components/screens/head";
import ArticleContent from "@components/screens/article-content";

const FunctionsPage = ({ locale, menuData, functions }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
  const [leftMenuData, setLeftMenuData] = useState(menuData);
  const { title, content, tags, videos } = functions.data[0];

  useEffect(() => {
    const loadData = async () => {
      const data = await getLeftMenu(locale);
      setLeftMenuData(data);
    };

    loadData();
  }, []);

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={`${title} - ONLYOFFICE`}
          description={""}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <Header
          t={t}
          locale={locale}
          data={menuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <ArticleContent
          t={t}
          locale={locale}
          categorySlug={"docs"}
          pageDescription={content}
          tags={tags}
          leftMenuIsOpen={leftMenuIsOpen}
          pageName={title}
          leftMenuData={leftMenuData}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
          videos={videos}
        />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export async function getServerSideProps({ locale, params, preview }) {
  const menuData = await getLeftMenu(locale, true, preview);
  const functions = await getFunctions(locale, locale === "en" ? `functions/${params.functions}` : `/${locale}/functions/${params.functions}`, preview);

  if (functions.data.length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      menuData,
      functions,
      preview: !!preview
    },
  };
}

export default FunctionsPage;
