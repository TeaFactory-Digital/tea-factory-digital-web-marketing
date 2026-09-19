import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { href, sections } from '@/lib/routes';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/motion';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';
import { ConsoleDashboard } from '@/components/mockups/ConsoleDashboard';

/** The close: the two surfaces overlapping, and one thing to do next. */
export function FinalCTA({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-forest-900 pb-0 pt-20 md:pt-28">
      <div className="grid-veil absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-10 size-[34rem] -translate-x-1/2 rounded-full bg-leaf-600/12 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2 font-semibold text-cream-50">{t.finalCta.headline}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream-100/68">
            {t.finalCta.text}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={href(locale, '/demo')} size="lg" variant="cream" className="group">
              {t.finalCta.primary}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" strokeWidth={2.4} />
            </ButtonLink>
            <ButtonLink
              href={href(locale, `/#${sections.features}`)}
              size="lg"
              variant="ghostLight"
            >
              {t.finalCta.secondary}
            </ButtonLink>
          </div>
        </Reveal>

        {/* The composition: console behind, phone in front, both cropped by the fold. */}
        <Reveal delay={0.12} className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          <div className="relative">
            <div className="mx-auto max-w-4xl [mask-image:linear-gradient(to_bottom,black_58%,transparent)]">
              <ConsoleDashboard t={t} chrome={false} />
            </div>
            <div className="absolute -bottom-2 start-1/2 w-[8.5rem] -translate-x-1/2 sm:start-[14%] sm:w-[11rem] sm:translate-x-0 md:w-[12.5rem]">
              <div className="[mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
                <PhoneFrame>
                  <GreenLeafBill t={t} />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
