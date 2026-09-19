'use client';

import * as React from 'react';
import { ArrowLeftRight, Check, Monitor, Smartphone } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Badge } from '@/components/ui/card';
import { Reveal, motion, useReducedMotion } from '@/components/ui/motion';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';
import { ConsoleDashboard } from '@/components/mockups/ConsoleDashboard';
import { sections } from '@/lib/routes';

/**
 * The two halves of the product, side by side, with the link between them
 * drawn rather than described. The connection line only renders on wide
 * screens; on a phone the two columns stack and the caption carries the point.
 */
export function AppConsoleSplit({ t }: { t: Dictionary }) {
  const reduce = useReducedMotion();

  const appItems = [
    t.split.app.items.account,
    t.split.app.items.income,
    t.split.app.items.savings,
    t.split.app.items.credit,
    t.split.app.items.requests,
    t.split.app.items.news,
    t.split.app.items.notifications,
  ];

  const consoleItems = [
    t.split.console.items.dashboard,
    t.split.console.items.supplierRequests,
    t.split.console.items.creditQueue,
    t.split.console.items.teaPacketQueue,
    t.split.console.items.inquiries,
    t.split.console.items.cms,
    t.split.console.items.configuration,
    t.split.console.items.users,
    t.split.console.items.audit,
  ];

  return (
    <Section id={sections.platform} tone="forest">
      <div className="grid-veil absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/3 size-[36rem] -translate-x-1/2 rounded-full bg-leaf-600/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow={t.split.eyebrow}
            title={t.split.heading}
            tone="light"
            align="center"
          />
        </Reveal>

        <div className="relative mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.32fr)] lg:items-center lg:gap-8">
          {/* ---- App ---- */}
          <Reveal className="flex flex-col items-center lg:items-stretch">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-leaf-600 text-white">
                <Smartphone className="size-4" strokeWidth={2.2} />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-cream-50">
                  {t.split.app.label}
                </p>
                <p className="text-xs text-cream-100/45">{t.split.app.tagline}</p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[15.5rem]">
              <PhoneFrame>
                <GreenLeafBill t={t} />
              </PhoneFrame>
            </div>

            <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
              {appItems.map((item) => (
                <li key={item}>
                  <Badge tone="light">
                    <Check className="size-3 text-leaf-400" strokeWidth={3} />
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- Connector ---- */}
          <div className="relative hidden lg:flex lg:h-full lg:w-20 lg:items-center lg:justify-center">
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true" viewBox="0 0 80 420" preserveAspectRatio="none">
              <defs>
                <linearGradient id="link-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-leaf-500)" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="var(--color-leaf-400)" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path
                d="M2 210 C 26 210, 54 210, 78 210"
                stroke="url(#link-grad)"
                strokeWidth="1.6"
                fill="none"
              />
              {!reduce ? (
                <motion.circle
                  r="3.2"
                  fill="var(--color-leaf-300)"
                  animate={{ cx: [2, 78], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
                  cy="210"
                />
              ) : null}
            </svg>
            <span className="relative grid size-11 place-items-center rounded-full border border-cream-50/15 bg-forest-900 text-leaf-300 shadow-panel">
              <ArrowLeftRight className="size-4" strokeWidth={2.2} />
            </span>
          </div>

          {/* ---- Console ---- */}
          <Reveal delay={0.12}>
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-gold-500 text-forest-950">
                <Monitor className="size-4" strokeWidth={2.2} />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-cream-50">
                  {t.split.console.label}
                </p>
                <p className="text-xs text-cream-100/45">{t.split.console.tagline}</p>
              </div>
            </div>

            <ConsoleDashboard t={t} />

            <ul className="mt-7 flex flex-wrap gap-2">
              {consoleItems.map((item) => (
                <li key={item}>
                  <Badge tone="light">
                    <Check className="size-3 text-gold-400" strokeWidth={3} />
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14 text-center">
          <p className="mx-auto max-w-2xl font-display text-xl font-semibold text-cream-50 md:text-2xl">
            {t.split.caption}
          </p>
          <p className="mt-3 text-sm text-cream-100/40">{t.common.sampleDataNote}</p>
        </Reveal>
      </div>
    </Section>
  );
}
