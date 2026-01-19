import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import getLevel3Data from "@lib/strapi/getLevel3Data";
import getCategoriesMenu from "@lib/strapi/getCategoriesMenu";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Header from "@components/screens/header";
import SubCategoryContent from "@components/screens/subcategory-content";
import CategoryContent from "@components/screens/category-content";
import ArticleContent from "@components/screens/article-content";
import Footer from "@components/screens/footer";
import Cookies from "universal-cookie";

const Level3Page = ({ locale, menuData, data, categorySlug, preview }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
  const [leftMenuData, setLeftMenuData] = useState(menuData);
  const categorySlugSingular = categorySlug === "docs" ? "doc" : categorySlug;
  const categorySlugPlural = categorySlug === "docs" ? "docs" : `${categorySlug}s`;
  const dataAttr = data.data?.[0];
  const level4DataLength = dataAttr?.[`level_3_${categorySlugPlural}`]?.map(item => item[`level_4_${categorySlugPlural}`]?.length);

  useEffect(() => {
    if (!dataAttr.article) {
      const loadData = async () => {
        const data = await getLeftMenu(locale);
        setLeftMenuData(data);
      };
  
      loadData();
    }
  }, [data]);

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={dataAttr.seo_title || (dataAttr.name || dataAttr.title ? `${dataAttr.name || dataAttr.title} - ONLYOFFICE` : `${t("HelpCenter")} - ONLYOFFICE`)}
          description={dataAttr.seo_description || t("ONLYOFFICEMeta")}
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
        {dataAttr.article ? (
          <ArticleContent
            t={t}
            locale={locale}
            categoryName={dataAttr[`category_${categorySlug}`]?.general_category?.name || dataAttr[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.name || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.name || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.name}
            categoryUrl={dataAttr[`category_${categorySlug}`]?.general_category.url || dataAttr[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.url || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.url || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.url}
            level2CategoryName={dataAttr[`category_${categorySlug}`]?.name || dataAttr[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].name || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].name || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`]?.name}
            level2CategoryUrl={dataAttr[`category_${categorySlug}`]?.url || dataAttr[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].url || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].url || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`]?.url}
            level3CategoryName={dataAttr[`level_2_${categorySlugSingular}`]?.name || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`].name || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.name}
            level3CategoryUrl={dataAttr[`level_2_${categorySlugSingular}`]?.url || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`].url || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`]?.url}
            level4CategoryName={dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.name || dataAttr[`level_3_${categorySlugSingular}`]?.name}
            level4CategoryUrl={dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.url || dataAttr[`level_3_${categorySlugSingular}`]?.url}
            pageName={dataAttr.title}
            pageDescription={dataAttr.content}
            tags={dataAttr.tags}
            leftMenuIsOpen={leftMenuIsOpen}
            setLeftMenuIsOpen={setLeftMenuIsOpen}
            videos={dataAttr.videos}
            isAIGenerated={dataAttr.isAIGenerated}
          />
        ) : (
          !level4DataLength?.every(item => item === undefined) && level4DataLength?.filter(item => item !== 0).length > level4DataLength?.filter(item => item === 0).length ? (
            <CategoryContent
              t={t}
              locale={locale}
              categorySlug={categorySlug}
              categoryName={dataAttr[`category_${categorySlugSingular}`].general_category.name}
              categoryUrl={dataAttr[`category_${categorySlugSingular}`].general_category.url}
              level2CategoryName={dataAttr[`category_${categorySlugSingular}`].name}
              level2CategoryUrl={dataAttr[`category_${categorySlugSingular}`]?.url}
              pageName={dataAttr?.name}
              categoryData={dataAttr[`level_3_${categorySlugPlural}`]}
              leftMenuData={leftMenuData}
              leftMenuLevel={4}
              pageDescription={dataAttr?.description}
              leftMenuIsOpen={leftMenuIsOpen}
              setLeftMenuIsOpen={setLeftMenuIsOpen}
              articleData={dataAttr?.[`article_${categorySlugPlural}`]}
              tags={dataAttr?.tags}
            />
          ) : (
            <SubCategoryContent
              t={t}
              locale={locale}
              categorySlug={categorySlug}
              categoryName={dataAttr[`category_${categorySlugSingular}`]?.general_category?.name ?? dataAttr.general_category?.name}
              categoryUrl={dataAttr[`category_${categorySlugSingular}`]?.url ?? dataAttr.general_category?.url}
              level2CategoryName={dataAttr[`category_${categorySlugSingular}`]?.name}
              level2CategoryUrl={dataAttr[`category_${categorySlugSingular}`]?.url}
              pageName={dataAttr?.name}
              pageIcon={dataAttr?.icon}
              categoryData={dataAttr?.[`level_3_${categorySlugPlural}`]}
              leftMenuData={leftMenuData}
              articleData={dataAttr?.[`article_${categorySlugPlural}`]}
              leftMenuIsOpen={leftMenuIsOpen}
              setLeftMenuIsOpen={setLeftMenuIsOpen}
              pageDescription={dataAttr.description}
              tags={dataAttr?.tags}
            />
          )
        )}
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, params, req, res, preview }) => {
  const pathUrl = `${locale === "en" ? "" : `/${locale}`}/${params.page}/${params.level2}/${params.level3}`;
  const data = await getLevel3Data(locale, params.page, pathUrl, preview);

  if (!data?.data.length) {
    return {
      notFound: true
    };
  } else if (data.data[0]?.isFallback) {
    return {
      redirect: {
        destination: `/${params.page}/${params.level2}/${params.level3}`,
        permanent: false
      }
    };
  }

  const menuData = data.data[0].article ? await getCategoriesMenu(locale, preview) : await getLeftMenu(locale, params.page, preview);
  const cookies = new Cookies(req.headers.cookie, { path: "/" });
  if (cookies.get("neverShowTranslators") === "never" && data.data[0]?.content) {
    data.data[0].content = data.data[0].content.replace(
      /<div class="bringattention translator" id="translatorAttention_block" style="display: block;">/g,
      '<div class="bringattention translator" id="translatorAttention_block" style="display: none;">'
    );
  }
  if (pathUrl === "/docs/installation/multitenancy.aspx" || pathUrl === "/docs/installation/docs-load-tests.aspx" || pathUrl === "/docs/installation/document-builder-activation.aspx") {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      data,
      menuData,
      categorySlug: params.page,
      preview: !!preview
    },
  };
};

export default Level3Page;