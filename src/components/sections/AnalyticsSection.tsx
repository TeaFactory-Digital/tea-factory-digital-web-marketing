import * as React from 'react';
import { Activity, BellRing, Smartphone, TrendingUp } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { CountUp, Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { AdoptionLine, IncomeBars } from '@/components/mockups/charts';
import { ADOPTION_SERIES, ANALYTICS_TILES, CONSOLE_INSTALLED_PERCENT } from '@/lib/sample-data';

/**
 * Adoption reporting. Two KPIs are pulled out because they are the two the
 * project is judged on: whether suppliers use the channel, and whether the
 * office workload actually moves.
 */
export function AnalyticsSection({ t }: { t: Dictionary }) {
  const tileMeta = {
    devices: { icon: Smartphone, label: t.analytics.charts.devices },
    activity: { icon: Activity, label: t.analytics.charts.activity },
    reach: { icon: BellRing, label: t.analytics.charts.reach },
  } as const;

  return (
    <Section tone="cream" className="bg-cream-100">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={t.analytics.eyebrow}
            title={t.analytics.heading}
            description={t.analytics.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:mt-18 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-5">
          {/* ---- KPI one: adoption trend ---- */}
          <Reveal>
            <Card className="h-full p-7 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="t-eyebrow text-leaf-700">{t.analytics.kpiOne}</p>
                  <p className="mt-3 font-display text-6xl font-semibold leading-none text-forest-900 tabular-nums md:text-7xl">
                    <CountUp to={CONSOLE_INSTALLED_PERCENT} suffix="%" />
                  </p>
                  <p className="mt-3 text-sm text-char-500">{t.analytics.charts.adoption}</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <TrendingUp className="size-5" strokeWidth={2.1} />
                </span>
              </div>

              <div className="mt-8">
                <AdoptionLine tone="light" className="h-28 md:h-32" />
                <div className="mt-2 flex justify-between text-[0.7rem] font-medium text-char-400">
                  {['−12', '−9', '−6', '−3', '0'].map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          {/* ---- KPI two: channel shift ---- */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-4">
              <div className="relative flex-1 overflow-hidden rounded-3xl bg-forest-900 p-7 text-cream-50 shadow-panel">
                <div
                  className="absolute -right-10 -top-12 size-40 rounded-full bg-leaf-500/18 blur-2xl"
                  aria-hidden="true"
                />
                <p className="t-eyebrow relative text-leaf-300">{t.analytics.kpiTwo}</p>
                <p className="relative mt-3 font-display text-5xl font-semibold leading-none tabular-nums">
                  <CountUp to={ADOPTION_SERIES[ADOPTION_SERIES.length - 1]} suffix="%" />
                </p>
                <p className="relative mt-3 text-sm text-cream-100/55">
                  {t.analytics.charts.requests}
                </p>
                <div className="relative mt-7 h-20">
                  <IncomeBars tone="dark" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---- Supporting tiles ---- */}
        <Stagger className="mt-4 grid gap-4 sm:grid-cols-3 lg:gap-5" step={0.07}>
          {ANALYTICS_TILES.map((tile: (typeof ANALYTICS_TILES)[number]) => {
            const meta = tileMeta[tile.key as keyof typeof tileMeta];
            const Icon = meta.icon;
            return (
              <StaggerItem key={tile.key}>
                <Card className="flex h-full items-center gap-5 p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream-100 text-forest-700">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-3xl font-semibold leading-none text-forest-900 tabular-nums">
                      <CountUp to={tile.value} suffix={tile.suffix} />
                    </p>
                    <p className="mt-1.5 truncate text-sm text-char-500">{meta.label}</p>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-7 text-sm text-char-400">{t.analytics.note}</p>
        </Reveal>
      </div>
    </Section>
  );
}
