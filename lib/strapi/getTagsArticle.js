import CONFIG from "@config/config";

const getTagsArticle = async (locale, tagName, pageSize, page, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const endpoints = [
    "articles",
    "articles-docs",
    "article-desktops",
    "article-mobiles",
    "article-docspaces",
    "article-workspaces",
    "article-ais"
  ];

  const fetchPromises = endpoints.map(endpoint => 
    fetch(`${CMSConfigAPI}/api/${endpoint}/?pagination[pageSize]=${pageSize}&pagination[page]=${page}&locale=${locale}&filters[tags][title][$eq]=${tagName}&populate=mark${preview ? "&status=draft" : ""}`)
      .then(response => response.json())
  );

  const [
    articleData,
    articlesDocsData,
    articlesDesktopsData,
    articlesMobilesData,
    articlesDocspacesData,
    articlesWorkspacessData
  ] = await Promise.all(fetchPromises);

  return {
    articles: articleData,
    article_docs: articlesDocsData,
    article_desktops: articlesDesktopsData,
    article_mobiles: articlesMobilesData,
    article_docspaces: articlesDocspacesData,
    article_workspaces: articlesWorkspacessData
  };
};

export default getTagsArticle;