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
import translateText from "@lib/strapi/translate";

const Level6Page = ({ locale, data, categoriesMenuData, categorySlug }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);

  const categorySlugSingular = categorySlug === "docs" ? "doc" : categorySlug;
  const articleData = data.data?.[0];

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
            categorySlug={categorySlug}
          categoryName={articleData[`category_${categorySlug}`]?.general_category.name || articleData[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.name || articleData[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.name || articleData[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.name}
          categoryUrl={articleData[`category_${categorySlug}`]?.general_category.url || articleData[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.url || articleData[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.url || articleData[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.url}
          level2CategoryName={articleData[`category_${categorySlug}`]?.name || articleData[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].name || articleData[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].name || articleData[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].name}
          level2CategoryUrl={articleData[`category_${categorySlug}`]?.url || articleData[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].url || articleData[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].url || articleData[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].url}
          level3CategoryName={articleData[`level_2_${categorySlugSingular}`]?.name || articleData[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`].name || articleData[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`].name}
          level3CategoryUrl={articleData[`level_2_${categorySlugSingular}`]?.url || articleData[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`].url || articleData[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`].url}
          level4CategoryName={articleData[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.name || articleData[`level_3_${categorySlugSingular}`]?.name}
          level4CategoryUrl={articleData[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.url || articleData[`level_3_${categorySlugSingular}`]?.url}
          pageName={articleData?.title}
          pageDescription={articleData?.content}
          tags={articleData?.tags}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
          isAIGenerated={articleData?.isAIGenerated}
        />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, params, preview }) => {
  const categoriesMenuData = await getCategoriesMenu(locale, preview);

  const data = await getArticle(locale, params.page, `${locale === "en"  ? "" : `/${locale}`}/${params.page}/${params.level2}/${params.level3}/${params.level4}/${params.level5}/${params.level6}`, preview);
  // let data = null;
  //   if (localeData?.data?.length === 0 && ((params.page === "mobile" && locale === "de") || locale === "zh")) {
  //     const englishArticleData = await getArticle("en", params.page, `/${params.page}/${params.level2}/${params.level3}/${params.level4}/${params.level5}/${params.level6}`);
  //     if (englishArticleData?.data?.length > 0) {
  //       await translateText(englishArticleData.data[0].id, `article-${params.page === "docs" ? "docs" : `${params.page}`}`, locale);
  //       data = await getArticle(locale, params.page, `${locale === "en"  ? "" : `/${locale}`}/${params.page}/${params.level2}/${params.level3}/${params.level4}/${params.level5}/${params.level6}`);
  //     }
  //   } else {
  //     data = localeData;
  //   }

  const disallowedLocales = ["es"];

  if (disallowedLocales.includes(locale)) {
    return {
      redirect: {
        destination: `/${params.page}/${params.level2}/${params.level3}/${params.level4}/${params.level5}/${params.level6}`,
        permanent: false,
      },
    };
  } else if (!data?.data?.length) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      data,
      categoriesMenuData,
      categorySlug: params.page,
      preview: !!preview
    },
  };
};

export default Level6Page;