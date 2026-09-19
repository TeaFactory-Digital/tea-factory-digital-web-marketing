'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, Globe, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { locales, localeNames, localeShortNames, type Locale, type Dictionary } from '@/i18n';
import { href, sections } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

/** Pages whose first screen is dark, so the bar can start transparent on them. */
const DARK_HERO_PATHS = ['', '/app', '/console'];

export function Navbar({ locale, t }: { locale: Locale; t: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);

  // The default locale has no prefix, so the home page is `/` and the others
  // are `/si`, `/ta`. Both normalise to '' here, which is what DARK_HERO_PATHS
  // and the language switcher below are written against.
  const pathWithoutLocale = React.useMemo(() => {
    const stripped = pathname.replace(new RegExp(`^/(${locales.join('|')})(?=/|$)`), '');
    return stripped === '/' ? '' : stripped;
  }, [pathname]);

  const overDarkHero = DARK_HERO_PATHS.includes(pathWithoutLocale);
  const transparent = overDarkHero && !scrolled;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // The mobile sheet owns the viewport while it is open.
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const links = [
    { label: t.nav.product, path: `/#${sections.platform}` },
    { label: t.nav.features, path: `/#${sections.features}` },
    { label: t.nav.forSuppliers, path: '/app' },
    { label: t.nav.forFactories, path: '/console' },
    { label: t.nav.whiteLabel, path: `/#${sections.whiteLabel}` },
    { label: t.nav.security, path: `/#${sections.security}` },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-400 ease-out',
          transparent
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-cream-200/80 bg-cream-50/88 shadow-[0_1px_28px_-14px_rgb(4_21_14/0.35)] backdrop-blur-xl',
        )}
      >
        <div className="shell flex h-18 items-center gap-3 py-3.5 md:h-20">
          <Link
            href={href(locale, '/')}
            aria-label={t.meta.siteName}
            className="shrink-0 transition-opacity hover:opacity-85"
          >
            <Logo tone={transparent ? 'light' : 'dark'} />
          </Link>

          <nav className="ms-2 hidden min-w-0 items-center gap-0.5 xl:flex">
            {links.map((link) => (
              <Link
                key={link.path}
                href={href(locale, link.path)}
                className={cn(
                  'nav-link whitespace-nowrap rounded-full px-3 py-2 text-[0.875rem] font-medium transition-colors',
                  transparent
                    ? 'text-cream-100/80 hover:bg-cream-50/10 hover:text-cream-50'
                    : 'text-char-700 hover:bg-forest-900/[0.05] hover:text-forest-900',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex shrink-0 items-center gap-1.5">
            {/* Language */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-label={t.common.language}
                className={cn(
                  'flex h-10 items-center gap-1.5 rounded-full px-3 text-[0.82rem] font-semibold transition-colors',
                  transparent
                    ? 'text-cream-100/85 hover:bg-cream-50/10'
                    : 'text-char-700 hover:bg-forest-900/[0.05]',
                )}
              >
                <Globe className="size-4" strokeWidth={2} />
                <span>{localeShortNames[locale]}</span>
              </button>

              <AnimatePresence>
                {langOpen ? (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setLangOpen(false)}
                      aria-hidden="true"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="absolute end-0 top-12 z-20 w-44 overflow-hidden rounded-2xl border border-cream-200 bg-white p-1.5 shadow-panel"
                    >
                      {locales.map((l) => (
                        <Link
                          key={l}
                          href={href(l, pathWithoutLocale || '/')}
                          hrefLang={l}
                          className={cn(
                            'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors',
                            l === locale
                              ? 'bg-leaf-100/70 font-semibold text-forest-900'
                              : 'text-char-700 hover:bg-cream-100',
                          )}
                        >
                          {localeNames[l]}
                          {l === locale ? <Check className="size-4 text-leaf-600" strokeWidth={2.5} /> : null}
                        </Link>
                      ))}
                    </motion.div>
                  </>
                ) : null}
              </AnimatePresence>
            </div>

            <Link
              href={href(locale, '/console')}
              className={cn(
                'hidden h-10 items-center rounded-full px-3 text-[0.85rem] font-medium transition-colors 2xl:inline-flex',
                transparent
                  ? 'text-cream-100/75 hover:text-cream-50'
                  : 'text-char-600 hover:text-forest-900',
              )}
            >
              {t.common.signIn}
            </Link>

            <ButtonLink
              href={href(locale, '/demo')}
              size="sm"
              variant={transparent ? 'cream' : 'primary'}
              className="hidden whitespace-nowrap sm:inline-flex"
            >
              {t.common.requestDemoShort}
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.common.menu}
              className={cn(
                'grid size-10 shrink-0 place-items-center rounded-full transition-colors xl:hidden',
                transparent
                  ? 'text-cream-50 hover:bg-cream-50/10'
                  : 'text-forest-900 hover:bg-forest-900/[0.06]',
              )}
            >
              <Menu className="size-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* ---- Mobile sheet ---- */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-forest-950/55 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute inset-x-0 top-0 max-h-dvh overflow-y-auto rounded-b-4xl bg-cream-50 pb-8 shadow-panel"
            >
              <div className="shell flex h-18 items-center">
                <Logo tone="dark" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t.common.close}
                  className="ms-auto grid size-10 place-items-center rounded-full text-forest-900 hover:bg-forest-900/[0.06]"
                >
                  <X className="size-5" strokeWidth={2.2} />
                </button>
              </div>

              <nav className="shell mt-2 flex flex-col">
                {links.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.3 }}
                  >
                    <Link
                      href={href(locale, link.path)}
                      className="block border-b border-cream-200 py-4 font-display text-xl font-semibold text-forest-900"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="shell mt-6 space-y-3">
                <ButtonLink href={href(locale, '/demo')} size="lg" className="w-full">
                  {t.common.requestDemo}
                </ButtonLink>
                <div className="flex gap-2">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={href(l, pathWithoutLocale || '/')}
                      hrefLang={l}
                      className={cn(
                        'flex-1 rounded-full border px-3 py-2.5 text-center text-sm font-semibold transition-colors',
                        l === locale
                          ? 'border-leaf-600 bg-leaf-100/60 text-forest-900'
                          : 'border-cream-300 text-char-600',
                      )}
                    >
                      {localeNames[l]}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
