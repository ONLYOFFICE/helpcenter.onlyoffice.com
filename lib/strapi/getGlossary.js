import CONFIG from "@config/config";

const getGlossary = async (locale, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const res = await fetch(
    `${CMSConfigAPI}/api/glossaries/?locale=${locale}&sort[]=title:asc&pagination[pageSize]=200&fields[0]=title&fields[1]=subtitle&fields[2]=definition${preview ? "&status=draft" : ""}`
  );
  const data = await res.json();
  return data;
};

export default getGlossary;