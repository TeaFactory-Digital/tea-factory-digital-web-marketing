import { defaultLocale, type Locale } from '@/i18n';

/**
 * The locale's URL prefix. English is the default and carries none, so the
 * site's front door is `/` rather than `/en`; Sinhala and Tamil keep theirs.
 */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

/**
 * Every internal href is built through here so the locale segment can never be
 * forgotten, and so the default locale never grows one. Anchors on the home
 * page are written as `/#section`.
 */
export function href(locale: Locale, path: string): string {
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  const prefix = localePrefix(locale);
  if (path === '/') return prefix || '/';
  if (path.startsWith('/#')) return prefix ? `${prefix}${path.slice(1)}` : path;
  return `${prefix}${path}`;
}

/** Section ids used by the header and footer to jump into the home page. */
export const sections = {
  platform: 'platform',
  features: 'features',
  greenLeaf: 'green-leaf',
  whiteLabel: 'white-label',
  integration: 'integration',
  console: 'console',
  security: 'security',
} as const;
