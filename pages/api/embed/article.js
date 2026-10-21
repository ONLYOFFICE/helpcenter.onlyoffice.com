import getArticle from "@lib/strapi/getArticle";
import { applyCors, setCache, resolveLocale, localizeUrl, unlocalizeUrl } from "@lib/embed/utils";

const ARTICLE_URL = /^\/docs\/userguides\/[a-z_]+\/[\w.-]+\.aspx$/i;

// GET /api/embed/article?url=/docs/userguides/document_editor/FileTab.aspx&lang=de
// Content of an article without the site layout for the built-in help of the editors
export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  const url = typeof req.query.url === "string" ? req.query.url : "";
  if (!ARTICLE_URL.test(url)) {
    return res.status(400).json({ error: "Invalid url" });
  }

  const requested = resolveLocale(req.query.lang);

  try {
    for (const locale of requested === "en" ? ["en"] : [requested, "en"]) {
      const data = await getArticle(locale, "docs", localizeUrl(locale, url));
      const article = data?.data?.find((item) => item.content && item.content.trim() !== "");

      if (article) {
        setCache(res);
        return res.status(200).json({
          locale,
          url: unlocalizeUrl(locale, article.url),
          title: article.title,
          content: article.content,
        });
      }
    }

    return res.status(404).json({ error: "Not found" });
  } catch (e) {
    return res.status(502).json({ error: "CMS is unavailable" });
  }
}
