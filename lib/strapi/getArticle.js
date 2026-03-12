import CONFIG from "@config/config";

const getArticle = async (locale, category, url, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const categorySlugSingular = category === "docs" ? "doc" : category;
  const hasLevel4 = category === "docs" || category === "mobile" || category === "workspace";
  
  const level3Populate = category !== "desktop" && category !== "ai" ? `
    &populate[level_3_${categorySlugSingular}][fields]=name,url
    &populate[level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][fields]=name,url
    &populate[level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][fields]=name,url
    &populate[level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][populate][general_category][fields]=name,url
  ` : "";

  const params = `
    &filters[url][$eq]=${url}
    &[fields]=title,content,url,seo_title,seo_description,isAIGenerated
    &populate[category_${category === "docs" ? "docs" : category}][fields]=name,url
    &populate[category_${category === "docs" ? "docs" : category}][populate][general_category][fields]=name,url
    &populate[level_2_${categorySlugSingular}][fields]=name,url
    &populate[level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][fields]=name,url
    &populate[level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][populate][general_category][fields]=name,url
    ${level3Populate}
    &populate[tags][fields]=title
    &populate[videos][fields]=title,url,description
  `.replace(/\s+/g, "");

  const level4Params = `
    &populate[level_4_${categorySlugSingular}][fields]=name,url
    &populate[level_4_${categorySlugSingular}][populate][level_3_${categorySlugSingular}][fields]=name,url
    &populate[level_4_${categorySlugSingular}][populate][level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][fields]=name,url
    &populate[level_4_${categorySlugSingular}][populate][level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][fields]=name,url
    &populate[level_4_${categorySlugSingular}][populate][level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][populate][general_category][fields]=name,url
  `.replace(/\s+/g, "");

  const response = await fetch(`${CMSConfigAPI}/api/${category === "docs" ? "articles-docs" : `article-${category}s`}/?locale=${locale}${params}${hasLevel4 ? level4Params : ""}${preview ? "&status=draft" : ""}`);
  const data = await response.json();
  return data;
};

export default getArticle;