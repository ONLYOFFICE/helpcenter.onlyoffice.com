import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import getTags from "@lib/strapi/getTags";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import Layout from "@components/layout";
import Header from "@components/screens/header";
import Footer from "@components/screens/footer";
import HeadSEO from "@components/screens/head";
import TagsContent from "@components/screens/tags-content";

const TagsPage = ({ locale, menuData, tagsData }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
  const [leftMenuData, setLeftMenuData] = useState(menuData);

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
          title={`${t('Tags')} - ONLYOFFICE`}
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
        <TagsContent
          t={t}
          locale={locale}
          tagsData={tagsData}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
        />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, preview }) => {
  const menuData = await getLeftMenu(locale, true, preview);
  const tagsData = await getTags(locale, preview);

  if (tagsData.data === null || tagsData.data.length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      menuData,
      tagsData,
      preview: !!preview
    },
  };
};

export default TagsPage;