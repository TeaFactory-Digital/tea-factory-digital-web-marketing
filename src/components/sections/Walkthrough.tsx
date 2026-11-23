import * as React from 'react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal } from '@/components/ui/motion';
import { PhoneFrame } from '@/components/mockups/PhoneFrame';
import { GreenLeafBill } from '@/components/mockups/GreenLeafBill';
import { InquiryThread } from '@/components/mockups/InquiryThread';
import { ConsoleImport } from '@/components/mockups/ConsoleImport';
import { ConsoleInquiry } from '@/components/mockups/ConsoleInquiry';
import { ConsoleDashboard } from '@/components/mockups/ConsoleDashboard';
import { WalkthroughPlayer, type WalkthroughStep } from './WalkthroughPlayer';

/**
 * "One month, from leaf records to an answer" (24 November 2026): the walkthrough the site
 * has in place of a video. Five real mockups in the order a month uses them, moving on by
 * themselves (`WalkthroughPlayer`).
 *
 * It tells a different story from the request steps (`CreditFlow`): leaf records come in,
 * the supplier reads the month, asks a question, the office answers, and the dashboard
 * keeps anything from waiting unseen. The inquiry on the phone and in the console is the
 * same conversation (`INQUIRY_THREAD`), so steps three and four are one exchange from both
 * sides.
 */
export function Walkthrough({ t }: { t: Dictionary }) {
  const w = t.walkthrough;
  const app = t.common.supplierApp;
  const consoleLabel = t.common.officeConsole;

  const steps: WalkthroughStep[] = [
    { key: 'import', ...w.steps.import, side: 'console', sideLabel: consoleLabel, device: 'console', visual: <ConsoleImport t={t} /> },
    {
      key: 'bill',
      ...w.steps.bill,
      side: 'app',
      sideLabel: app,
      device: 'phone',
      visual: (
        <PhoneFrame>
          <GreenLeafBill t={t} />
        </PhoneFrame>
      ),
    },
    {
      key: 'ask',
      ...w.steps.ask,
      side: 'app',
      sideLabel: app,
      device: 'phone',
      visual: (
        <PhoneFrame>
          <InquiryThread t={t} />
        </PhoneFrame>
      ),
    },
    { key: 'answer', ...w.steps.answer, side: 'console', sideLabel: consoleLabel, device: 'console', visual: <ConsoleInquiry t={t} /> },
    {
      key: 'dashboard',
      ...w.steps.dashboard,
      side: 'console',
      sideLabel: consoleLabel,
      device: 'console',
      tall: true,
      visual: <ConsoleDashboard t={t} />,
    },
  ];

  return (
    <Section tone="cream" id="walkthrough">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={w.eyebrow} title={w.heading} description={w.subtitle} />
        </Reveal>
        <WalkthroughPlayer steps={steps} labels={{ pause: w.pause, play: w.play, progress: w.progress }} />
      </div>
    </Section>
  );
}
