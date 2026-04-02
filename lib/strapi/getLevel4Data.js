import CONFIG from "@config/config";
import getArticle from "./getArticle";
import translateText from "./translate";

const getLevel4Data = async (locale, category, url, preview ) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const categorySlugSingular = category === "docs" ? "doc" : category;
  const categorySlugPlural = category === "docs" ? "docs" : `${category}s`;

  const categoryParams = `
    &filters[url][$eq]=${url}
    &fields=name,seo_title,seo_description
    &populate[icon][fields]=url
    &populate[video][fields]=title,url,description
    &populate[article_${categorySlugPlural}][fields]=title,url,position,level_4_title
    &populate[article_${categorySlugPlural}][populate][icon][fields]=url
    &populate[level_2_${categorySlugSingular}][fields]=name,url
    &populate[level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][fields]=name,url
    &populate[level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][populate][general_category][fields]=name,url
    &populate[level_4_${categorySlugPlural}][fields]=name,url,position
    &populate[level_4_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields]=title,url,position
    &populate[level_4_${categorySlugPlural}][populate][icon][fields]=url
  `.replace(/\s+/g, "");

  const [
    articleData,
    categoryData
  ] = await Promise.all([
    getArticle(locale, category, url, preview),
    fetch(`${CMSConfigAPI}/api/level-3-${category === "docs" ? "docs" : `${category}s`}/?locale=${locale}${categoryParams}${preview ? "&status=draft" : ""}`).then(res => res.json())
  ]);

  // let articleData = null;

  // if (localeArticleData?.data?.length === 0 && locale !== "en") {
  //   const urlWithoutLocale = url.replace(new RegExp(`^/${locale}`, 'i'), '');
  //   const englishArticleData = await getArticle("en", category, urlWithoutLocale);

  //   if (englishArticleData?.data?.length > 0) {
  //      await translateText(englishArticleData.data[0].id, `article-${category === "docs" ? "docs" : `${category}`}`, locale);
  //      articleData = await getArticle(locale, category, url);
  //   }
  // } else {
  //   articleData = localeArticleData;
  // }

  if (articleData && articleData.data && articleData.data.length > 0) {
  const articleWithContent = articleData.data.find(item => item.content && item.content.trim() !== "");
  
    if (articleWithContent) {
      articleWithContent.article = true;
      return { data: [articleWithContent] };
    }
  } else if (categoryData?.data?.length) {
    return { data: categoryData.data };
  } else {
    return;
  }  
};

export default getLevel4Data;