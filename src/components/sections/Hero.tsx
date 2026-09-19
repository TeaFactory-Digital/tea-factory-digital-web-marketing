'use client';

import * as React from 'react';
import { ArrowRight, BellRing, CheckCircle2, MessageSquareText, Play } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { href, sections } from '@/lib/routes';
import { ButtonLink } from '@/components/ui/button';
import { Float, motion, RevealWords } from '@/components/ui/motion';
import { PhotoBackdrop } from '@/components/PlantationScene';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 pb-20 pt-32 md:pb-28 md:pt-36 lg:pb-32 lg:pt-40">
      {/* The estate shot, not the default photograph: this is the tallest slot
          on the site, so it needs the high-resolution file. Desktop sees nearly
          the whole frame; the crop biases left so the phone mockup sits over
          hillside rather than the ridgeline. Softening keeps the backdrop as
          atmosphere rather than a subject competing with the headline. */}
      <PhotoBackdrop
        variant="dusk"
        photoClassName="photo-slot--estate"
        overlay="from-forest-950/45 via-forest-950/32 to-forest-950/72"
        scrim="from-forest-950/88 via-forest-950/42 to-transparent"
        photoPosition="26% 62%"
        photoBlur={2}
        photoOpacity={0.9}
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
        {/* ---- Copy ---- */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-cream-50/15 bg-cream-50/[0.07] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-leaf-400" />
              <span className="relative inline-flex size-1.5 rounded-full bg-leaf-400" />
            </span>
            <span className="t-eyebrow text-leaf-300">{t.hero.eyebrow}</span>
          </motion.div>

          <h1 className="t-display mt-6 font-semibold text-cream-50">
            <RevealWords text={t.hero.title} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-cream-100/72 md:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.54, ease: EASE }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href={href(locale, '/demo')} size="lg" variant="cream" className="group">
              {t.hero.ctaPrimary}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" strokeWidth={2.4} />
            </ButtonLink>
            <ButtonLink
              href={href(locale, `/#${sections.platform}`)}
              size="lg"
              variant="ghostLight"
              className="group"
            >
              <Play className="size-3.5 fill-current" strokeWidth={0} />
              {t.hero.ctaSecondary}
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.72 }}
            className="mt-10 flex flex-col gap-3 border-t border-cream-50/10 pt-7 sm:flex-row sm:items-center sm:gap-6"
          >
            <p className="font-display text-sm font-semibold text-cream-50">{t.hero.trust}</p>
            <p className="flex items-center gap-2 text-sm text-cream-100/55">
              <CheckCircle2 className="size-4 shrink-0 text-leaf-400" strokeWidth={2.2} />
              {t.hero.alongside}
            </p>
          </motion.div>
        </div>

        {/* ---- Device ---- */}
        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:max-w-[22rem]">
          <div
            className="absolute -inset-16 -z-10 rounded-full bg-leaf-500/12 blur-3xl"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 44, rotateX: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.24, ease: EASE }}
            style={{ perspective: 1200 }}
          >
            <PhoneFrame>
              <GreenLeafBill t={t} />
            </PhoneFrame>
          </motion.div>

          {/* Floating notifications: real product events, not decoration. */}
          <FloatingCard
            className="start-0 top-[10%] -translate-x-[92%] rtl:translate-x-[92%]"
            delay={0.95}
            float={0}
            icon={<BellRing className="size-3.5" strokeWidth={2.2} />}
            tone="leaf"
            title={t.hero.floating.accountReady}
            meta={t.hero.floating.accountReadyMeta}
          />
          <FloatingCard
            className="end-0 top-[45%] translate-x-[92%] rtl:-translate-x-[92%]"
            delay={1.15}
            float={1.2}
            icon={<CheckCircle2 className="size-3.5" strokeWidth={2.2} />}
            tone="gold"
            title={t.hero.floating.requestApproved}
            meta={t.hero.floating.requestApprovedMeta}
          />
          <FloatingCard
            className="start-0 bottom-[20%] -translate-x-[92%] rtl:translate-x-[92%]"
            delay={1.35}
            float={2.4}
            icon={<MessageSquareText className="size-3.5" strokeWidth={2.2} />}
            tone="neutral"
            title={t.hero.floating.inquiry}
            meta={t.hero.floating.inquiryMeta}
          />
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  meta,
  tone,
  delay,
  float,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  meta: string;
  tone: 'leaf' | 'gold' | 'neutral';
  delay: number;
  float: number;
}) {
  const toneClass =
    tone === 'leaf'
      ? 'bg-leaf-600 text-white'
      : tone === 'gold'
        ? 'bg-gold-500 text-forest-950'
        : 'bg-forest-800 text-leaf-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.62, delay, ease: EASE }}
      className={`absolute z-10 hidden xl:block ${className ?? ''}`}
    >
      <Float delay={float}>
        <div className="flex w-[13.5rem] items-center gap-2.5 rounded-2xl border border-white/70 bg-cream-50/95 p-2.5 pe-4 shadow-panel backdrop-blur-md">
          <span className={`grid size-8 shrink-0 place-items-center rounded-xl ${toneClass}`}>
            {icon}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.78rem] font-semibold text-forest-900">{title}</p>
            <p className="truncate text-[0.7rem] text-char-500">{meta}</p>
          </div>
        </div>
      </Float>
    </motion.div>
  );
}
