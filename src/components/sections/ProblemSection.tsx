import * as React from 'react';
import { PhoneCall } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/card';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';

/**
 * Three questions, numbered. They are the three the office answers by phone
 * all month, and each one is a screen in the app.
 */
export function ProblemSection({ t }: { t: Dictionary }) {
  const cards = [
    { num: '01', question: t.problem.cards.one },
    { num: '02', question: t.problem.cards.two },
    { num: '03', question: t.problem.cards.three },
  ];

  return (
    <Section tone="cream">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <Eyebrow className="mb-4">{t.problem.eyebrow}</Eyebrow>
          <h2 className="t-h2 font-semibold text-forest-900">
            {/* Decorative, and only where there is room, with no stray text node
                beside it, which was indenting the first line on small screens. */}
            <span className="me-3 hidden size-11 place-items-center rounded-2xl bg-gold-200/50 align-middle text-gold-600 md:inline-grid">
              <PhoneCall className="size-5" strokeWidth={2.2} />
            </span>
            {t.problem.heading}
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {cards.map((card) => (
            <StaggerItem key={card.num}>
              <div className="group relative h-full overflow-hidden rounded-4xl border border-cream-300/70 bg-white p-8 shadow-lift transition-all duration-400 hover:-translate-y-1 hover:border-leaf-300 hover:shadow-panel md:p-10">
                <span
                  className="pointer-events-none absolute -end-3 -top-6 font-display text-[6rem] font-semibold leading-none text-cream-200/70 transition-colors duration-400 group-hover:text-leaf-100 md:text-[7.5rem]"
                  aria-hidden="true"
                >
                  {card.num}
                </span>
                <div className="relative">
                  <span className="t-eyebrow text-leaf-700">{card.num}</span>
                  <p className="mt-5 font-display text-2xl font-semibold leading-snug text-forest-900 md:text-[1.7rem]">
                    &ldquo;{card.question}&rdquo;
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-12 grid gap-8 border-t border-cream-300 pt-10 md:mt-16 md:grid-cols-2 md:gap-16">
          <p className="text-xl leading-relaxed text-char-500 md:text-2xl">{t.problem.support}</p>
          <p className="font-display text-xl font-semibold leading-relaxed text-forest-900 md:text-2xl">
            {t.problem.resolution}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
