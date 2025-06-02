import CONFIG from "@config/config";

const getLevel1Data = async (locale, slug, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const categorySlugPlural = slug === "docs" ? "docs" : `${slug}s`;

  const params = `
    &filters[slug_id][$eq]=${slug}
    &fields=name,url,slug_id,seo_title,seo_description
    &populate[card_field_img][fields]=url
    ${slug === "integration" ? (`
      &populate[articles][populate][connector_img][fields]=url
      &populate[articles][fields]=title,url,description
    `) : (`
      &populate[category_${categorySlugPlural}][fields]=name,url,description,slug_id,position
      &populate[category_${categorySlugPlural}][populate][level_2_${categorySlugPlural}][fields]=name,url,position
      &populate[category_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields]=title,url,position
      &populate[category_${categorySlugPlural}][populate][card_field_img][fields]=url
    `)}
  `.replace(/\s+/g, "");

  const res = await fetch(`${CMSConfigAPI}/api/categories/?&locale=${locale}${params}${preview ? "&status=draft" : ""}`);
  const data = await res.json();
  return data;
  
};

export default getLevel1Data;