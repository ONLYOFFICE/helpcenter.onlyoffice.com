import React, { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import getAllCategories from "@lib/strapi/getWorkspaceCategories";
import getAllArticles from "@lib/strapi/getWorkspaceArticles";
import getAllVideos from "@lib/strapi/getVideos";
import getAllTags from "@lib/strapi/getTags";
import getAllCommonCategories from "@lib/strapi/getCategories";

import Layout from "@components/layout";
import HeadingContent from "@components/screens/header-content";
import Footer from "@components/screens/footer-content";
import HeadSEO from "@components/screens/head-content";
import filterAricles from "@utils/helpers/WorkspaceCategory/filterForWorkspaceCategory";
import createCategoryStructure from "@utils/helpers/Common/createCategoryStructure";
import CenterSubCategoryContent from "@components/screens/single-page-content/content/subcategory-content";
import createArticlesUrl from "@utils/helpers/WorkspaceCategory/createArticlesUrl";
import SingleContent from "@components/screens/single-page-content";

const subcategoryPage = ({ locale, articles, videos, tags, categories, currentCategories }) => {
  const { t } = useTranslation();
  const query = useRouter();
  const pageLoc = query.locale !== "en" ? query.locale : "";
  const pagePath = (pageLoc + query.asPath).split('#')[0];
  const pattern = /[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.aspx$/;
  const wordsArray = pagePath.split('/').filter(Boolean);
  const lastWord = wordsArray[wordsArray.length - 1];
  const pageCatSlug = (pageLoc + query.asPath).split('/')[1];

  const { attributes: pageCategory } = useMemo(
    () => categories?.data.find((it) => it.attributes.slug_id === pageCatSlug),
    [categories]
  );

  const { secondWord, urlBeforeLastSlashSlice } = (() => {
    const lastSlashIndex = pagePath.lastIndexOf('/');
    const urlBeforeLastSlashSlice = lastSlashIndex > 0 ? pagePath.slice(0, lastSlashIndex) : null;
    const wordsArray = urlBeforeLastSlashSlice?.split('/').filter(Boolean) || [];
    const secondWord = wordsArray[1] || null;

    return { secondWord, urlBeforeLastSlashSlice };
  })();

  const { attributes: pageSubCategory } = useMemo(
    () => {
      const foundCategory = currentCategories?.data.find((it) => it.attributes.slug_id === secondWord);
      return foundCategory || {};
    },
    [currentCategories, secondWord]
  );

  const datalvl1 = filterAricles(articles?.data, pageSubCategory?.slug_id);
  const datalvl2 = useMemo(
    () => datalvl1?.find((it) => it.url === urlBeforeLastSlashSlice),
    [datalvl1, urlBeforeLastSlashSlice]
  );
  const pageData = useMemo(
    () => datalvl2?.level_3.find((it) => it.url === pagePath),
    [datalvl2, pagePath]
  );
  const allCat = createCategoryStructure(currentCategories?.data, datalvl1);

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
            articles={pageData?.level_4}
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
  const videos = await getAllVideos(locale);
  const tags = await getAllTags(locale);
  const categories = await getAllCommonCategories(locale);
  const currentCategories = await getAllCategories(locale);


  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      articles,
      videos,
      tags,
      categories,
      currentCategories
    },
  };
}

export default subcategoryPage;