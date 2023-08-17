import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getAllArticles from "@lib/strapi/getArticles";
import categories from "@lib/strapi/getCategories";

import Layout from "@components/layout";
import HeadingContent from "@components/screens/header-content";
import Footer from "@components/screens/footer-content";
import SingleContent from "@components/screens/single-content";

const SinglePage = ({ locale, articles, categories }) => {
  const { t } = useTranslation(); 
  const data = articles.data.attributes;
  const { seo_title, seo_description } = data;
  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={seo_title} 
          metaDescription={seo_description}
          metaDescriptionOg={seo_description}
          metaKeywords={seo_title}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeadingContent t={t} template={false} currentLanguage={locale} articles={articles.data} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <SingleContent t={t} currentLanguage={locale} articles={articles.data} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} language={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale }) => {
  const articles = await getAllArticles(locale);
  const categories = await getAllCategories(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      articles
    },
  };
};

export default SinglePage;