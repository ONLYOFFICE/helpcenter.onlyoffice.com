import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import getLevel4Data from "@lib/strapi/getLevel4Data";
import getCategoriesMenu from "@lib/strapi/getCategoriesMenu";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Header from "@components/screens/header";
import ArticleContent from "@components/screens/article-content";
import SubCategoryContent from "@components/screens/subcategory-content";
import Footer from "@components/screens/footer";

const Level4Page = ({ locale, data, menuData, categorySlug }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
  const [leftMenuData, setLeftMenuData] = useState(menuData);

  const categorySlugSingular = categorySlug === "docs" ? "doc" : categorySlug;
  const categorySlugPlural = categorySlug === "docs" ? "docs" : `${categorySlug}s`;
  const dataAttr = data.data?.[0];
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
            categoryName={dataAttr[`category_${categorySlug}`]?.general_category.name || dataAttr[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.name || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.name || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.name}
            categoryUrl={dataAttr[`category_${categorySlug}`]?.general_category.url || dataAttr[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].general_category.url || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.url || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.url}
            level2CategoryName={dataAttr[`category_${categorySlug}`]?.name || dataAttr[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].name || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].name || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].name}
            level2CategoryUrl={dataAttr[`category_${categorySlug}`]?.url || dataAttr[`level_2_${categorySlugSingular}`]?.[`category_${categorySlugSingular}`].url || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].url || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].url}
            level3CategoryName={dataAttr[`level_2_${categorySlugSingular}`]?.name || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`].name || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`].name}
            level3CategoryUrl={dataAttr[`level_2_${categorySlugSingular}`]?.url || dataAttr[`level_3_${categorySlugSingular}`]?.[`level_2_${categorySlugSingular}`].url || dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`][`level_2_${categorySlugSingular}`].url}
            level4CategoryName={dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.name || dataAttr[`level_3_${categorySlugSingular}`]?.name}
            level4CategoryUrl={dataAttr[`level_4_${categorySlugSingular}`]?.[`level_3_${categorySlugSingular}`]?.url || dataAttr[`level_3_${categorySlugSingular}`]?.url}
            pageName={dataAttr?.title}
            pageDescription={dataAttr?.content}
            tags={dataAttr?.tags}
            videos={dataAttr?.videos}
            leftMenuIsOpen={leftMenuIsOpen}
            setLeftMenuIsOpen={setLeftMenuIsOpen}
          />
        ) : (
          <SubCategoryContent 
            t={t}
            categorySlug={categorySlug}
            categoryName={dataAttr[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.name}
            categoryUrl={dataAttr[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].general_category.url}
            level2CategoryName={dataAttr[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].name}
            level2CategoryUrl={dataAttr[`level_2_${categorySlugSingular}`][`category_${categorySlugSingular}`].url}
            level3CategoryName={dataAttr[`level_2_${categorySlugSingular}`].name}
            level3CategoryUrl={dataAttr[`level_2_${categorySlugSingular}`].url}
            pageName={dataAttr.name}
            pageIcon={dataAttr?.icon}
            categoryData={dataAttr?.[`level_4_${categorySlugPlural}`]}
            articleData={dataAttr?.[`article_${categorySlugPlural}`]}
            leftMenuData={leftMenuData}
            leftMenuIsOpen={leftMenuIsOpen}
            setLeftMenuIsOpen={setLeftMenuIsOpen}
            video={dataAttr?.video}
          />
        )}
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, params, req, preview }) => {
  const pathUrl = `${locale === "en" ? "" : `/${locale}`}/${params.page}/${params.level2}/${params.level3}/${params.level4}`;
  const data = await getLevel4Data(locale, params.page, pathUrl, preview);

  if (!data?.data?.length) {
    return {
      notFound: true
    };
  } else if (data.data[0]?.isFallback) {
    return {
      redirect: {
        destination: `/${params.page}/${params.level2}/${params.level3}/${params.level4}`,
        permanent: false
      }
    };
  }

  const menuData = data.data[0]?.article ? await getCategoriesMenu(locale, preview) : await getLeftMenu(locale, params.page, preview);
  let cookies;
  try {
    cookies = new Cookies(req.headers.cookie, { path: "/" });
  } catch (err) {
    cookies = { get: () => undefined };
  }
  if (cookies.get("neverShowTranslators") === "never" && data.data[0]?.content) {
    data.data[0].content = data.data[0].content.replace(
      /<div class="bringattention translator" id="translatorAttention_block" style="display: block;">/g,
      '<div class="bringattention translator" id="translatorAttention_block" style="display: none;">'
    );
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

export default Level4Page;