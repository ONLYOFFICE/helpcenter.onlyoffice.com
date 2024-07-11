import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getCategoriesMenu from "@lib/strapi/getCategoriesMenu";
import getCategoryLevel3 from "@lib/strapi/getCategoryLevel3";
import Layout from "@components/layout";
import HeadingContent from "@components/screens/header-content";
import Footer from "@components/screens/footer-content";
import HeadSEO from "@components/screens/head-content";
import CenterCategoryContent from "@components/screens/single-page-content/content/category-content";
import SingleContent from "@components/screens/single-page-content";

const Level3CategoryPage = ({ locale, categoriesMenu, categoryData, categorySlug }) => {
  const { t } = useTranslation();
  const isArticle = categoryData.data[0].attributes.article;
  const data = categoryData.data?.[0].attributes;
  const categorySlugType = categorySlug === "docs" ? isArticle ? "docs" : "doc" : categorySlug;
  const categoryName = data[`category_${categorySlugType}`].data.attributes.general_category?.data.attributes.name;
  const level2CategoryName = data[`category_${categorySlugType}`].data.attributes.name;
  const seoTitle = data.seo_title ? data.seo_title : `${categoryName} - ${level2CategoryName} - ONLYOFFICE`;
  const seoDescription = data.seo_description ? data.seo_description : t("metaDescriptionOgIndexPage");

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={seoTitle}
          metaKeywords={seoTitle}
          metaDescription={seoDescription}
          metaDescriptionOg={seoDescription}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeadingContent
          t={t}
          template={false}
          currentLanguage={locale}
          categories={categoriesMenu.data}
        />
      </Layout.PageHeader>
      <Layout.SectionMain>
        {isArticle ? (
          <SingleContent
            t={t}
            currentLanguage={locale}
            isArticle={isArticle}
            categoryName={categoryName}
            categoryUrl={data[`category_${categorySlugType}`].data.attributes.general_category?.data.attributes.url}
            level2CategoryName={level2CategoryName}
            level2CategoryUrl={data[`category_${categorySlugType}`].data.attributes.url}
            pageName={data.title}
            pageDescription={data.content}
            tags={data.tags}
          />
        ) : (
          <CenterCategoryContent
            t={t}
            categorySlug={categorySlug}
            categoryName={categoryName}
            categoryUrl={data[`category_${categorySlugType}`].data.attributes.general_category?.data.attributes.url}
            level2CategoryName={level2CategoryName}
            level2CategoryUrl={data[`category_${categorySlugType}`].data.attributes.url}
            pageName={data.name}
            pageItems={data[`level_3_${categorySlug === "docs" ? "docs" : `${categorySlug}s`}`].data}
            pageItemsLevel={4}
          />
        )}
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} language={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, params }) => {
  const categoriesMenu = await getCategoriesMenu(locale);
  const categoryData = await getCategoryLevel3(locale, params.category, `/${params.category}/${params.level2}/${params.level3}`);

  if (!categoryData.data || categoryData.data.length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      categoriesMenu,
      categoryData,
      categorySlug: params.category
    },
  };
};

export default Level3CategoryPage;