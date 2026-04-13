import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import getFaq from "@lib/strapi/getFaq";
import getMainPageData from "@lib/strapi/getMainPageData";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Header from "@components/screens/header";
import Footer from "@components/screens/footer";
import FaqContent from "@components/screens/faq-content";

const FaqPage = ({ locale, menuData, faqData, fullMenuData }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
  const [leftMenuData, setLeftMenuData] = useState(menuData);

  const { seo_title, seo_description, name } = faqData.data[0];
  const seoTitle = seo_title ? seo_title : `${name} - ONLYOFFICE`;
  const seoDescription = seo_description ? seo_description : t("ONLYOFFICEMeta");

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
          title={seoTitle}
          description={seoDescription}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <Header
          t={t}
          locale={locale}
          data={fullMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <FaqContent
          t={t}
          faqData={faqData}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
          locale={locale}
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
  const faqData = await getFaq(locale, `/faq/${params.faq}`, preview);
  const fullMenuData = await getMainPageData(locale, preview);

  if (faqData.data === null || faqData.data.length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      menuData,
      faqData,
      fullMenuData,
      preview: !!preview
    },
  };
}

export default FaqPage;
