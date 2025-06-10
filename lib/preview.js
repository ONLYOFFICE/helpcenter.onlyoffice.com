import CONFIG from "@config/config";

export function isPreviewMode(req) {

  const hasPreviewCookie =
    req?.cookies?.get('__prerender_bypass')?.value === CONFIG.preview.secretKey ||
    req?.cookies?.get('__next_preview_data')?.value ||
    req?.cookies?.get('preview')?.value === 'true';


  const hasPreviewHeader = req?.headers?.get('x-preview') === 'enabled';


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
