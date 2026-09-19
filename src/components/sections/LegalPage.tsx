import * as React from 'react';
import { Info } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Eyebrow } from '@/components/ui/card';
import { Reveal } from '@/components/ui/motion';

export type LegalSection = { title: string; body: string };

/** Shared layout for the privacy policy and the terms. */
export function LegalPage({
  t,
  title,
  intro,
  sections,
}: {
  t: Dictionary;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  const slug = (value: string) =>
    value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

  return (
    <div className="bg-cream-50 pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <Eyebrow className="mb-4">{t.footer.legal.title}</Eyebrow>
          <h1 className="t-h2 font-semibold text-forest-900">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-char-500">{intro}</p>
          <p className="mt-6 text-sm text-char-400">
            {t.legal.lastUpdated}: {t.legal.lastUpdatedValue}
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10 max-w-3xl">
          <div className="flex gap-3.5 rounded-3xl border border-gold-200 bg-gold-200/25 px-5 py-4">
            <Info className="mt-0.5 size-5 shrink-0 text-gold-600" strokeWidth={2} />
            <p className="text-[0.9rem] leading-relaxed text-char-700">{t.legal.placeholderNote}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
          {/* ---- Contents ---- */}
          <nav className="lg:sticky lg:top-28 lg:self-start" aria-label={title}>
            <p className="t-eyebrow mb-4 text-char-400">{title}</p>
            <ol className="space-y-2.5">
              {sections.map((section, i) => (
                <li key={section.title}>
                  <a
                    href={`#${slug(section.title)}`}
                    className="flex gap-3 text-[0.9rem] leading-snug text-char-500 transition-colors hover:text-forest-900"
                  >
                    <span className="tabular-nums text-char-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* ---- Body ---- */}
          <div className="max-w-2xl space-y-10">
            {sections.map((section, i) => (
              <Reveal key={section.title} as="section" delay={Math.min(i, 4) * 0.03}>
                <div id={slug(section.title)} className="scroll-mt-28">
                  <h2 className="font-display text-xl font-semibold text-forest-900 md:text-2xl">
                    {section.title}
                  </h2>
                  <p className="mt-3.5 text-[1rem] leading-relaxed text-char-600">{section.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
