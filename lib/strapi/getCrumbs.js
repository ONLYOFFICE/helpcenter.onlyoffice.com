import CONFIG from "@config/config";

const getArticleBreadcrumbs = async (locale, item) => {
  const CMSConfigAPI = CONFIG.api.cms;
  const detectCategoryType = (item) => {
    if ("category_desktop" in item) return "desktop";
    if ("category_docs" in item) return "docs";
    if ("category_mobile" in item) return "mobile";
    if ("category_workspace" in item) return "workspace";
    if ("category_docspace" in item) return "docspace";
    if ("category" in item) return "integration";
    if ("category_ai" in item) return "ai";
    return null;
  };

  const category = detectCategoryType(item);

  if (!category) return [];

  const categorySlugSingular = category === "docs" ? "doc" : category;

  if (category === "integration") {
    const params = `
    &filters[url][$eq]=${item.url}
    &populate[category][fields]=name
  `.replace(/\s+/g, "");

    const res = await fetch(
      `${CMSConfigAPI}/api/articles?locale=${locale}${params}`,
    );

    const json = await res.json();
    const data = json?.data?.[0];

    if (!data) return [];

    const crumbs = [];
    crumbs.push({ name: "Home" });

    if (data.category) {
      crumbs.push({ name: data.category.name });
    }
    
    return crumbs;
  }

  const params = `
  &filters[url][$eq]=${item.url}

  &populate[category_${category}][fields]=name
  &populate[category_${category}][populate][general_category][fields]=name

  &populate[level_2_${categorySlugSingular}][fields]=name
  &populate[level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][fields]=name
  &populate[level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][populate][general_category][fields]=name
`.replace(/\s+/g, "");

  const level3Params = `
  &populate[level_3_${categorySlugSingular}][fields]=name
  &populate[level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][fields]=name
  &populate[level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][fields]=name
  &populate[level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][populate][general_category][fields]=name
`.replace(/\s+/g, "");

  const level4Params = `
  &populate[level_4_${categorySlugSingular}][fields]=name
  &populate[level_4_${categorySlugSingular}][populate][level_3_${categorySlugSingular}][fields]=name
  &populate[level_4_${categorySlugSingular}][populate][level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][fields]=name
  &populate[level_4_${categorySlugSingular}][populate][level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][fields]=name
  &populate[level_4_${categorySlugSingular}][populate][level_3_${categorySlugSingular}][populate][level_2_${categorySlugSingular}][populate][category_${categorySlugSingular}][populate][general_category][fields]=name
`.replace(/\s+/g, "");

  const res = await fetch(
    `${CMSConfigAPI}/api/${category === "docs" ? "articles-docs" : `article-${category}s`}?locale=${locale}${params}${category !== "desktop" && category !== "ai" ? level3Params : ""}${category !== "desktop" && category !== "docspace" && category !== "ai" ? level4Params : ""}`,
  );

  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) return [];

  const crumbs = [];

  const level4 = data[`level_4_${categorySlugSingular}`];
  const level3 = level4
    ? level4[`level_3_${categorySlugSingular}`]
    : data[`level_3_${categorySlugSingular}`];
  const level2 = level3
    ? level3[`level_2_${categorySlugSingular}`]
    : data[`level_2_${categorySlugSingular}`];
  const crumbCategory = level2
    ? level2[`category_${categorySlugSingular}`]
    : data[`category_${categorySlugSingular}`];

  const general = crumbCategory?.general_category;

  crumbs.push({ name: "Home" });
  if (general) crumbs.push({ name: general.name });
  if (crumbCategory) crumbs.push({ name: crumbCategory.name });
  if (level2) crumbs.push({ name: level2.name });
  if (level3) crumbs.push({ name: level3.name });
  if (level4) crumbs.push({ name: level4.name });

  return crumbs;
};

export default getArticleBreadcrumbs;
