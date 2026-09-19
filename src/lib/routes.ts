import type { Locale } from '@/i18n';

/**
 * Every internal href is built through here so the locale segment can never be
 * forgotten. Anchors on the home page are written as `/#section`.
 */
export function href(locale: Locale, path: string): string {
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  if (path === '/') return `/${locale}`;
  if (path.startsWith('/#')) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
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
