/**
 * The canonical origin, used by robots.txt and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment before going live.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teafactorydigital.lk'
).replace(/\/$/, '');
