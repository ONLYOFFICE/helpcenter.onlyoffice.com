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
    "article-workspaces"
  ];

  const urls = endpoints.map(endpoint => `${CMSConfigAPI}/api/${endpoint}/?pagination[pageSize]=1000&pagination[page]=1&locale=${locale}&filters[$or][0][title][$contains]=${query}&filters[$or][1][content][$contains]=${query}`);
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
    "/docspace/configuration/monday.aspx"
  ];
  data = data.filter(article => !excludedUrls.includes(article.attributes?.url));

  const q = query.toLowerCase();
  data = data.sort((a, b) => {
    const countOccurrences = (text) => {
      if (!text) return 0;
      return (text.toLowerCase().match(new RegExp(q, 'g')) || []).length;
    };

    const aTitle = countOccurrences(a.attributes?.title);
    const aContent = countOccurrences(a.attributes?.content);
    const bTitle = countOccurrences(b.attributes?.title);
    const bContent = countOccurrences(b.attributes?.content);

    const aScore = (aTitle * 3) + aContent;
    const bScore = (bTitle * 3) + bContent;

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