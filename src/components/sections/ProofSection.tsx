import * as React from 'react';
import { Check } from 'lucide-react';
import { locales, type Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { CountUp, Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { IMPACT_AS_OF, IMPACT_METRICS } from '@/lib/impact';
import { CONSOLE_QUEUES } from '@/lib/sample-data';
import { cn } from '@/lib/utils';

/**
 * Credibility without invented proof.
 *
 * No customer logos, supplier counts or adoption percentages appear here,
 * because none exist yet. The figure band shows facts about the platform
 * itself (how many languages, how many queues) until `IMPACT_METRICS` holds
 * reported numbers, and then shows those instead. When a pilot factory can be
 * named, this section is the one that gets replaced.
 */
export function ProofSection({ t }: { t: Dictionary }) {
  const points = Object.values(t.proof.points);

  return (
    <Section tone="cream" className="py-20 md:py-28">
      <div className="shell">
        <FigureBand t={t} />

        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow={t.proof.eyebrow} title={t.proof.heading} />
          </Reveal>

          <Stagger className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2" step={0.05}>
            {points.map((point) => (
              <StaggerItem key={point}>
                <div className="flex items-center gap-3.5 border-b border-cream-300 pb-3.5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-600 text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-display text-[1rem] font-semibold text-forest-900">{point}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

type Figure = { key: string; value: number; prefix?: string; suffix?: string; text?: string; label: string };

function FigureBand({ t }: { t: Dictionary }) {
  const reported = IMPACT_METRICS.length > 0 && IMPACT_AS_OF !== null;

  const figures: Figure[] = reported
    ? IMPACT_METRICS.map((m) => ({ key: m.key, value: m.value, suffix: m.suffix, label: t.proof.impact[m.key] }))
    : [
        // Counted from the code, not typed: the locales the site and app ship, and the console's queues.
        { key: 'languages', value: locales.length, label: t.proof.facts.languages },
        { key: 'queues', value: CONSOLE_QUEUES.length, label: t.proof.facts.queues },
        { key: 'anytime', value: 0, text: '24/7', label: t.proof.facts.anytime },
        { key: 'replaced', value: 0, label: t.proof.facts.replaced },
      ];

  return (
    <Reveal>
      <div className="overflow-hidden rounded-4xl border border-forest-800/10 bg-forest-900 text-cream-50 shadow-panel">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-cream-50/10 px-7 py-5 md:px-9">
          <p className="t-eyebrow text-leaf-300">{reported ? t.proof.impact.title : t.proof.facts.title}</p>
          {reported ? (
            <p className="t-meta text-cream-100/70">{t.proof.impact.asOf.replace('{date}', IMPACT_AS_OF!)}</p>
          ) : null}
        </div>

        {/* One row per figure on a phone (number beside its label), two-up from
            `sm`, four across from `lg`. The hairlines follow the grid. */}
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((figure, i) => (
            <div
              key={figure.key}
              className={cn(
                'flex items-center gap-5 px-7 py-5 transition-colors duration-300 hover:bg-cream-50/[0.04] sm:flex-col sm:items-start sm:gap-3 sm:py-8 md:px-9 md:py-9',
                i > 0 && 'border-t border-cream-50/10 sm:border-t-0',
                i >= 2 && 'sm:border-t lg:border-t-0',
                i % 2 === 1 && 'sm:border-s',
                i === 2 && 'lg:border-s',
              )}
            >
              <dt className="t-meta order-2 max-w-[16rem] text-cream-100/78">{figure.label}</dt>
              <dd className="order-1 min-w-[4.5rem] font-display text-4xl font-semibold leading-none text-cream-50 tabular-nums sm:min-w-0 md:text-5xl">
                {figure.text ?? <CountUp to={figure.value} prefix={figure.prefix} suffix={figure.suffix} />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
