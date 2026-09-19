import * as React from 'react';
import { ArrowDown, ArrowRight, Factory, Layers, Monitor, Smartphone, X } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { href, sections } from '@/lib/routes';
import { Section, SectionHeading } from '@/components/ui/section';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/motion';

/**
 * The reassurance the whole sale turns on, drawn as a boundary.
 *
 * The existing factory system sits *beside* the platform, not under it, and
 * inside its own dashed frame. Nothing crosses that frame in this diagram,
 * because nothing has to.
 */
export function IntegrationSection({ locale, t }: { locale: Locale; t: Dictionary }) {
  const assurances = [
    t.integration.assurances.one,
    t.integration.assurances.two,
    t.integration.assurances.three,
  ];

  return (
    <Section id={sections.integration} tone="cream">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={t.integration.eyebrow}
            title={t.integration.heading}
            description={t.integration.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:mt-18 lg:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-4">
          {/* ---- The platform ---- */}
          <Reveal>
            <div className="relative rounded-4xl border border-leaf-300/70 bg-white p-6 shadow-lift md:p-8">
              <span className="absolute -top-3 start-7 rounded-full bg-leaf-600 px-3.5 py-1 font-display text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-white">
                {t.meta.siteName}
              </span>

              <div className="space-y-3 pt-2">
                <Node
                  icon={<Smartphone className="size-[18px]" strokeWidth={2} />}
                  label={t.integration.nodes.supplier}
                  tone="leaf"
                />
                <Connector />
                <Node
                  icon={<Layers className="size-[18px]" strokeWidth={2} />}
                  label={t.integration.nodes.platform}
                  tone="forest"
                  emphasis
                />
                <Connector />
                <Node
                  icon={<Monitor className="size-[18px]" strokeWidth={2} />}
                  label={t.integration.nodes.console}
                  tone="gold"
                />
              </div>
            </div>
          </Reveal>

          {/* ---- The gap between them, named ---- */}
          <Reveal delay={0.08} className="flex items-center justify-center py-2 lg:h-full lg:w-24 lg:py-0">
            <div className="flex items-center gap-3 lg:flex-col">
              <span className="h-px w-10 bg-cream-300 lg:h-14 lg:w-px" aria-hidden="true" />
              <span className="grid size-10 place-items-center rounded-full border border-cream-300 bg-cream-50 text-char-400">
                <X className="size-4" strokeWidth={2.4} />
              </span>
              <span className="h-px w-10 bg-cream-300 lg:h-14 lg:w-px" aria-hidden="true" />
            </div>
          </Reveal>

          {/* ---- The factory's own system ---- */}
          <Reveal delay={0.16}>
            <div className="relative h-full rounded-4xl border-2 border-dashed border-char-300/70 bg-cream-100/60 p-6 md:p-8">
              <span className="absolute -top-3 start-7 rounded-full bg-char-700 px-3.5 py-1 font-display text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-cream-50">
                {t.integration.boundaryLabel}
              </span>

              <div className="pt-2">
                <span className="grid size-11 place-items-center rounded-2xl bg-white text-char-700 shadow-[0_1px_2px_rgb(4_21_14/0.05)]">
                  <Factory className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-char-900">
                  {t.integration.nodes.existing}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-char-500">
                  {t.integration.nodes.existingNote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---- Assurances ---- */}
        <Reveal delay={0.1} className="mt-12 grid gap-4 md:grid-cols-3">
          {assurances.map((line) => (
            <div
              key={line}
              className="rounded-3xl border border-cream-300/70 bg-white px-6 py-7 shadow-[0_1px_2px_rgb(4_21_14/0.03)]"
            >
              <span className="grid size-8 place-items-center rounded-full bg-leaf-100 text-leaf-700">
                <X className="size-4" strokeWidth={2.8} />
              </span>
              <p className="mt-4 font-display text-lg font-semibold leading-snug text-forest-900">
                {line}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.14} className="mt-9">
          <ButtonLink href={href(locale, '/demo')} variant="outline" className="group">
            {t.integration.cta}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" strokeWidth={2.4} />
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}

function Node({
  icon,
  label,
  tone,
  emphasis = false,
}: {
  icon: React.ReactNode;
  label: string;
  tone: 'leaf' | 'forest' | 'gold';
  emphasis?: boolean;
}) {
  const toneClass =
    tone === 'leaf'
      ? 'bg-leaf-100 text-leaf-700'
      : tone === 'gold'
        ? 'bg-gold-200/60 text-gold-600'
        : 'bg-forest-800 text-cream-50';

  return (
    <div
      className={
        'flex items-center gap-3.5 rounded-2xl px-4 py-4 ' +
        (emphasis ? 'bg-forest-900 text-cream-50' : 'bg-cream-100 text-forest-900')
      }
    >
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${toneClass}`}>
        {icon}
      </span>
      <span className="font-display text-[0.98rem] font-semibold leading-snug">{label}</span>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <span className="grid size-6 place-items-center rounded-full bg-cream-100 text-char-400">
        <ArrowDown className="size-3.5" strokeWidth={2.4} />
      </span>
    </div>
  );
}
