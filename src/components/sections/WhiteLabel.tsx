import * as React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { href, sections } from '@/lib/routes';
import { Section, SectionHeading } from '@/components/ui/section';
import { ButtonLink } from '@/components/ui/button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';

type Brand = {
  /** `theme.colors.light.primary` from the client's config. */
  primary: string;
  /** `primaryMuted`: the tinted fill the app uses for chips and calendar cells. */
  muted: string;
  /** `secondary`: the accent. */
  secondary: string;
};

/**
 * The three clients that actually exist in the mobile repo's
 * `src/config/clients/`: the Galaboda default, plus `clientA` and `clientB`.
 * The palettes are their configured `theme.colors.light` values, not invented
 * ones. The whole claim of this section is that a brand is a config row.
 */
const BRANDS: Brand[] = [
  { primary: '#2E8B57', muted: '#DCEEE2', secondary: '#8FC13F' },
  { primary: '#1B5E20', muted: '#D8E8D9', secondary: '#C9A227' },
  { primary: '#8D6E3A', muted: '#EDE3D2', secondary: '#2F7D5B' },
];

export function WhiteLabel({ locale, t }: { locale: Locale; t: Dictionary }) {
  const labels = [
    t.whiteLabel.factories.a,
    t.whiteLabel.factories.b,
    t.whiteLabel.factories.c,
  ];

  const configurable = Object.values(t.whiteLabel.configurable);

  return (
    <Section id={sections.whiteLabel} tone="white">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={t.whiteLabel.eyebrow}
              title={t.whiteLabel.heading}
              description={t.whiteLabel.subtitle}
            />

            <div className="mt-8 font-display text-xl font-semibold leading-snug text-forest-900 md:text-2xl">
              <p>{t.whiteLabel.summary.same}</p>
              <p className="text-leaf-600">{t.whiteLabel.summary.different}</p>
              <p className="text-gold-600">{t.whiteLabel.summary.config}</p>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {configurable.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-cream-50 px-3.5 py-1.5 text-sm font-medium text-char-700"
                >
                  <Check className="size-3.5 shrink-0 text-leaf-600" strokeWidth={2.8} />
                  {item}
                </li>
              ))}
            </ul>

            <ButtonLink
              href={href(locale, '/demo')}
              variant="outline"
              size="md"
              className="group mt-9"
            >
              {t.whiteLabel.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" strokeWidth={2.4} />
            </ButtonLink>
          </Reveal>

          <Stagger className="grid grid-cols-3 gap-3 sm:gap-5" step={0.1}>
            {BRANDS.map((brand, i) => (
              <StaggerItem key={brand.primary} className={i === 1 ? 'sm:-translate-y-6' : ''}>
                <div className="flex flex-col items-center">
                  <PhoneFrame>
                    <GreenLeafBill t={t} brand={brand} factoryName={labels[i]} />
                  </PhoneFrame>
                  <p className="mt-4 text-center font-display text-[0.8rem] font-semibold text-char-700 sm:text-sm">
                    {labels[i]}
                  </p>
                  <span
                    className="mt-1.5 h-1 w-8 rounded-full"
                    style={{ backgroundColor: brand.primary }}
                    aria-hidden="true"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
