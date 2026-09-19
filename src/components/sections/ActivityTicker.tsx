import * as React from 'react';
import {
  BadgeCheck,
  Banknote,
  FileText,
  Landmark,
  MessageSquareText,
  Newspaper,
} from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Eyebrow } from '@/components/ui/card';
import { Reveal } from '@/components/ui/motion';

/**
 * A marquee of the events that cross the boundary between app and console.
 *
 * It is labelled as an illustration of the workflow; nothing here claims to
 * be live traffic. The track is duplicated so the loop has no seam, and the
 * copy is hidden from assistive technology so it is not read twice.
 */
export function ActivityTicker({ t }: { t: Dictionary }) {
  const items = [
    { icon: FileText, label: t.activity.items.accountReady, tone: 'leaf' as const },
    { icon: Banknote, label: t.activity.items.advanceRequest, tone: 'gold' as const },
    { icon: MessageSquareText, label: t.activity.items.inquiry, tone: 'neutral' as const },
    { icon: Landmark, label: t.activity.items.bankChange, tone: 'neutral' as const },
    { icon: Newspaper, label: t.activity.items.newsPublished, tone: 'leaf' as const },
    { icon: BadgeCheck, label: t.activity.items.approved, tone: 'gold' as const },
  ];

  return (
    <section className="relative overflow-hidden border-y border-cream-200 bg-cream-100 py-14 md:py-16">
      <div className="shell">
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow className="mb-3">{t.activity.label}</Eyebrow>
            <h2 className="t-h3 font-semibold text-forest-900">{t.activity.heading}</h2>
          </div>
          <p className="max-w-xs text-sm text-char-400 md:text-end">{t.activity.note}</p>
        </Reveal>
      </div>

      <div className="relative mt-10">
        {/* Edge fades so the track dissolves rather than being cut. */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-cream-100 to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-cream-100 to-transparent md:w-32" />

        <div className="marquee-track flex w-max animate-marquee gap-3.5 motion-reduce:animate-none md:gap-5">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-3.5 md:gap-5" aria-hidden={copy === 1}>
              {items.map(({ icon: Icon, label, tone }) => (
                <div
                  key={`${copy}-${label}`}
                  className="flex shrink-0 items-center gap-3 rounded-2xl border border-cream-300/70 bg-white py-3.5 pe-6 ps-3.5 shadow-lift"
                >
                  <span
                    className={
                      'grid size-9 shrink-0 place-items-center rounded-xl ' +
                      (tone === 'leaf'
                        ? 'bg-leaf-100 text-leaf-700'
                        : tone === 'gold'
                          ? 'bg-gold-200/60 text-gold-600'
                          : 'bg-cream-100 text-forest-700')
                    }
                  >
                    <Icon className="size-4" strokeWidth={2.1} />
                  </span>
                  <span className="whitespace-nowrap font-display text-[0.92rem] font-semibold text-forest-900">
                    {label}
                  </span>
                  <span className="size-1.5 shrink-0 rounded-full bg-leaf-500" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
