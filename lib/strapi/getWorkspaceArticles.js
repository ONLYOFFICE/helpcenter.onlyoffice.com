import CONFIG from "@config/config";

const getWorkspaceArticles = async (locale) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/article-workspaces/?locale=${locale}&sort=title:asc&pagination[pageSize]=100&populate=*`
  );
  const data = await res.json();
  return data;
};

export default getWorkspaceArticles;