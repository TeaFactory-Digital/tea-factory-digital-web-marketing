import * as React from 'react';
import { Inbox } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Badge } from '@/components/ui/card';
import { MaskReveal, Parallax, Reveal } from '@/components/ui/motion';
import { ConsoleDashboard } from '@/components/mockups/ConsoleDashboard';
import { CONSOLE_QUEUES } from '@/lib/sample-data';
import { sections } from '@/lib/routes';

/** The console at full width, on the darkest surface on the site. */
export function ConsoleSection({ t }: { t: Dictionary }) {
  return (
    <Section id={sections.console} tone="ink">
      <div className="grid-veil absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-leaf-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t.console.eyebrow}
            title={
              <span className="inline-flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gold-500 text-forest-950">
                  <Inbox className="size-5" strokeWidth={2.2} />
                </span>
                {t.console.heading}
              </span>
            }
            description={t.console.subtitle}
            tone="light"
          />
          <Badge tone="light" className="shrink-0 self-start md:self-end">
            {t.common.sampleData}
          </Badge>
        </Reveal>

        <Parallax distance={26} className="mt-12 md:mt-16">
          <MaskReveal>
            <ConsoleDashboard t={t} />
          </MaskReveal>
        </Parallax>

        <Reveal delay={0.1} className="mt-10">
          <p className="t-eyebrow mb-4 text-cream-100/35">{t.console.queuesTitle}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONSOLE_QUEUES.map((queue) => (
              <div
                key={queue.key}
                className="group rounded-3xl border border-cream-50/10 bg-cream-50/[0.04] p-6 transition-colors duration-300 hover:border-leaf-500/35 hover:bg-cream-50/[0.07]"
              >
                <p className="font-display text-base font-semibold text-cream-50">
                  {t.console.queue[queue.key as keyof typeof t.console.queue]}
                </p>
                <p className="mt-4 font-display text-4xl font-semibold leading-none text-leaf-300 tabular-nums">
                  {queue.pending}
                </p>
                <p className="mt-2 text-sm text-cream-100/45">
                  {t.console.oldestWaiting.replace('{age}', queue.oldest)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
