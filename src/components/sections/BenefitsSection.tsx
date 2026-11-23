import * as React from 'react';
import { AlarmClock, ArrowRight, Database, Inbox, Landmark, MessagesSquare, PhoneCall } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';

/**
 * What changes for the factory (24 November 2026): today beside the same job with the
 * platform, one row per everyday task.
 *
 * Process, not percentages. The site never invents adoption, volume or time-saved
 * figures, so each row names something the products actually do (the queues and their
 * response targets, the bill explained, change requests held for approval, the factory
 * system left in place) and the subtitle says plainly that results come when a factory
 * reports them.
 */
export function BenefitsSection({ t }: { t: Dictionary }) {
  const b = t.benefits;
  const rows = [
    { key: 'calls', icon: PhoneCall, ...b.rows.calls },
    { key: 'requests', icon: Inbox, ...b.rows.requests },
    { key: 'inquiries', icon: MessagesSquare, ...b.rows.inquiries },
    { key: 'details', icon: Landmark, ...b.rows.details },
    { key: 'overdue', icon: AlarmClock, ...b.rows.overdue },
    { key: 'system', icon: Database, ...b.rows.system },
  ];

  return (
    <Section tone="white">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={b.eyebrow} title={b.heading} description={b.subtitle} />
        </Reveal>

        <div className="mt-14 md:mt-20">
          {/* Column labels, once, where the columns sit side by side. */}
          <div
            className="hidden grid-cols-[3rem_minmax(0,1fr)_2rem_minmax(0,1.15fr)] gap-x-6 border-b border-cream-300 pb-4 md:grid"
            aria-hidden="true"
          >
            <span />
            <span className="t-eyebrow text-char-500">{b.before}</span>
            <span />
            <span className="t-eyebrow text-leaf-700">{b.after}</span>
          </div>

          <Stagger className="divide-y divide-cream-300" step={0.06}>
            {rows.map((row) => (
              <StaggerItem key={row.key}>
                <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-7 md:grid-cols-[3rem_minmax(0,1fr)_2rem_minmax(0,1.15fr)] md:items-center md:gap-x-6 md:py-8">
                  <span className="row-span-2 grid size-11 place-items-center self-start rounded-2xl bg-leaf-100 text-leaf-700 md:row-span-1 md:size-12 md:self-center">
                    <row.icon className="size-5" strokeWidth={2} />
                  </span>
                  <p className="text-[0.98rem] leading-relaxed text-char-500">
                    <span className="t-eyebrow mb-1 block text-char-500 md:sr-only">{b.before}</span>
                    {row.before}
                  </p>
                  <ArrowRight className="hidden size-5 text-leaf-600 md:block rtl:rotate-180" strokeWidth={2} aria-hidden="true" />
                  <p className="font-display text-[1.05rem] font-semibold leading-relaxed text-forest-900 md:text-lg">
                    <span className="t-eyebrow mb-1 block font-sans text-leaf-700 md:sr-only">{b.after}</span>
                    {row.after}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
