import * as React from 'react';
import { Languages } from 'lucide-react';
import { getDictionary, localeNames, type Dictionary, type Locale } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';

/**
 * Sinhala, English and Tamil shown together, from the real
 * dictionaries rather than a mockup of them. The table underneath is the point: it is the same five
 * product terms in three scripts, so a factory can see that the translation
 * reaches the deduction names and not only the menu.
 */
const SHOWN: Locale[] = ['si', 'en', 'ta'];

const fontFor: Record<Locale, string | undefined> = {
  si: 'var(--font-sinhala), var(--font-inter), sans-serif',
  en: undefined,
  ta: 'var(--font-tamil), var(--font-inter), sans-serif',
};

export function LanguageSection({ t }: { t: Dictionary }) {
  const rows: { key: keyof Dictionary['language']['samples'] }[] = [
    { key: 'account' },
    { key: 'balance' },
    { key: 'savings' },
    { key: 'loan' },
    { key: 'status' },
  ];

  return (
    <Section tone="forest">
      <div className="grid-veil absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -left-24 bottom-0 size-[28rem] rounded-full bg-gold-500/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow={t.language.eyebrow}
            title={t.language.heading}
            description={t.language.message}
            tone="light"
            align="center"
          />
        </Reveal>

        {/* ---- Three phones ---- */}
        <Stagger className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-5 md:mt-18 md:gap-6" step={0.1}>
          {SHOWN.map((locale) => {
            const d = getDictionary(locale);
            return (
              <StaggerItem key={locale} className="flex flex-col items-center">
                <div
                  className="w-full max-w-[13rem] sm:max-w-none"
                  lang={locale}
                  style={fontFor[locale] ? { fontFamily: fontFor[locale] } : undefined}
                >
                  <PhoneFrame>
                    <GreenLeafBill t={d} />
                  </PhoneFrame>
                </div>
                <p
                  className="mt-5 font-display text-lg font-semibold text-cream-50"
                  lang={locale}
                  style={fontFor[locale] ? { fontFamily: fontFor[locale] } : undefined}
                >
                  {localeNames[locale]}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* ---- The same terms in three scripts ---- */}
        <Reveal delay={0.1} className="mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-4xl border border-cream-50/10 bg-cream-50/[0.04] backdrop-blur-sm">
            <div className="flex items-center gap-3 border-b border-cream-50/10 px-6 py-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-leaf-600 text-white">
                <Languages className="size-4" strokeWidth={2.2} />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-cream-50">
                  {t.language.highlight}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[34rem]">
                <thead>
                  <tr className="border-b border-cream-50/8">
                    {SHOWN.map((locale) => (
                      <th
                        key={locale}
                        className="px-6 py-3 text-start text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream-100/35"
                        lang={locale}
                        style={fontFor[locale] ? { fontFamily: fontFor[locale] } : undefined}
                      >
                        {localeNames[locale]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ key }) => (
                    <tr key={key} className="border-b border-cream-50/6 last:border-0">
                      {SHOWN.map((locale) => {
                        const d = getDictionary(locale);
                        return (
                          <td
                            key={locale}
                            className="px-6 py-3.5 text-[0.92rem] text-cream-50"
                            lang={locale}
                            style={fontFor[locale] ? { fontFamily: fontFor[locale] } : undefined}
                          >
                            {d.language.samples[key]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.95rem] leading-relaxed text-cream-100/55">
            {t.language.highlightNote}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
