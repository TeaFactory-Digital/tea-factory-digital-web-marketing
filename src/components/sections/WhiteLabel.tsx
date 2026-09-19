import * as React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { href, sections } from '@/lib/routes';
import { Section, SectionHeading } from '@/components/ui/section';
import { ButtonLink } from '@/components/ui/button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { PhoneFrame, StatusBar } from '@/components/mockups/PhoneFrame';
import { FINAL_BALANCE, KG_PER_MONTH, TOTAL_RATE_PER_KG, count, money } from '@/lib/sample-data';

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
                    <BrandedHome brand={brand} name={labels[i]} t={t} />
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

/**
 * The same Home screen as everywhere else on this site, with one difference:
 * the three brand colours come from the client config rather than the token
 * file. Everything else (the hero card, the white stat tiles, the sections)
 * is identical, which is the point being made.
 */
function BrandedHome({ brand, name, t }: { brand: Brand; name: string; t: Dictionary }) {
  const b = t.bill;

  return (
    <div className="flex h-full flex-col bg-app-background text-app-text">
      <StatusBar className="text-app-text" />

      <div className="flex flex-col gap-[16px] px-[16px] pt-[12px]">
        <div
          className="rounded-[24px] p-[20px] shadow-[0_6px_14px_rgb(0_0_0/0.15)]"
          style={{ backgroundColor: brand.primary }}
        >
          <div className="flex items-center justify-between gap-[8px]">
            <span className="text-[11px] font-medium uppercase leading-[16px] tracking-[1px] text-white/85">
              {b.monthOverline}
            </span>
            <span
              className="rounded-full bg-white px-[10px] py-[4px] text-[12px] font-bold leading-[16px]"
              style={{ color: brand.primary }}
            >
              {b.paymentMethodValue}
            </span>
          </div>

          <p className="mt-[12px] text-[14px] leading-[20px] text-white/85">{b.finalBalance}</p>
          <p className="text-[40px] font-bold leading-[48px] tracking-[-0.5px] text-white tabular-nums">
            {b.currency} {money(FINAL_BALANCE)}
          </p>
          <p className="text-[12px] leading-[16px] text-white/85">{b.supplierCode}</p>

          <div className="mt-[16px] flex gap-[12px]">
            {[
              { label: b.totalKg, value: `${count(KG_PER_MONTH)} ${b.kg}` },
              { label: b.totalRatePerKg, value: `${b.currency} ${money(TOTAL_RATE_PER_KG)}${b.perKg}` },
            ].map((tile) => (
              <div key={tile.label} className="flex-1 rounded-[10px] bg-app-surface p-[12px]">
                <p className="truncate text-[12px] leading-[16px] text-app-text-secondary">
                  {tile.label}
                </p>
                <p className="mt-[2px] truncate text-[16px] font-semibold leading-[24px] tabular-nums">
                  {tile.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="flex min-h-[48px] w-full items-center justify-center gap-[8px] rounded-[10px] border-[1.5px] px-[16px] py-[8px] text-[16px] font-semibold leading-[22px]"
          style={{ borderColor: brand.primary, color: brand.primary }}
        >
          {b.savePdf}
        </button>

        <div className="rounded-[16px] border border-app-border bg-app-surface p-[16px]">
          <p className="text-[22px] font-semibold leading-[30px]">{name}</p>
          <p className="mt-[2px] text-[12px] leading-[16px] text-app-text-secondary">
            {b.factoryLocation}
          </p>
          <div className="my-[12px] h-px bg-app-divider" />
          <p
            className="text-[11px] font-medium uppercase leading-[16px] tracking-[1px]"
            style={{ color: brand.primary }}
          >
            {b.monthOverline}
          </p>
          <p className="mt-[4px] text-[18px] font-semibold leading-[26px]">{b.supplierCode}</p>
          <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">
            {b.supplierName}
          </p>
        </div>

        <div>
          <p className="mb-[8px] text-[11px] font-medium uppercase leading-[16px] tracking-[1px] text-app-text-secondary">
            {b.dailySection}
          </p>
          <div className="rounded-[16px] border border-app-border bg-app-surface p-[16px]">
            <div className="grid grid-cols-7 gap-[4px]">
              {Array.from({ length: 21 }, (_, i) => {
                const supplied = i % 7 !== 2 && i % 7 !== 6;
                return (
                  <span
                    key={i}
                    className="h-[26px] rounded-[6px]"
                    style={{
                      backgroundColor: supplied ? brand.muted : 'var(--color-app-surface-variant)',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
