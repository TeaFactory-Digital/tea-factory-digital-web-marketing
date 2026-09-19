/**
 * Locale configuration.
 *
 * The product defaults to Sinhala on the supplier's phone; this marketing site
 * defaults to English because its primary reader is factory management, who
 * evaluate software in English. Sinhala and Tamil are first-class, not an
 * afterthought: every string on every page is translated.
 */
export const locales = ['en', 'si', 'ta'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  si: 'සිංහල',
  ta: 'தமிழ்',
};

/** Short label for the compact language switcher. */
export const localeShortNames: Record<Locale, string> = {
  en: 'EN',
  si: 'සිං',
  ta: 'தமி',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
