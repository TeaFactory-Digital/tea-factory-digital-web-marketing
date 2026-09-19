import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, type Locale } from '@/i18n';
import { PageHero, SplitBlock } from '@/components/sections/PageHero';
import { ConsoleDashboard } from '@/components/mockups/ConsoleDashboard';
import { ConsoleSection } from '@/components/sections/ConsoleSection';
import { AnalyticsSection } from '@/components/sections/AnalyticsSection';
import { IntegrationSection } from '@/components/sections/IntegrationSection';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Card } from '@/components/ui/card';
import { CONSOLE_QUEUES } from '@/lib/sample-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.consolePage.title, description: t.consolePage.subtitle };
}

export default async function ConsolePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const l = locale as Locale;
  const s = t.consolePage.sections;

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={t.consolePage.eyebrow}
        title={t.consolePage.title}
        subtitle={t.consolePage.subtitle}
        highlights={Object.values(t.consolePage.highlights)}
        ctaLabel={t.common.requestDemo}
        variant="dusk"
      />

      <SplitBlock
        index="01"
        title={s.queues.title}
        body={s.queues.body}
        tone="white"
        visual={
          <Card className="p-6 md:p-8">
            <p className="t-eyebrow mb-5 text-leaf-700">{t.console.queuesTitle}</p>
            <ul className="space-y-3">
              {CONSOLE_QUEUES.map((queue) => (
                <li
                  key={queue.key}
                  className="flex items-center justify-between rounded-2xl bg-cream-100 px-5 py-4"
                >
                  <span className="font-display text-[0.98rem] font-semibold text-forest-900">
                    {t.console.queue[queue.key as keyof typeof t.console.queue]}
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className="text-xs text-char-400">
                      {t.console.oldestWaiting.replace('{age}', queue.oldest)}
                    </span>
                    <span className="font-display text-xl font-semibold text-leaf-700 tabular-nums">
                      {queue.pending}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-char-400">{t.common.sampleDataNote}</p>
          </Card>
        }
      />

      <SplitBlock
        index="02"
        title={s.content.title}
        body={s.content.body}
        flip
        visual={
          <Card className="p-6 md:p-8">
            <ul className="divide-y divide-cream-200">
              {[
                t.features.communication.items.news,
                t.features.communication.items.banners,
                t.features.communication.items.content,
              ].map((item) => (
                <li key={item.title} className="py-4 first:pt-0 last:pb-0">
                  <p className="font-display text-[0.98rem] font-semibold text-forest-900">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-char-500">{item.desc}</p>
                </li>
              ))}
            </ul>
          </Card>
        }
      />

      <ConsoleSection t={t} />

      <SplitBlock
        index="03"
        title={s.configuration.title}
        body={s.configuration.body}
        tone="white"
        visual={
          <Card className="p-6 md:p-8">
            <p className="t-eyebrow mb-5 text-leaf-700">{t.whiteLabel.eyebrow}</p>
            <ul className="flex flex-wrap gap-2">
              {Object.values(t.whiteLabel.configurable).map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-cream-300 bg-cream-50 px-3.5 py-1.5 text-sm font-medium text-char-700"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-cream-100 p-5">
              <p className="font-display text-[0.98rem] font-semibold text-forest-900">
                {t.features.credit.items.limits.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-char-500">
                {t.features.credit.items.limits.desc}
              </p>
            </div>
          </Card>
        }
      />

      <SplitBlock
        index="04"
        title={s.governance.title}
        body={s.governance.body}
        flip
        visual={<ConsoleDashboard t={t} />}
      />

      <AnalyticsSection t={t} />
      <IntegrationSection locale={l} t={t} />
      <SecuritySection t={t} />
      <FinalCTA locale={l} t={t} />
    </>
  );
}
