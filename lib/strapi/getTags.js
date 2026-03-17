import CONFIG from "@config/config";

const getTags = async (locale, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const baseUrl = `${CMSConfigAPI}/api/tags/?locale=${locale}&sort=title:asc&fields=title${preview ? "&status=draft" : ""}`;

  const res1 = await fetch(`${baseUrl}&pagination[pageSize]=200&pagination[page]=1`);
  const data1 = await res1.json();

  const res2 = await fetch(`${baseUrl}&pagination[pageSize]=200&pagination[page]=2`);
  const data2 = await res2.json();

  return {
    data: [...data1.data, ...data2.data],
    meta: data2.meta,
  };
};

export default getTags;