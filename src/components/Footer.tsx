import * as React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { locales, localeNames } from '@/i18n';
import { href, sections } from '@/lib/routes';
import { Logo } from '@/components/Logo';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const columns = [
    {
      title: t.footer.product.title,
      links: [
        { label: t.footer.product.app, path: '/app' },
        { label: t.footer.product.console, path: '/console' },
        { label: t.footer.product.features, path: `/#${sections.features}` },
        { label: t.footer.product.whiteLabel, path: `/#${sections.whiteLabel}` },
      ],
    },
    {
      title: t.footer.resources.title,
      links: [
        { label: t.footer.resources.integration, path: `/#${sections.integration}` },
        { label: t.footer.resources.security, path: `/#${sections.security}` },
        { label: t.footer.resources.support, path: `mailto:${t.footer.contact.email}` },
        { label: t.footer.resources.demo, path: '/demo' },
      ],
    },
    {
      title: t.footer.legal.title,
      links: [
        { label: t.footer.legal.privacy, path: '/legal/privacy' },
        { label: t.footer.legal.terms, path: '/legal/terms' },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream-100">
      <div className="grid-veil absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -left-40 top-0 size-[26rem] rounded-full bg-leaf-600/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.2fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-cream-100/55">
              {t.footer.description}
            </p>

            <div className="mt-7 space-y-2.5">
              <p className="t-eyebrow text-cream-100/35">{t.footer.contact.title}</p>
              <a
                href={`mailto:${t.footer.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-cream-100/70 transition-colors hover:text-leaf-300"
              >
                <Mail className="size-4 shrink-0 text-leaf-400" strokeWidth={2} />
                {t.footer.contact.email}
              </a>
              <a
                href={`tel:${t.footer.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-sm text-cream-100/70 transition-colors hover:text-leaf-300"
              >
                <Phone className="size-4 shrink-0 text-leaf-400" strokeWidth={2} />
                {t.footer.contact.phone}
              </a>
              <p className="flex items-center gap-2.5 text-sm text-cream-100/70">
                <MapPin className="size-4 shrink-0 text-leaf-400" strokeWidth={2} />
                {t.footer.contact.country}
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="t-eyebrow mb-4 text-cream-100/35">{column.title}</p>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={href(locale, link.path)}
                        className="text-[0.92rem] text-cream-100/62 transition-colors hover:text-leaf-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-cream-50/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.82rem] text-cream-100/40">
            <span>{t.footer.copyright}</span>
            <span className="hidden sm:inline">·</span>
            <span>{t.footer.tagline}</span>
          </div>

          <div className="flex items-center gap-1">
            {locales.map((l) => (
              <Link
                key={l}
                href={href(l, '/')}
                hrefLang={l}
                className={
                  l === locale
                    ? 'rounded-full bg-cream-50/10 px-3 py-1.5 text-xs font-semibold text-cream-50'
                    : 'rounded-full px-3 py-1.5 text-xs font-medium text-cream-100/45 transition-colors hover:text-cream-100'
                }
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
