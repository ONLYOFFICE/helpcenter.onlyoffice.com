import CONFIG from "@config/config";

const getMainPageData = async (locale, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const categories = ["docs", "desktop", "docspace", "mobile", "workspace", "integration"];

  const params = (category) => {
    const categorySlugPlural = category === "docs" ? "docs" : `${category}s`;
    return (`
      ${category === "integration" ? (`
        &filters[slug_id][$eq]=integration
        &populate[articles][fields]=title,url
      `) : (`
        &filters[slug_id][$eq]=${category}
        &fields=name,url,position,description,slug_id
        &populate[category_${categorySlugPlural}][fields]=name,url,slug_id,position
        &populate[category_${categorySlugPlural}][populate][article_${categorySlugPlural}][fields]=title,url,position
        &populate[category_${categorySlugPlural}][populate][level_2_${categorySlugPlural}][fields]=name,url,position
      `)}
      &populate[card_field_img]=true
      &populate[card_field_img_x48]=true
    `).replace(/\s+/g, "");
  }

  const urls = categories.map(category => `${CMSConfigAPI}/api/categories/?locale=${locale}${params(category)}${preview ? "&status=draft" : ""}`);
  const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
  const results = await Promise.all(fetchPromises);
  const data = results.reduce((acc, result) => {
    if (result.data && Array.isArray(result.data)) {
      return acc.concat(result.data);
    }
    return acc;
  }, []);
  return { data };
};

export default getMainPageData;
