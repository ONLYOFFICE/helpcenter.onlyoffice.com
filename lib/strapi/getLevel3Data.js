import CONFIG from "@config/config";
import getArticle from "./getArticle";

const getLevel3Data = async (locale, category, url) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const categoryArticleApi = category === "docs" ? "categories-docs" : category === "docspace" ? "category-doc-spaces" : `category-${category}s`;
  const categorySlugSingular = category === "docs" ? "doc" : category;
  const categorySlugPlural = category === "docs" ? "docs" : `${category}s`;

  const categoryArticleParams = `
    &filters[url][$eq]=${url}
    &fields=seo_title,seo_description,name,description
    &populate[general_category][fields]=name,url
    &populate[tags][fields]=title
  `.replace(/\s+/g, "");

  const categoryLevel2Params = `
    &filters[url][$eq]=${url}
    &fields=name,url,seo_title,seo_description
    &populate[category_pic][fields]=url
    &populate[article_${categorySlugPlural}][fields]=title,url,position,level_4_title
    &populate[article_${categorySlugPlural}][populate][icon][fields]=url
    &populate[category_${categorySlugSingular}][fields]=name,url
    &populate[category_${categorySlugSingular}][populate][general_category][fields]=name,url
    &populate[level_3_${categorySlugPlural}][fields]=name,url,position
    &populate[level_3_${categorySlugPlural}][populate][icon][fields]=url
    &populate[level_3_${categorySlugPlural}][populate][icon_small][fields]=url
    &populate[level_3_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields]=title,url,position,level_4_title
    &populate[level_3_${categorySlugPlural}][populate][level_4_${categorySlugPlural}][fields]=name,url,position
    &populate[level_3_${categorySlugPlural}][populate][level_4_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields]=title,url,position
    &populate[tags][fields]=title
  `.replace(/\s+/g, "");

  const [
    articleData,
    categoryArticleData,
    categoryLevel2Data,
  ] = await Promise.all([
    getArticle(locale, category, url),
    fetch(`${CMSConfigAPI}/api/${categoryArticleApi}/?locale=${locale}${categoryArticleParams}`).then(res => res.json()),
    fetch(`${CMSConfigAPI}/api/level-2-${category === "docs" ? "docs" : `${category}s`}/?locale=${locale}${categoryLevel2Params}`).then(res => res.json())
  ]);
  
  if (articleData.data.length) {
    articleData.data[0].attributes.article = true;
    return { data: articleData.data };
  } else if (categoryArticleData.data.length) {
    return { data: categoryArticleData.data };
  } else if (categoryLevel2Data.data.length) {
    return { data: categoryLevel2Data.data };
  } else {
    return { data: [{ isFallback: true }] };
  }  
};

export default getLevel3Data;