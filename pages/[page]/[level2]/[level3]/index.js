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

const Level3Page = ({ locale, menuData, data, categorySlug }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
  const [leftMenuData, setLeftMenuData] = useState(menuData);
  const categorySlugSingular = categorySlug === "docs" ? "doc" : categorySlug;
  const categorySlugPlural = categorySlug === "docs" ? "docs" : `${categorySlug}s`;
  const dataAttr = data.data?.[0]?.attributes;
  const level4DataLength = dataAttr?.[`level_3_${categorySlugPlural}`]?.data.map(item => item.attributes[`level_4_${categorySlugPlural}`]?.data.length);

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
            categoryName={dataAttr[`category_${categorySlug}`]?.data?.attributes?.general_category.data.attributes.name || dataAttr[`level_2_${categorySlugSingular}`]?.data?.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.name || dataAttr[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.name || dataAttr[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.name}
            categoryUrl={dataAttr[`category_${categorySlug}`]?.data?.attributes?.general_category.data.attributes.url || dataAttr[`level_2_${categorySlugSingular}`]?.data?.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.url || dataAttr[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.url || dataAttr[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.url}
            level2CategoryName={dataAttr[`category_${categorySlug}`]?.data?.attributes?.name || dataAttr[`level_2_${categorySlugSingular}`]?.data?.attributes[`category_${categorySlugSingular}`].data.attributes.name || dataAttr[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.name || dataAttr[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.name}
            level2CategoryUrl={dataAttr[`category_${categorySlug}`]?.data?.attributes?.url || dataAttr[`level_2_${categorySlugSingular}`]?.data?.attributes[`category_${categorySlugSingular}`].data.attributes.url || dataAttr[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.url || dataAttr[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes[`category_${categorySlugSingular}`].data.attributes.url}
            level3CategoryName={dataAttr[`level_2_${categorySlugSingular}`]?.data?.attributes?.name || dataAttr[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes.name || dataAttr[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes.name}
            level3CategoryUrl={dataAttr[`level_2_${categorySlugSingular}`]?.data?.attributes?.url || dataAttr[`level_3_${categorySlugSingular}`]?.data?.attributes[`level_2_${categorySlugSingular}`].data.attributes.url || dataAttr[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes[`level_2_${categorySlugSingular}`].data.attributes.url}
            level4CategoryName={dataAttr[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes.name || dataAttr[`level_3_${categorySlugSingular}`]?.data?.attributes.name}
            level4CategoryUrl={dataAttr[`level_4_${categorySlugSingular}`]?.data?.attributes[`level_3_${categorySlugSingular}`].data.attributes.url || dataAttr[`level_3_${categorySlugSingular}`]?.data?.attributes.url}
            pageName={dataAttr.title}
            pageDescription={dataAttr.content}
            tags={dataAttr.tags}
            leftMenuIsOpen={leftMenuIsOpen}
            setLeftMenuIsOpen={setLeftMenuIsOpen}
            videos={dataAttr.videos}
          />
        ) : (
          !level4DataLength?.every(item => item === undefined) && level4DataLength?.filter(item => item !== 0).length > level4DataLength?.filter(item => item === 0).length ? (
            <CategoryContent
              t={t}
              locale={locale}
              categorySlug={categorySlug}
              categoryName={dataAttr[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.name}
              categoryUrl={dataAttr[`category_${categorySlugSingular}`].data.attributes.general_category.data.attributes.url}
              level2CategoryName={dataAttr[`category_${categorySlugSingular}`].data.attributes.name}
              level2CategoryUrl={dataAttr[`category_${categorySlugSingular}`].data.attributes?.url}
              pageName={dataAttr?.name}
              categoryData={dataAttr[`level_3_${categorySlugPlural}`]?.data}
              leftMenuData={leftMenuData}
              leftMenuLevel={4}
              pageDescription={dataAttr?.description}
              leftMenuIsOpen={leftMenuIsOpen}
              setLeftMenuIsOpen={setLeftMenuIsOpen}
              articleData={dataAttr?.[`article_${categorySlugPlural}`]?.data}
              tags={dataAttr?.tags}
            />
          ) : (
            <SubCategoryContent
              t={t}
              locale={locale}
              categorySlug={categorySlug}
              categoryName={dataAttr[`category_${categorySlugSingular}`]?.data?.attributes.general_category.data.attributes.name ?? dataAttr.general_category?.data.attributes.name}
              categoryUrl={dataAttr[`category_${categorySlugSingular}`]?.data?.attributes.general_category.data.attributes.url ?? dataAttr.general_category?.data.attributes.url}
              level2CategoryName={dataAttr[`category_${categorySlugSingular}`]?.data?.attributes.name}
              level2CategoryUrl={dataAttr[`category_${categorySlugSingular}`]?.data?.attributes?.url}
              pageName={dataAttr?.name}
              pageIcon={dataAttr?.icon}
              categoryData={dataAttr?.[`level_3_${categorySlugPlural}`]?.data}
              leftMenuData={leftMenuData}
              articleData={dataAttr?.[`article_${categorySlugPlural}`]?.data}
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

export const getServerSideProps = async ({ locale, params, req, res }) => {
  const pathUrl = `${locale === "en" ? "" : `/${locale}`}/${params.page}/${params.level2}/${params.level3}`;
  const data = await getLevel3Data(locale, params.page, pathUrl);

  if (!data?.data?.length) {
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

  const menuData = data.data[0].attributes.article ? await getCategoriesMenu(locale) : await getLeftMenu(locale, params.page);
  const cookies = new Cookies(req.headers.cookie, { path: "/" });
  if (cookies.get("neverShowTranslators") === "never" && data.data[0]?.attributes.content) {
    data.data[0].attributes.content = data.data[0].attributes.content.replace(
      /<div class="bringattention translator" id="translatorAttention_block" style="display: block;">/g,
      '<div class="bringattention translator" id="translatorAttention_block" style="display: none;">'
    );
  }
  if (pathUrl === "/docs/installation/multitenancy.aspx") {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      data,
      menuData,
      categorySlug: params.page
    },
  };
};

export default Level3Page;