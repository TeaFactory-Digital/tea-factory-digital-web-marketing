/**
 * The canonical origin, used by robots.txt and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment before going live.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teafactorydigital.lk'
).replace(/\/$/, '');

/**
 * The company WhatsApp, the contact phone (+94 77 995 1056) in the international form
 * `wa.me` wants: digits only, country code first (24 November 2026).
 */
export const whatsappNumber = '94779951056';

/** A WhatsApp chat with the company, the message already typed in the reader's language. */
export function whatsappLink(text: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
