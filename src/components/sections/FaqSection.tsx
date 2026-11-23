import * as React from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal } from '@/components/ui/motion';
import { whatsappLink } from '@/lib/site';

/**
 * Questions factories ask before a demo (24 November 2026).
 *
 * Plain `<details>`: opens without JavaScript, is found by the browser's find-in-page, and
 * reads as a disclosure to a screen reader. Every answer restates what another section or
 * the products show (the factory system left in place, offline reading, roles and the
 * audit log, white-label settings, the tour and the handbooks); nothing here promises a
 * figure. The FAQPage structured data repeats the same text for search engines.
 */
export function FaqSection({ t }: { t: Dictionary }) {
  const f = t.faq;
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: f.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <Section tone="white" id="faq">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={f.eyebrow} title={f.heading} />
          <a
            href={whatsappLink(t.demo.whatsapp.text)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-leaf-700 underline-offset-4 hover:underline"
          >
            <MessageCircle className="size-4" strokeWidth={2} />
            {f.more}
          </a>
        </Reveal>

        <div className="divide-y divide-cream-300 border-y border-cream-300">
          {f.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[1.08rem] font-semibold leading-snug text-forest-900 md:text-lg">
                  {item.q}
                </span>
                <Plus
                  className="mt-1 size-5 shrink-0 text-leaf-700 transition-transform duration-300 group-open:rotate-45"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </summary>
              <p className="-mt-1 max-w-2xl pb-7 text-[0.98rem] leading-relaxed text-char-500">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        // The questions and answers are our own dictionary text, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }}
      />
    </Section>
  );
}
