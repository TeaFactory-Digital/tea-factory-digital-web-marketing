'use client';

import * as React from 'react';
import { ArrowLeftRight, Check, Monitor, Smartphone, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal, motion, useReducedMotion, EASE } from '@/components/ui/motion';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';
import { ConsoleDashboard } from '@/components/mockups/ConsoleDashboard';
import { sections } from '@/lib/routes';
import { cn } from '@/lib/utils';

type View = 'app' | 'console';
const VIEWS: View[] = ['app', 'console'];

/**
 * The two halves of the product, one at a time.
 *
 * This used to put the phone and the console side by side with a badge cloud
 * under each, which made the reader compare two dense screens at once. Now a
 * pair of tabs picks the half and the other one steps aside. Both panels stay
 * mounted in the same grid cell, so the section is as tall as the taller of
 * the two and switching never moves the page; the one not shown is `inert`.
 *
 * On a phone the tabs are a segmented control above the screen; from `lg` they
 * stand in a column beside it, with the caption that ties the two together.
 * The shorter panel is centred in the cell.
 */
export function AppConsoleSplit({ t }: { t: Dictionary }) {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<View>('app');
  const tabRefs = React.useRef<Record<View, HTMLButtonElement | null>>({ app: null, console: null });
  const baseId = React.useId();

  const tabs: Record<View, { label: string; tagline: string; icon: LucideIcon; tone: string; check: string; items: string[] }> = {
    app: {
      label: t.split.app.label,
      tagline: t.split.app.tagline,
      icon: Smartphone,
      tone: 'bg-leaf-600 text-white',
      check: 'text-leaf-400',
      items: [
        t.split.app.items.account,
        t.split.app.items.income,
        t.split.app.items.savings,
        t.split.app.items.credit,
        t.split.app.items.requests,
        t.split.app.items.conversations,
        t.split.app.items.news,
        t.split.app.items.notifications,
      ],
    },
    console: {
      label: t.split.console.label,
      tagline: t.split.console.tagline,
      icon: Monitor,
      tone: 'bg-gold-500 text-forest-950',
      check: 'text-gold-400',
      items: [
        t.split.console.items.dashboard,
        t.split.console.items.supplierRequests,
        t.split.console.items.creditQueue,
        t.split.console.items.teaPacketQueue,
        t.split.console.items.inquiries,
        t.split.console.items.records,
        t.split.console.items.reports,
        t.split.console.items.cms,
        t.split.console.items.configuration,
        t.split.console.items.users,
        t.split.console.items.audit,
      ],
    },
  };

  /** Arrow keys move between the tabs and select as they go (the WAI-ARIA automatic pattern). */
  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const i = VIEWS.indexOf(active);
    let next: View | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = VIEWS[(i + 1) % VIEWS.length];
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = VIEWS[(i - 1 + VIEWS.length) % VIEWS.length];
    if (event.key === 'Home') next = VIEWS[0];
    if (event.key === 'End') next = VIEWS[VIEWS.length - 1];
    if (!next) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id={sections.platform} tone="forest">
      <div className="grid-veil absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/3 size-[36rem] -translate-x-1/2 rounded-full bg-leaf-600/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeading eyebrow={t.split.eyebrow} title={t.split.heading} tone="light" align="center" />
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.5fr)] lg:items-start lg:gap-14"
        >
          {/* ---- Tabs, and the sentence that joins the two halves ---- */}
          <div className="lg:sticky lg:top-28">
            <div
              role="tablist"
              aria-label={t.split.heading}
              className="grid grid-cols-2 gap-1.5 rounded-3xl border border-cream-50/10 bg-forest-950/40 p-1.5 lg:grid-cols-1 lg:gap-2 lg:rounded-4xl lg:p-2"
            >
              {VIEWS.map((view) => {
                const tab = tabs[view];
                const selected = view === active;
                return (
                  <button
                    key={view}
                    ref={(node) => {
                      tabRefs.current[view] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${view}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${view}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(view)}
                    onKeyDown={onTabKeyDown}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-[1.25rem] px-3 py-3 text-start transition-colors duration-300 lg:rounded-3xl lg:px-4 lg:py-4',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-900',
                      selected ? 'text-forest-900' : 'text-cream-50 hover:bg-cream-50/[0.06]',
                    )}
                  >
                    {selected ? (
                      <motion.span
                        layoutId={`${baseId}-pill`}
                        className="absolute inset-0 rounded-[inherit] bg-cream-50 shadow-panel"
                        transition={reduce ? { duration: 0 } : { duration: 0.42, ease: EASE }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className={cn(
                        'relative grid size-9 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105 lg:size-10',
                        tab.tone,
                      )}
                    >
                      <tab.icon className="size-4" strokeWidth={2.2} />
                    </span>
                    <span className="relative min-w-0">
                      <span className="block font-display text-[0.95rem] font-semibold leading-snug lg:text-base">
                        {tab.label}
                      </span>
                      <span
                        className={cn(
                          't-meta mt-0.5 hidden sm:block',
                          selected ? 'text-char-500' : 'text-cream-100/70',
                        )}
                      >
                        {tab.tagline}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 hidden border-t border-cream-50/10 pt-8 lg:block">
              <span className="grid size-11 place-items-center rounded-full border border-cream-50/15 bg-forest-900 text-leaf-300 shadow-panel">
                <ArrowLeftRight className="size-4" strokeWidth={2.2} />
              </span>
              <p className="mt-5 font-display text-xl font-semibold leading-snug text-cream-50">{t.split.caption}</p>
              <p className="t-meta mt-3 text-cream-100/70">{t.common.sampleDataNote}</p>
            </div>
          </div>

          {/* ---- Panels, stacked in one cell ---- */}
          <div className="grid">
            {VIEWS.map((view) => {
              const tab = tabs[view];
              const shown = view === active;
              return (
                <motion.div
                  key={view}
                  role="tabpanel"
                  id={`${baseId}-panel-${view}`}
                  aria-labelledby={`${baseId}-tab-${view}`}
                  inert={!shown}
                  className="self-center [grid-area:1/1]"
                  initial={false}
                  animate={
                    shown
                      ? { opacity: 1, y: 0, scale: 1, visibility: 'visible' }
                      : { opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.985, transitionEnd: { visibility: 'hidden' } }
                  }
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: shown && !reduce ? 0.08 : 0 }}
                >
                  {view === 'app' ? (
                    // Up to the screen's true 384px: the console beside it is the
                    // taller panel, so the phone can be shown at full size for free.
                    <div className="mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:max-w-[22rem] xl:max-w-[24.5rem]">
                      <PhoneFrame>
                        <GreenLeafBill t={t} />
                      </PhoneFrame>
                    </div>
                  ) : (
                    <ConsoleDashboard t={t} />
                  )}

                  <ul
                    className={cn(
                      'mt-8 grid grid-cols-1 gap-x-6 gap-y-3 min-[420px]:grid-cols-2 md:grid-cols-3',
                      view === 'app' && 'mx-auto max-w-2xl',
                    )}
                  >
                    {tab.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-cream-100">
                        <span className="mt-[0.2em] grid size-4 shrink-0 place-items-center rounded-full bg-cream-50/10">
                          <Check className={cn('size-2.5', tab.check)} strokeWidth={3.4} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* The caption sits beside the tabs from `lg`; below that it closes the section. */}
        <Reveal delay={0.1} className="mt-14 text-center lg:hidden">
          <p className="mx-auto max-w-2xl font-display text-xl font-semibold text-cream-50 md:text-2xl">
            {t.split.caption}
          </p>
          <p className="t-meta mt-3 text-cream-100/70">{t.common.sampleDataNote}</p>
        </Reveal>
      </div>
    </Section>
  );
}
