import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import SearchResultsContent from "@components/screens/search-results-content";
import getCategoriesMenu from "@lib/strapi/getCategoriesMenu";
import getSearchResults from "@lib/strapi/getSearchResults";
import getArticleBreadcrumbs from "@lib/strapi/getCrumbs";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Header from "@components/screens/header";
import Footer from "@components/screens/footer";

const SearchResult = ({ locale, categoriesMenuData, searchResults, resultsWithBreadcrumbs, query, page }) => {
  const { t } = useTranslation("common");
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={`${query} - ONLYOFFICE`}
          description={""}
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
        <SearchResultsContent
          t={t}
          locale={locale}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
          categoriesMenuData={categoriesMenuData}
          searchResults={searchResults}
          resultsWithBreadcrumbs={resultsWithBreadcrumbs}
          query={query}
          page={page}
        />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, query, preview }) => {
  const page = query.page || 1;
  const pageSize = query.pageSize || 12;
  const categoriesMenuData = await getCategoriesMenu(locale, preview);
  const searchResults = await getSearchResults(locale, query.query, page, pageSize, preview);

  const enrichedData = await Promise.all(
    searchResults.data.map(async (item) => {
      const breadcrumbsData = await getArticleBreadcrumbs(locale, item);
      return {
        ...item,
        breadcrumbs: breadcrumbsData
      };
    })
  );

  const resultsWithBreadcrumbs = {
    ...searchResults,
    data: enrichedData
  };

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      categoriesMenuData,
      searchResults,
      resultsWithBreadcrumbs,
      page,
      query: query.query,
      preview: !!preview
    },
  };
};

export default SearchResult;
