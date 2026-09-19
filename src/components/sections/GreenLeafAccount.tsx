import * as React from 'react';
import { BarChart3, CalendarDays } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Badge } from '@/components/ui/card';
import { MaskReveal, Parallax, Reveal } from '@/components/ui/motion';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';
import { DailySupplyGrid, IncomeBars } from '@/components/mockups/charts';
import { sections } from '@/lib/routes';

/**
 * The product's centrepiece: the whole monthly account on one screen, with
 * the daily calendar and the twelve-month history beside it.
 */
export function GreenLeafAccount({ t }: { t: Dictionary }) {
  // Annotations sit under the screen rather than over it: a label covering the
  // very figure it names is the one thing this section cannot afford.
  const callouts = [
    t.greenLeaf.callouts.currentMonth,
    t.greenLeaf.callouts.dailySupply,
    t.greenLeaf.callouts.deductions,
    t.greenLeaf.callouts.savings,
    t.greenLeaf.callouts.paymentMethod,
  ];

  return (
    <Section id={sections.greenLeaf} tone="cream" className="bg-cream-100">
      <div
        className="absolute -right-32 top-24 size-[30rem] rounded-full bg-leaf-300/16 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow={t.greenLeaf.eyebrow}
            title={t.greenLeaf.heading}
            description={t.greenLeaf.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          {/* ---- Phone with callouts ---- */}
          <Reveal className="mx-auto w-full max-w-[19.5rem] lg:mx-0 lg:max-w-[20.5rem] lg:self-start">
            <div className="relative">
              <div
                className="absolute -inset-10 -z-10 rounded-[3rem] bg-white/70 blur-2xl"
                aria-hidden="true"
              />
              <PhoneFrame>
                <GreenLeafBill t={t} />
              </PhoneFrame>
            </div>

            <ul className="mt-7 grid grid-cols-2 gap-x-3 gap-y-2.5">
              {callouts.map((label, i) => (
                <li
                  key={label}
                  className={
                    'flex items-center gap-2 rounded-full border border-cream-300 bg-white px-3 py-2 font-display text-[0.74rem] font-semibold text-forest-900 shadow-[0_1px_2px_rgb(4_21_14/0.04)] ' +
                    (i === callouts.length - 1 ? 'col-span-2' : '')
                  }
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-leaf-500" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- Daily supply + income ---- */}
          <div className="space-y-5">
            <Parallax distance={18}>
              <MaskReveal>
                <div className="rounded-4xl border border-cream-300/70 bg-white p-6 shadow-lift md:p-8">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-9 place-items-center rounded-xl bg-leaf-100 text-leaf-700">
                          <CalendarDays className="size-4" strokeWidth={2.2} />
                        </span>
                        <h3 className="font-display text-lg font-semibold text-forest-900">
                          {t.greenLeaf.dailySupplyTitle}
                        </h3>
                      </div>
                      <p className="mt-2.5 max-w-sm text-sm text-char-500">
                        {t.greenLeaf.dailySupplyNote}
                      </p>
                    </div>
                    <Badge tone="neutral" className="shrink-0">
                      {t.bill.monthLabel}
                    </Badge>
                  </div>

                  <DailySupplyGrid />

                  <div className="mt-5 flex items-center justify-between border-t border-cream-200 pt-4">
                    <span className="text-sm text-char-500">{t.bill.totalKilograms}</span>
                    <span className="font-display text-lg font-semibold text-forest-900 tabular-nums">
                      1,245 <span className="text-sm text-leaf-600">{t.bill.kg}</span>
                    </span>
                  </div>
                </div>
              </MaskReveal>
            </Parallax>

            <Parallax distance={10}>
              <MaskReveal delay={0.12}>
                <div className="rounded-4xl border border-cream-300/70 bg-white p-6 shadow-lift md:p-8">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-xl bg-gold-200/60 text-gold-600">
                      <BarChart3 className="size-4" strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-forest-900">
                        {t.greenLeaf.incomeTitle}
                      </h3>
                      <p className="text-sm text-char-500">{t.greenLeaf.incomeNote}</p>
                    </div>
                  </div>

                  <div className="h-36">
                    <IncomeBars />
                  </div>
                </div>
              </MaskReveal>
            </Parallax>

            <p className="text-xs text-char-400">{t.common.sampleDataNote}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
