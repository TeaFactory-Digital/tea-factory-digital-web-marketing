import * as React from 'react';
import { Accessibility, Check, CloudOff, Smartphone, WifiOff } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal } from '@/components/ui/motion';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';

/** Field conditions: weak signal, cached reads, cheap handsets, large targets. */
export function ConnectivitySection({ t }: { t: Dictionary }) {
  const points = [
    { icon: WifiOff, label: t.connectivity.points.one },
    { icon: CloudOff, label: t.connectivity.points.two },
    { icon: Smartphone, label: t.connectivity.points.three },
    { icon: Accessibility, label: t.connectivity.points.four },
  ];

  return (
    <Section tone="cream">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:gap-16">
          {/* ---- Phone with a weak signal ---- */}
          <Reveal className="relative mx-auto w-full max-w-[15rem] lg:mx-0">
            <PhoneFrame>
              <GreenLeafBill t={t} signal="weak" />
            </PhoneFrame>

            <span className="absolute -end-3 top-[18%] z-10 inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-white px-3 py-1.5 font-display text-[0.7rem] font-semibold text-char-700 shadow-lift">
              <WifiOff className="size-3.5 text-gold-600" strokeWidth={2.2} />
              {t.connectivity.signal}
            </span>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading eyebrow={t.connectivity.eyebrow} title={t.connectivity.heading} />
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-9 space-y-3">
                {points.map((point) => (
                  <li
                    key={point.label}
                    className="flex items-center gap-4 rounded-2xl border border-cream-300/70 bg-white px-5 py-4 shadow-[0_1px_2px_rgb(4_21_14/0.03)]"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream-100 text-forest-700">
                      <point.icon className="size-[18px]" strokeWidth={1.9} />
                    </span>
                    <span className="font-display text-[0.98rem] font-semibold text-forest-900">
                      {point.label}
                    </span>
                    <Check className="ms-auto size-4 shrink-0 text-leaf-600" strokeWidth={2.8} />
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-char-400">{t.connectivity.note}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
