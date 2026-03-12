 import CONFIG from "@config/config";
 import { filterSearchDuplicates } from "@utils/helpers/System/filterSearchDuplicate";

const getSearchResults = async (locale, query, page, pageSize) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

  const endpoints = [
    "articles",
    "article-desktops",
    "articles-docs",
    "article-docspaces",
    "article-mobiles",
    "article-workspaces",
    "article-ais"
  ];

  const urls = endpoints.map(endpoint => `${CMSConfigAPI}/api/${endpoint}/?pagination[pageSize]=1000&pagination[page]=1&locale=${locale}&filters[$or][0][title][$contains]=${query}&filters[$or][1][content][$contains]=${query}&filters[$or][2][url][$contains]=${query.replace(/\s/g, '-')}&populate=*`);
  const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
  const results = await Promise.all(fetchPromises);
  let data = results.reduce((acc, result) => {
    if (result.data && Array.isArray(result.data)) {
      return acc.concat(result.data);
    }
    return acc;
  }, []);

  const excludedUrls = [
    "/docs/installation/multitenancy.aspx",
    "/docs/installation/docs-load-tests.aspx",
    "/docs/installation/document-builder-activation.aspx"
  ];
  data = data.filter(article => !excludedUrls.includes(article?.url));

  const q = query.toLowerCase();
  data = data.sort((a, b) => {
    const countOccurrences = (text) => {
      if (!text) return 0;
      return (text.toLowerCase().match(new RegExp(q, 'g')) || []).length;
    };

    const getUrlScore = (url) => {
      if (!url) return 0;
      return (url.match(new RegExp(q.replace(/\s/g, '-'), 'g')) || []).length * 5;
    };

    const aTitle = countOccurrences(a?.title);
    const aContent = countOccurrences(a?.content);
    const bTitle = countOccurrences(b?.title);
    const bContent = countOccurrences(b?.content);
    const aUrl = getUrlScore(a?.url);
    const bUrl = getUrlScore(b?.url);

    const aScore = (aUrl * 5) + (aTitle * 3) + (aContent * 0.5);
    const bScore = (bUrl * 5) + (bTitle * 3) + (bContent * 0.5);

    return bScore - aScore;
  });

  const uniqueData = filterSearchDuplicates(data);
  const totalResults = uniqueData.length;
  const pageCount = Math.ceil(totalResults / pageSize);
  
  const startIndex = (page - 1) * pageSize;
  const paginatedData = uniqueData.slice(startIndex, startIndex + pageSize);

  const combinedResult = {
    data: paginatedData,
    meta: {
      pagination: {
        page: page,
        pageSize: pageSize,
        total: totalResults,
        pageCount: pageCount
      }
    }
  };

  return combinedResult;
};
export default getSearchResults;