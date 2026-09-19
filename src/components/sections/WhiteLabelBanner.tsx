import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { href } from '@/lib/routes';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/motion';
import { PhotoBackdrop } from '@/components/PlantationScene';

/** The full-bleed aerial banner between the product story and the close. */
export function WhiteLabelBanner({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 py-24 md:py-32 lg:py-40">
      {/* The one place the photograph is the subject rather than texture: the
          headline sits left, the scrim clears to nothing on the right, and the
          frame holds the plucker. */}
      <PhotoBackdrop
        variant="aerial"
        overlay="from-forest-950/38 via-forest-950/26 to-forest-950/66"
        scrim="from-forest-950/90 via-forest-950/45 to-transparent"
        photoPosition="72% 45%"
      />

      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <h2 className="t-h2 font-semibold leading-[1.08] text-cream-50">
            <span className="block">{t.wlBanner.headline.one}</span>
            <span className="block text-leaf-300">{t.wlBanner.headline.two}</span>
            <span className="block text-gold-400">{t.wlBanner.headline.three}</span>
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-100/70">
            {t.wlBanner.text}
          </p>

          <ButtonLink href={href(locale, '/demo')} size="lg" variant="cream" className="group mt-9">
            {t.wlBanner.cta}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" strokeWidth={2.4} />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
