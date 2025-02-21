import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import getArticle from "@lib/strapi/getArticle";
import getCategoriesMenu from "@lib/strapi/getCategoriesMenu";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Header from "@components/screens/header";
import ArticleContent from "@components/screens/article-content";
import Footer from "@components/screens/footer";

const Level5Page = ({ locale, data, categoriesMenuData, categorySlug }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);

  const categorySlugSingular = categorySlug === "docs" ? "doc" : categorySlug;
  const articleData = data.data?.[0]?.attributes;

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={articleData.seo_title || articleData.title ? `${articleData.title} - ONLYOFFICE` : `${t('HelpCenter')} - ONLYOFFICE`}
          description={articleData.seo_description || t("ONLYOFFICEMeta")}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <Header
          t={t}
          locale={locale}
          data={categoriesMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <ArticleContent
          t={t}
          locale={locale}
          categoryName={articleData[`category_${categorySlug}`]?.data?.attributes?.general_category.data.attributes.name || articleData[`level_2_${categorySlugSingular}`]?.data?.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.name || articleData[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.name || articleData[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.name}
          categoryUrl={articleData[`category_${categorySlug}`]?.data?.attributes?.general_category.data.attributes.url || articleData[`level_2_${categorySlugSingular}`]?.data?.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.url || articleData[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.url || articleData[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.url}
          level2CategoryName={articleData[`category_${categorySlug}`]?.data?.attributes?.name || articleData[`level_2_${categorySlugSingular}`]?.data?.attributes[`category_${categorySlugSingular}`].data.attributes.name || articleData[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.name || articleData[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.name}
          level2CategoryUrl={articleData[`category_${categorySlug}`]?.data?.attributes?.url || articleData[`level_2_${categorySlugSingular}`]?.data?.attributes[`category_${categorySlugSingular}`].data.attributes.url || articleData[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.url || articleData[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.url}
          level3CategoryName={articleData[`level_2_${categorySlugSingular}`]?.data?.attributes?.name || articleData[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes.name || articleData[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes.name}
          level3CategoryUrl={articleData[`level_2_${categorySlugSingular}`]?.data?.attributes?.url || articleData[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes.url || articleData[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes.url}
          level4CategoryName={articleData[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes?.name || articleData[`level_3_${categorySlugSingular}`]?.data?.attributes.name}
          level4CategoryUrl={articleData[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes?.url || articleData[`level_3_${categorySlugSingular}`]?.data?.attributes.url}
          pageName={articleData?.title}
          pageDescription={articleData?.content}
          tags={articleData?.tags}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, params }) => {
  const data = await getArticle(locale, params.page, `${locale === "en" ? "" : `/${locale}`}/${params.page}/${params.level2}/${params.level3}/${params.level4}/${params.level5}`);
  const categoriesMenuData = await getCategoriesMenu(locale);

  if (!data?.data?.length) {
    if (locale !== "en") {
      return {
        redirect: {
          destination: `/${params.page}/${params.level2}/${params.level3}/${params.level4}/${params.level5}`,
          permanent: false
        }
      };
    }
    else  {
      return {
        notFound: true
      };
    }
  } 

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      data,
      categoriesMenuData,
      categorySlug: params.page
    },
  };
};

export default Level5Page;