import { notFound } from 'next/navigation';
import { getDictionary, isLocale, type Locale } from '@/i18n';
import { Hero } from '@/components/sections/Hero';
import { ActivityTicker } from '@/components/sections/ActivityTicker';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { AppConsoleSplit } from '@/components/sections/AppConsoleSplit';
import { GreenLeafAccount } from '@/components/sections/GreenLeafAccount';
import { Features } from '@/components/sections/FeatureCategory';
import { CreditFlow } from '@/components/sections/CreditFlow';
import { LanguageSection } from '@/components/sections/LanguageSection';
import { WhiteLabel } from '@/components/sections/WhiteLabel';
import { IntegrationSection } from '@/components/sections/IntegrationSection';
import { ConsoleSection } from '@/components/sections/ConsoleSection';
import { AnalyticsSection } from '@/components/sections/AnalyticsSection';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { ConnectivitySection } from '@/components/sections/ConnectivitySection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { WhiteLabelBanner } from '@/components/sections/WhiteLabelBanner';
import { ProofSection } from '@/components/sections/ProofSection';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const l = locale as Locale;

  return (
    <>
      <Hero locale={l} t={t} />
      <ActivityTicker t={t} />
      <ProblemSection t={t} />
      <AppConsoleSplit t={t} />
      <GreenLeafAccount t={t} />
      <Features t={t} />
      <CreditFlow t={t} />
      <LanguageSection t={t} />
      <WhiteLabel locale={l} t={t} />
      <IntegrationSection locale={l} t={t} />
      <ConsoleSection t={t} />
      <AnalyticsSection t={t} />
      <SecuritySection t={t} />
      <ConnectivitySection t={t} />
      <AudienceSection t={t} />
      <WhiteLabelBanner locale={l} t={t} />
      <ProofSection t={t} />
      <FinalCTA locale={l} t={t} />
    </>
  );
}
