import * as React from 'react';
import { Fingerprint, KeyRound, Lock, ScrollText, ShieldCheck, ToggleLeft } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { sections } from '@/lib/routes';

/**
 * Six controls, each one something the product actually does. The disclaimer
 * is load-bearing: no certification is claimed anywhere on this site.
 */
export function SecuritySection({ t }: { t: Dictionary }) {
  const cards = [
    { num: '01', icon: KeyRound, ...t.security.cards.one },
    { num: '02', icon: Fingerprint, ...t.security.cards.two },
    { num: '03', icon: Lock, ...t.security.cards.three },
    { num: '04', icon: ShieldCheck, ...t.security.cards.four },
    { num: '05', icon: ScrollText, ...t.security.cards.five },
    { num: '06', icon: ToggleLeft, ...t.security.cards.six },
  ];

  return (
    <Section id={sections.security} tone="white">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={t.security.eyebrow}
              title={t.security.heading}
              description={t.security.subtitle}
            />

            {/* A lock drawn from the brand shapes rather than an illustration. */}
            <div className="relative mt-10 hidden aspect-square w-52 lg:block" aria-hidden="true">
              <div className="absolute inset-0 rounded-[2.2rem] bg-cream-100" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative">
                  <div className="mx-auto h-11 w-16 rounded-t-full border-[6px] border-b-0 border-forest-800/18" />
                  <div className="-mt-1 grid size-24 place-items-center rounded-3xl bg-forest-900 shadow-panel">
                    <ShieldCheck className="size-9 text-leaf-400" strokeWidth={1.8} />
                  </div>
                </div>
              </div>
              <span className="absolute -right-2 top-6 size-3 rounded-full bg-gold-500" />
              <span className="absolute bottom-8 -left-3 size-2 rounded-full bg-leaf-500" />
            </div>
          </Reveal>

          <div>
            <Stagger className="grid gap-3.5 sm:grid-cols-2" step={0.06}>
              {cards.map((card) => (
                <StaggerItem key={card.num}>
                  <div className="group h-full rounded-3xl border border-cream-300/70 bg-cream-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest-800/20 hover:bg-white hover:shadow-lift">
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-2xl bg-forest-800/8 text-forest-700 transition-colors duration-300 group-hover:bg-forest-800 group-hover:text-cream-50">
                        <card.icon className="size-[18px]" strokeWidth={1.9} />
                      </span>
                      <span className="font-display text-xs font-semibold tracking-[0.12em] text-char-300">
                        {card.num}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.02rem] font-semibold leading-snug text-forest-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[0.87rem] leading-relaxed text-char-500">{card.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <p className="mt-7 rounded-2xl border border-cream-300/70 bg-cream-100/70 px-5 py-4 text-sm leading-relaxed text-char-500">
                {t.security.disclaimer}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
