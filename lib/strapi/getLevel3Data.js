import CONFIG from "@config/config";
import getArticle from "./getArticle";

const getLevel3Data = async (locale, category, url, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const categoryArticleApi = category === "docs" ? "categories-docs" : category === "docspace" ? "category-doc-spaces" : `category-${category}s`;
  const categorySlugSingular = category === "docs" ? "doc" : category;
  const categorySlugPlural = category === "docs" ? "docs" : `${category}s`;
  const hasLevel4 = category === "docs" || category === "mobile" || category === "workspace";

  const categoryArticleParams = `
    &fields=seo_title,seo_description,name,description
    &populate[general_category][fields]=name,url
    &populate[tags][fields]=title
  `.replace(/\s+/g, "");

  const categoryLevel2Params = `
    &filters[url][$eq]=${url}
    &fields=name,url,seo_title,seo_description
    &populate[category_pic][fields][0]=url
    &populate[article_${categorySlugPlural}][fields][0]=title
    &populate[article_${categorySlugPlural}][fields][1]=url
    &populate[article_${categorySlugPlural}][fields][2]=position
    &populate[article_${categorySlugPlural}][fields][3]=level_4_title
    &populate[article_${categorySlugPlural}][populate][icon][fields][0]=url
    &populate[category_${categorySlugSingular}][fields][0]=name
    &populate[category_${categorySlugSingular}][fields][1]=url
    &populate[category_${categorySlugSingular}][populate][general_category][fields][0]=name
    &populate[category_${categorySlugSingular}][populate][general_category][fields][1]=url
    &populate[level_3_${categorySlugPlural}][fields][0]=name
    &populate[level_3_${categorySlugPlural}][fields][1]=url
    &populate[level_3_${categorySlugPlural}][fields][2]=position
    &populate[level_3_${categorySlugPlural}][populate][icon][fields][0]=url
    &populate[level_3_${categorySlugPlural}][populate][icon_small][fields][0]=url
    &populate[level_3_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields][0]=title
    &populate[level_3_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields][1]=url
    &populate[level_3_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields][2]=position
    &populate[level_3_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields][3]=level_4_title
    &populate[faq][fields][0]=name
    &populate[faq][fields][1]=url
  `.replace(/\s+/g, "");

  const categoryLevel4Params = `
    &populate[level_3_${categorySlugPlural}][populate][level_4_${categorySlugPlural}][fields]=name,url,position
    &populate[level_3_${categorySlugPlural}][populate][level_4_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields]=title,url,position
  `.replace(/\s+/g, "");
  const [
    articleData,
    categoryArticleData,
    categoryLevel2Data,
  ] = await Promise.all([
    getArticle(locale, category, url, preview),
    fetch(`${CMSConfigAPI}/api/${categoryArticleApi}/?locale=${locale}${categoryArticleParams}${preview ? "&status=draft" : ""}`).then(res => res.json()),
    fetch(`${CMSConfigAPI}/api/level-2-${category === "docs" ? "docs" : `${category}s`}/?locale=${locale}${categoryLevel2Params}${hasLevel4 ? categoryLevel4Params : ""}${preview ? "&status=draft" : ""}`).then(res => res.json())
  ]);

  if (articleData && articleData.data && articleData.data.length > 0) {
  const articleWithContent = articleData.data.find(item => item.content && item.content.trim() !== "");
  
    if (articleWithContent) {
      articleWithContent.article = true;
      return { data: [articleWithContent] };
    }
  } else if (categoryLevel2Data && categoryLevel2Data.data && categoryLevel2Data.data.length > 0) {
    return { data: categoryLevel2Data.data };
  } else if (categoryArticleData && categoryArticleData.data && categoryArticleData.data.length > 0) {
    return { data: categoryArticleData.data };
  } else {
    return;
  }
};

export default getLevel3Data;