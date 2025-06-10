import CONFIG from "@config/config";


function safeParseCookies(cookieHeader) {
  const cookies = new Map();
  if (!cookieHeader) return cookies;
  const cookiePairs = cookieHeader.split(';');
  for (const pair of cookiePairs) {
    const [rawKey, rawValue] = pair.trim().split('=');
    if (!rawKey || !rawValue) continue;
    try {
      const key = decodeURIComponent(rawKey.trim());
      const value = decodeURIComponent(rawValue.trim());
      cookies.set(key, { value });
    } catch (err) {
      
      
    }
  }

  return cookies;
}

export function isPreviewMode(req) {
  let cookies = req?.cookies;
  if (!cookies || typeof cookies.get !== 'function') {
    let cookieHeader = req?.headers?.get ? req.headers.get('cookie') : req?.headers?.cookie;
    cookies = safeParseCookies(cookieHeader);
  }

  const hasPreviewCookie =
    cookies?.get?.('__prerender_bypass')?.value === CONFIG.preview.secretKey ||
    cookies?.get?.('__next_preview_data')?.value ||
    cookies?.get?.('preview')?.value === 'true';

  const hasPreviewHeader = req?.headers?.get?.('x-preview') === 'enabled' || req?.headers?.['x-preview'] === 'enabled';

  const url = new URL(req?.url || '', 'http://localhost:30006');
  const isStrapiPreview =
    url.searchParams.get('x-strapi-preview') === 'true' &&
    url.searchParams.get('x-strapi-preview-secret') === CONFIG.preview.secretKey;

  return hasPreviewCookie || hasPreviewHeader || isStrapiPreview;
}


export function getPreviewUrl(slug = '') {
  const baseUrl = CONFIG.preview.previewUrl || '/api/preview';
  const secret = CONFIG.preview.secretKey;

  const url = new URL(baseUrl, 'http://localhost:30006');
  url.searchParams.set('x-strapi-preview', 'true');
  url.searchParams.set('x-strapi-preview-secret', secret);

  if (slug) {
    url.searchParams.set('slug', slug);
  }


  return `${url.pathname}${url.search}`;
}
