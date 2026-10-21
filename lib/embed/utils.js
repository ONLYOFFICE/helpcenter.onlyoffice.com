import languages from "@config/languages.json";

const SITE_LOCALES = languages.map((el) => el.shortKey);

export const applyCors = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(405).json({ error: "Method not allowed" });
    return true;
  }

  return false;
};

export const setCache = (res) => {
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300, stale-while-revalidate=3600");
};

// The locale goes to the CMS query as is, so only the locales of the site are allowed
export const resolveLocale = (lang) => {
  return SITE_LOCALES.includes(lang) ? lang : "en";
};

// Urls are stored in Strapi with locale prefix for non-english articles
export const localizeUrl = (locale, url) => {
  return `${locale === "en" ? "" : `/${locale}`}${url}`;
};

// Strapi keeps the prefix in lower case (/pt-br/...)
export const unlocalizeUrl = (locale, url) => {
  const prefix = `/${locale}/`.toLowerCase();
  return url && url.toLowerCase().startsWith(prefix) ? url.slice(prefix.length - 1) : url;
};

const byPosition = (a, b) => (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER);

// Strapi "level 2" page of an editor -> flat list in the format of the editors' Contents.json
export const buildContents = (locale, level2) => {
  const contents = [];

  const pushArticles = (articles, headername) => {
    [...(articles || [])].sort(byPosition).forEach((article, index) => {
      contents.push({
        src: unlocalizeUrl(locale, article.url),
        name: article.title,
        ...(index === 0 && headername ? { headername } : {}),
      });
    });
  };

  pushArticles(level2.article_docs);

  [...(level2.level_3_docs || [])].sort(byPosition).forEach((level3) => {
    const length = contents.length;
    pushArticles(level3.article_docs, level3.name);

    [...(level3.level_4_docs || [])].sort(byPosition).forEach((level4) => {
      pushArticles(level4.article_docs, contents.length === length ? level3.name : undefined);
    });
  });

  return contents;
};
