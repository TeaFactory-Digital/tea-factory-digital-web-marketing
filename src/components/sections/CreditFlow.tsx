import * as React from 'react';
import { ArrowRight, BellRing, ChevronRight, ClipboardCheck, Inbox, Send, Timer } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Badge } from '@/components/ui/card';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';

/**
 * A request's four steps, then the same request as the supplier sees it and as
 * the office sees it. The pair is the argument: one submission, two views,
 * no paper between them.
 */
export function CreditFlow({ t }: { t: Dictionary }) {
  const steps = [
    { num: '01', icon: Send, ...t.creditFlow.steps.one },
    { num: '02', icon: Inbox, ...t.creditFlow.steps.two },
    { num: '03', icon: ClipboardCheck, ...t.creditFlow.steps.three },
    { num: '04', icon: BellRing, ...t.creditFlow.steps.four },
  ];

  return (
    <Section tone="cream">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={t.creditFlow.eyebrow}
            title={t.creditFlow.heading}
            description={t.creditFlow.subtitle}
          />
        </Reveal>

        {/* ---- Four steps ---- */}
        <Stagger className="mt-14 grid gap-3.5 md:mt-16 md:grid-cols-2 lg:grid-cols-4" step={0.085}>
          {steps.map((step, i) => (
            <StaggerItem key={step.num} className="relative">
              <div className="h-full rounded-3xl border border-cream-300/70 bg-white p-6 shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-2xl bg-forest-800 text-cream-50">
                    <step.icon className="size-[18px]" strokeWidth={2} />
                  </span>
                  <span className="font-display text-sm font-semibold text-cream-300">{step.num}</span>
                </div>
                <h3 className="mt-5 font-display text-[1.02rem] font-semibold leading-snug text-forest-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.87rem] leading-relaxed text-char-500">{step.desc}</p>
              </div>

              {i < steps.length - 1 ? (
                <span
                  className="absolute -bottom-3 left-1/2 z-10 grid size-6 -translate-x-1/2 place-items-center rounded-full border border-cream-300 bg-cream-50 text-leaf-600 md:hidden"
                  aria-hidden="true"
                >
                  <ArrowRight className="size-3 rotate-90" strokeWidth={2.6} />
                </span>
              ) : null}

              {i < steps.length - 1 ? (
                <span
                  className="absolute -end-[13px] top-1/2 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full border border-cream-300 bg-cream-50 text-leaf-600 lg:grid"
                  aria-hidden="true"
                >
                  <ArrowRight className="size-3 rtl:rotate-180" strokeWidth={2.6} />
                </span>
              ) : null}
            </StaggerItem>
          ))}
        </Stagger>

        {/* ---- The same request, both sides ---- */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal delay={0.05}>
            <div className="h-full rounded-4xl border border-cream-300/70 bg-white p-7 shadow-lift md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="t-eyebrow text-leaf-700">{t.common.supplierApp}</p>
                <Badge tone="neutral">{t.common.sampleData}</Badge>
              </div>

              <div className="rounded-3xl bg-cream-100 p-5">
                <h3 className="font-display text-lg font-semibold text-forest-900">
                  {t.creditFlow.example.title}
                </h3>

                <div className="mt-4 space-y-3">
                  <Row label={t.creditFlow.example.amountLabel}>
                    <span className="font-display text-xl font-semibold text-forest-900 tabular-nums">
                      {t.creditFlow.example.amountValue}
                    </span>
                  </Row>
                  <Row label={t.creditFlow.example.termLabel}>
                    <span className="text-sm font-semibold text-char-800">
                      {t.creditFlow.example.termValue}
                    </span>
                  </Row>
                  <Row label={t.creditFlow.example.statusLabel}>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-200/60 px-2.5 py-1 text-xs font-semibold text-gold-600">
                      <span className="size-1.5 rounded-full bg-gold-500" />
                      {t.creditFlow.example.statusValue}
                    </span>
                  </Row>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-4xl border border-forest-800/15 bg-forest-900 p-7 text-cream-100 shadow-panel md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="t-eyebrow text-leaf-300">{t.common.officeConsole}</p>
                <Badge tone="light">{t.common.sampleData}</Badge>
              </div>

              <div className="rounded-3xl border border-cream-50/10 bg-cream-50/[0.045] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-cream-50">
                    {t.creditFlow.queue.title}
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold-400/14 px-2.5 py-1 text-[0.7rem] font-semibold text-gold-400 ring-1 ring-gold-400/20">
                    <Timer className="size-3" strokeWidth={2.4} />
                    {t.creditFlow.queue.waitingValue}
                  </span>
                </div>

                <dl className="mt-4 space-y-2.5">
                  <DarkRow label={t.creditFlow.queue.supplierLabel} value={t.creditFlow.queue.supplierValue} />
                  <DarkRow label={t.creditFlow.queue.amountLabel} value={t.creditFlow.queue.amountValue} strong />
                  <DarkRow label={t.creditFlow.queue.waitingLabel} value={t.creditFlow.queue.waitingValue} />
                </dl>

                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-leaf-600 px-5 py-3 font-display text-sm font-semibold text-white"
                >
                  {t.creditFlow.queue.action}
                  <ChevronRight className="size-4 rtl:rotate-180" strokeWidth={2.4} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-cream-200 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-char-500">{label}</span>
      {children}
    </div>
  );
}

function DarkRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-sm text-cream-100/50">{label}</dt>
      <dd
        className={
          strong
            ? 'font-display text-lg font-semibold text-cream-50 tabular-nums'
            : 'text-sm font-medium text-cream-50'
        }
      >
        {value}
      </dd>
    </div>
  );
}
