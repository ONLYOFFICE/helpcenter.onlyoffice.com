import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import getLevel2Data from "@lib/strapi/getLevel2Data";
import getCategoriesMenu from "@lib/strapi/getCategoriesMenu";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Header from "@components/screens/header";
import CategoryContent from "@components/screens/category-content";
import SubCategoryContent from "@components/screens/subcategory-content";
import ArticleContent from "@components/screens/article-content";
import Footer from "@components/screens/footer";

const Level2Page = ({ locale, data, menuData, categorySlug }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
  const [leftMenuData, setLeftMenuData] = useState(menuData);
  const categorySlugPlural = categorySlug === "docs" ? "docs" : `${categorySlug}s`;
  const dataAttr = data?.data?.[0];

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
          title={dataAttr.seo_title || (dataAttr.name ? `${dataAttr.name} - ONLYOFFICE` : dataAttr.title ? `${dataAttr.title} - ONLYOFFICE` : `${t('HelpCenter')} - ONLYOFFICE`)}
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
            categoryName={dataAttr.category?.name}
            categoryUrl={dataAttr.category?.url}
            pageName={dataAttr?.title}
            pageDescription={dataAttr?.content}
            tags={dataAttr?.tags}
            videos={dataAttr?.videos}
            leftMenuIsOpen={leftMenuIsOpen}
            setLeftMenuIsOpen={setLeftMenuIsOpen}
          />
        ) : (
          dataAttr?.[`level_2_${categorySlugPlural}`]?.some(item => item?.[`level_3_${categorySlugPlural}`]?.length > 0) ? (
            <CategoryContent
              t={t}
              categorySlug={categorySlug}
              categoryName={dataAttr.general_category?.name}
              categoryUrl={dataAttr.general_category?.url}
              pageName={dataAttr.name}
              pageDescription={dataAttr.description}
              categoryData={dataAttr?.[`level_2_${categorySlugPlural}`]}
              leftMenuData={leftMenuData}
              leftMenuLevel={3}
              leftMenuIsOpen={leftMenuIsOpen}
              setLeftMenuIsOpen={setLeftMenuIsOpen}
              articleData={dataAttr?.[`article_${categorySlugPlural}`]}
            />
          ) : (
            <SubCategoryContent
              t={t}
              categorySlug={categorySlug}
              categoryName={dataAttr.general_category?.name}
              categoryUrl={dataAttr.general_category?.url}
              pageName={dataAttr.name}
              categoryData={dataAttr?.[`level_2_${categorySlugPlural}`]}
              articleData={dataAttr?.[`article_${categorySlugPlural}`]}
              leftMenuData={leftMenuData}
              leftMenuIsOpen={leftMenuIsOpen}
              pageDescription={dataAttr.description}
              setLeftMenuIsOpen={setLeftMenuIsOpen}
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

export async function getServerSideProps({ locale, params, preview }) {
  const pathUrl = `${locale === "en" ? "" : `/${locale}`}/${params.page}/${params.level2}`;
  const data = await getLevel2Data(locale, params.page, pathUrl, preview);

  if (!data?.data?.length) {
    return {
      notFound: true
    };
  } else if (data.data[0]?.isFallback) {
    return {
      redirect: {
        destination: `/${params.page}/${params.level2}`,
        permanent: false
      }
    };
  }
  
  const menuData = data.data[0].article ? await getCategoriesMenu(locale, preview) : await getLeftMenu(locale, params.page, preview);

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
}

export default Level2Page;