import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { localePrefix } from '@/lib/routes';
import { siteUrl } from '@/lib/site';

/** Every page, in every locale, with the other locales declared as alternates. */
const paths = ['', '/app', '/console', '/demo', '/legal/privacy', '/legal/terms'];

/** English is unprefixed, so its home page is the bare origin. */
function url(locale: (typeof locales)[number], path: string): string {
  return `${siteUrl}${localePrefix(locale)}${path}` || siteUrl;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: url(locale, path),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((other) => [other, url(other, path)])),
      },
    })),
  );
}
