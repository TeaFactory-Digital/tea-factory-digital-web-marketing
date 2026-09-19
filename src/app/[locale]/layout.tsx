import { existsSync } from 'node:fs';
import path from 'node:path';
import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, Noto_Sans_Sinhala, Noto_Sans_Tamil } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, locales, type Locale } from '@/i18n';
import { siteUrl } from '@/lib/site';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * Sinhala and Tamil are loaded as variable-font families alongside the Latin
 * pair rather than instead of them: a Sinhala page still sets Latin numerals,
 * "LKR" and the product name.
 */
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  variable: '--font-sinhala',
  display: 'swap',
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil',
  display: 'swap',
});

/**
 * Photography is optional. Checked once here, on the server, at build time:
 * when the file is absent the `data-photo` flag is never set, the CSS rule
 * that references it never matches, and the browser makes no request for a
 * file that is not there. Drop it in and every backdrop picks it up.
 */
const hasPlantationPhoto = existsSync(
  path.join(process.cwd(), 'public', 'images', 'plantation.jpg'),
);

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0a2317',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t.meta.title,
      template: `%s · ${t.meta.siteName}`,
    },
    description: t.meta.description,
    applicationName: t.meta.siteName,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      siteName: t.meta.siteName,
      locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  // All three script families load on every locale: the trilingual section
  // renders Sinhala, English and Tamil side by side whatever page you are on.
  const fontVars = [outfit.variable, inter.variable, notoSinhala.variable, notoTamil.variable].join(' ');

  return (
    <html lang={locale} className={fontVars} data-photo={hasPlantationPhoto ? 'on' : undefined}>
      <body
        className="min-h-dvh bg-cream-50 antialiased"
        style={
          locale === 'si'
            ? { fontFamily: 'var(--font-sinhala), var(--font-inter), system-ui, sans-serif' }
            : locale === 'ta'
              ? { fontFamily: 'var(--font-tamil), var(--font-inter), system-ui, sans-serif' }
              : undefined
        }
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream-50"
        >
          {t.common.backToHome}
        </a>
        <Navbar locale={locale as Locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale as Locale} t={t} />
      </body>
    </html>
  );
}
