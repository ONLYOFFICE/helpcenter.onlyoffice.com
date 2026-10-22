import getLevel3Data from "@lib/strapi/getLevel3Data";
import { applyCors, setCache, resolveLocale, localizeUrl, buildContents } from "@lib/embed/utils";

const EDITOR = /^[a-z_]+$/;

// GET /api/embed/contents?editor=document_editor&lang=de
// Table of contents of an editor's user guide for the built-in help of the editors
export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  const editor = req.query.editor;
  if (typeof editor !== "string" || !EDITOR.test(editor)) {
    return res.status(400).json({ error: "Invalid editor" });
  }

  const requested = resolveLocale(req.query.lang);
  const url = `/docs/userguides/${editor}`;

  try {
    for (const locale of requested === "en" ? ["en"] : [requested, "en"]) {
      const data = await getLevel3Data(locale, "docs", localizeUrl(locale, url));
      const level2 = data?.data?.[0];

      if (level2 && !level2.article) {
        const contents = buildContents(locale, level2);
        if (contents.length) {
          setCache(res);
          return res.status(200).json({ editor, locale, contents });
        }
      }
    }

    return res.status(404).json({ error: "Not found" });
  } catch (e) {
    return res.status(502).json({ error: "CMS is unavailable" });
  }
}
