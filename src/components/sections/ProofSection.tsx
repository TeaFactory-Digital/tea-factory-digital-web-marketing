import * as React from 'react';
import { Check } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';

/**
 * Credibility without invented proof.
 *
 * No customer logos, supplier counts or adoption percentages appear here,
 * because none exist yet. When a pilot factory can be named, this section is
 * the one that gets replaced.
 */
export function ProofSection({ t }: { t: Dictionary }) {
  const points = Object.values(t.proof.points);

  return (
    <Section tone="cream" className="py-16 md:py-20">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow={t.proof.eyebrow} title={t.proof.heading} />
          </Reveal>

          <Stagger className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2" step={0.05}>
            {points.map((point) => (
              <StaggerItem key={point}>
                <div className="flex items-center gap-3.5 border-b border-cream-300 pb-3.5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-600 text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-display text-[1rem] font-semibold text-forest-900">
                    {point}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
