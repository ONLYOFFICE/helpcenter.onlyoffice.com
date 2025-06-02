import CONFIG from "@config/config";

const getFaq = async (locale, url, preview) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

  const params = `
    &filters[url][$eq]=${url}
    &fields=name,seo_title,seo_description
    &populate[faq_block][fields]=name
    &populate[faq_block][populate][faq_item][fields]=question,answer
    &populate[tags][fields]=title
  `.replace(/\s+/g, "");

  const res = await fetch(`${CMSConfigAPI}/api/faqs/?locale=${locale}${params}${preview ? "&status=draft" : ""}`);
  const data = await res.json();
  return data;
};

export default getFaq;