import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

/**
 * Picks the best locale we can infer for a locale-less path.
 *
 * Accept-Language decides, defaulting to English: the reader of this site is
 * usually factory management evaluating software, and an English page is the
 * safe landing. The switcher in the header is one click away, and the choice
 * sticks because every link carries its locale.
 */
function resolveLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language');
  if (!header) return defaultLocale;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if ((locales as readonly string[]).includes(base)) return base;
  }
  return defaultLocale;
}

/**
 * English is the default locale and has no prefix, so the site's front door is
 * `/`, not `/en`.
 *
 * That leaves three cases. `/en/...` is a second address for a page that already
 * has a clean one, so it is sent there permanently rather than served twice.
 * `/si/...` and `/ta/...` are already correct. Anything else is locale-less: a
 * browser asking for Sinhala or Tamil is redirected to that prefix, and everyone
 * else is served the `/en` segment through a rewrite, which the address bar
 * never shows.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  const alreadyPrefixed = locales.some(
    (locale) =>
      locale !== defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)),
  );
  if (alreadyPrefixed) return NextResponse.next();

  const locale = resolveLocale(request);
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return locale === defaultLocale ? NextResponse.rewrite(url) : NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)'],
};
