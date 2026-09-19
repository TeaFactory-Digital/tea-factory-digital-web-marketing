import * as React from 'react';
import { Briefcase, Calculator, Server, Users } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';

/** The four people who each have to get something different out of this. */
export function AudienceSection({ t }: { t: Dictionary }) {
  const cards = [
    { icon: Briefcase, ...t.audience.cards.owner },
    { icon: Calculator, ...t.audience.cards.manager },
    { icon: Server, ...t.audience.cards.it },
    { icon: Users, ...t.audience.cards.supplier },
  ];

  return (
    <Section tone="white">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={t.audience.eyebrow} title={t.audience.heading} />
        </Reveal>

        <Stagger className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4" step={0.07}>
          {cards.map((card) => (
            <StaggerItem key={card.role}>
              <div className="group flex h-full flex-col rounded-4xl border border-cream-300/70 bg-cream-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-leaf-300 hover:bg-white hover:shadow-lift">
                <span className="grid size-12 place-items-center rounded-2xl bg-white text-forest-700 shadow-[0_1px_2px_rgb(4_21_14/0.05)] transition-colors duration-300 group-hover:bg-forest-900 group-hover:text-leaf-300">
                  <card.icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-6 font-display text-[1.05rem] font-semibold leading-snug text-forest-900">
                  {card.role}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-char-500">{card.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
