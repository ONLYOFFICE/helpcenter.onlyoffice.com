import CONFIG from "@config/config";

const getTags = async (locale, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

  const res = await fetch(`${CMSConfigAPI}/api/tags/?locale=${locale}&sort=title:asc&pagination[limit]=-1&fields=title${preview ? "&status=draft" : ""}`);
  const data = await res.json();
  return data;
};

export default getTags;