import * as React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { Locale } from '@/i18n';
import { href } from '@/lib/routes';
import { ButtonLink } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/card';
import { Reveal } from '@/components/ui/motion';
import { PhotoBackdrop } from '@/components/PlantationScene';

/** The dark opening used by the interior product pages. */
export function PageHero({
  locale,
  eyebrow,
  title,
  subtitle,
  highlights,
  ctaLabel,
  aside,
  variant = 'morning',
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  highlights: string[];
  ctaLabel: string;
  aside?: React.ReactNode;
  variant?: 'dusk' | 'morning' | 'aerial';
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 pb-20 pt-32 md:pb-28 md:pt-36 lg:pt-40">
      <PhotoBackdrop
        variant={variant}
        overlay="from-forest-950/48 via-forest-950/34 to-forest-900/74"
        scrim="from-forest-950/88 via-forest-950/45 to-transparent"
        photoPosition="38% 58%"
        photoBlur={1.5}
        photoOpacity={0.9}
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="light" className="mb-5">
            {eyebrow}
          </Eyebrow>
          <h1 className="t-display font-semibold text-cream-50">{title}</h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-100/72 md:text-xl">
            {subtitle}
          </p>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-cream-100/62">
                <Check className="size-4 shrink-0 text-leaf-400" strokeWidth={2.6} />
                {item}
              </li>
            ))}
          </ul>

          <ButtonLink href={href(locale, '/demo')} size="lg" variant="cream" className="group mt-10">
            {ctaLabel}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" strokeWidth={2.4} />
          </ButtonLink>
        </Reveal>

        {aside ? <Reveal delay={0.14}>{aside}</Reveal> : null}
      </div>
    </section>
  );
}

/** Alternating text-and-visual blocks used down the interior pages. */
export function SplitBlock({
  index,
  title,
  body,
  visual,
  flip = false,
  tone = 'cream',
}: {
  index: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  flip?: boolean;
  tone?: 'cream' | 'white';
}) {
  return (
    <div
      className={
        'py-16 md:py-20 ' + (tone === 'white' ? 'bg-white' : 'bg-cream-50')
      }
    >
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className={flip ? 'lg:order-2' : undefined}>
            <span className="t-eyebrow text-leaf-700">{index}</span>
            <h2 className="t-h3 mt-4 font-semibold text-forest-900">{title}</h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-char-500">{body}</p>
          </Reveal>

          <Reveal delay={0.1} className={flip ? 'lg:order-1' : undefined}>
            {visual}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
