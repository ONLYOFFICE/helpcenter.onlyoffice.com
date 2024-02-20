import React, { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import getAllArticles from "@lib/strapi/getDesktopArticles";
import getAllCategories from "@lib/strapi/getDesktopCategories";
import getAllCommonCategories from "@lib/strapi/getCategories";
import getAllVideos from "@lib/strapi/getVideos";
import getAllTags from "@lib/strapi/getTags";

import Layout from "@components/layout";
import HeadingContent from "@components/screens/header-content";
import Footer from "@components/screens/footer-content";
import HeadSEO from "@components/screens/head-content";
import CenterSubCategoryContent from "@components/screens/single-page-content/content/subcategory-content";
import filterAricles from "@utils/helpers/DesktopCategory/filterForDesktopCategory";
import createCategoryStructure from "@utils/helpers/Common/createCategoryStructure";
import createArticlesUrl from "@utils/helpers/DesktopCategory/createArticlesUrl";
import SingleContent from "@components/screens/single-page-content";

const subcategoryPage = ({ locale, articles, currentCategories, categories, videos, tags }) => {
  const { t } = useTranslation();
  const query = useRouter();
  const pageLoc = query.locale !== "en" ? query.locale : "";
  const pagePath = (pageLoc + query.asPath).split('#')[0];
  const wordsArray = pagePath.split('/').filter(Boolean);
  const secondWord = wordsArray.length > 1 ? wordsArray[1] : null;
  const lastWord = wordsArray[wordsArray.length - 1];
  const pattern = /[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.aspx$/;
  const pageCategory = "Desktop";

  const { attributes: pageSubCategory } = useMemo(
    () => currentCategories?.data.find((it) => it.attributes.slug_id === secondWord) || {},
    [currentCategories, secondWord, pagePath]
  );
  const data = filterAricles(articles?.data, pageSubCategory?.slug_id);
  const pageData = data?.find((it) => it.url === pagePath);
  const allCat = createCategoryStructure(currentCategories?.data, data);

  const pageArticlesData = pattern.test(pagePath) && useMemo(
    () => articles?.data.find((it) => it.attributes.url === pagePath),
    [articles]
  );

  const link = pattern.test(pagePath) && createArticlesUrl(pageArticlesData, lastWord, secondWord);

  //const { seo_title, seo_description } = data;
  return (
    <Layout>
      <Layout.PageHead>
        {/* <HeadSEO
          title={seo_title}
          metaDescription={seo_description}
          metaDescriptionOg={seo_description}
          metaKeywords={seo_title}
        /> */}
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeadingContent t={t} template={false} currentLanguage={locale} categories={categories.data} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        {pattern.test(pagePath)
          ? <SingleContent
            t={t}
            currentLanguage={locale}
            article={pageArticlesData}
            articles={articles.data}
            tags={tags.data}
            isCategory={false}
            videos={videos.data}
            category={pageCategory}
            categories={allCat}
            pagepath={link}
          />
          : <CenterSubCategoryContent
            t={t}
            currentLanguage={locale}
            articles={pageData?.level_3}
            category={pageData}
            categories={allCat}
            isCategory={false}
            pageMainCategory={pageCategory} />}
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} language={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export async function getServerSideProps({ locale }) {
  const articles = await getAllArticles(locale);
  const currentCategories = await getAllCategories(locale);
  const categories = await getAllCommonCategories(locale);
  const videos = await getAllVideos(locale);
  const tags = await getAllTags(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      articles,
      categories,
      currentCategories,
      videos,
      tags
    },
  };
}

export default subcategoryPage;