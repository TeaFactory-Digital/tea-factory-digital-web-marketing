import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, type Locale } from '@/i18n';
import { PageHero, SplitBlock } from '@/components/sections/PageHero';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';
import { DailySupplyGrid, IncomeBars } from '@/components/mockups/charts';
import { CreditFlow } from '@/components/sections/CreditFlow';
import { LanguageSection } from '@/components/sections/LanguageSection';
import { ConnectivitySection } from '@/components/sections/ConnectivitySection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Card } from '@/components/ui/card';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.appPage.title, description: t.appPage.subtitle };
}

export default async function AppPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const l = locale as Locale;
  const s = t.appPage.sections;

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={t.appPage.eyebrow}
        title={t.appPage.title}
        subtitle={t.appPage.subtitle}
        highlights={Object.values(t.appPage.highlights)}
        ctaLabel={t.common.requestDemo}
        variant="morning"
        aside={
          <div className="mx-auto w-full max-w-[19rem]">
            <PhoneFrame>
              <GreenLeafBill t={t} />
            </PhoneFrame>
          </div>
        }
      />

      <SplitBlock
        index="01"
        title={s.account.title}
        body={s.account.body}
        tone="white"
        visual={
          <Card className="p-6 md:p-8">
            <p className="t-eyebrow mb-5 text-leaf-700">{t.greenLeaf.dailySupplyTitle}</p>
            <DailySupplyGrid />
            <div className="mt-5 flex items-center justify-between border-t border-cream-200 pt-4">
              <span className="text-sm text-char-500">{t.bill.totalKilograms}</span>
              <span className="font-display text-lg font-semibold text-forest-900 tabular-nums">
                1,245 <span className="text-sm text-leaf-600">{t.bill.kg}</span>
              </span>
            </div>
            <p className="mt-4 text-xs text-char-400">{t.common.sampleDataNote}</p>
          </Card>
        }
      />

      <SplitBlock
        index="02"
        title={s.history.title}
        body={s.history.body}
        flip
        visual={
          <Card className="p-6 md:p-8">
            <p className="t-eyebrow mb-5 text-leaf-700">{t.greenLeaf.incomeTitle}</p>
            <div className="h-44">
              <IncomeBars />
            </div>
            <p className="mt-4 text-xs text-char-400">{t.common.sampleDataNote}</p>
          </Card>
        }
      />

      <CreditFlow t={t} />

      <SplitBlock
        index="03"
        title={s.requests.title}
        body={s.requests.body}
        tone="white"
        visual={
          <div className="mx-auto w-full max-w-[17rem]">
            <PhoneFrame>
              <GreenLeafBill t={t} />
            </PhoneFrame>
          </div>
        }
      />

      <SplitBlock
        index="04"
        title={s.settings.title}
        body={s.settings.body}
        flip
        visual={
          <Card className="p-6 md:p-8">
            <ul className="divide-y divide-cream-200">
              {[
                t.features.requests.items.bank,
                t.features.requests.items.payment,
                t.features.requests.items.status,
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

      <LanguageSection t={t} />
      <ConnectivitySection t={t} />
      <FinalCTA locale={l} t={t} />
    </>
  );
}
