import CONFIG from "@config/config";

const getFunctions = async (locale, url, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

  const res = await fetch(`${CMSConfigAPI}/api/functions/?locale=${locale}&filters[url][$eq]=${url}&fields=title,content&populate[tags][fields]=title${preview ? "&status=draft" : ""}`);
  const data = await res.json();
  return data;
};

export default getFunctions;