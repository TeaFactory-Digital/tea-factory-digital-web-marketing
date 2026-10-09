import * as React from 'react';
import {
  BadgeDollarSign,
  Bell,
  Building2,
  Cable,
  CheckCircle2,
  Cloud,
  Landmark,
  Languages,
  MessageSquareQuote,
  Package,
  PencilLine,
  Percent,
  RotateCcw,
  Save,
  SlidersHorizontal,
  Warehouse,
  type LucideIcon,
} from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/utils';
import { ConsoleCard, ConsoleFrame, ConsolePageHeader, ConsoleShell } from './ConsoleChrome';

export const FACTORY_SYSTEM_SHOT = { width: 1280, height: 900 } as const;

/** The section rail, in `ConfigurationScreen.tsx`'s order and with its icons. */
const SECTIONS: { id: keyof Dictionary['records']['sectionTitles']; icon: LucideIcon }[] = [
  { id: 'factory', icon: Building2 },
  { id: 'features', icon: SlidersHorizontal },
  { id: 'factorySystem', icon: Cable },
  { id: 'operations', icon: Warehouse },
  { id: 'banks', icon: Landmark },
  { id: 'appearance', icon: Languages },
  { id: 'push', icon: Bell },
  { id: 'teaPackets', icon: Package },
  { id: 'creditRules', icon: BadgeDollarSign },
  { id: 'billCalculation', icon: Percent },
  { id: 'notes', icon: MessageSquareQuote },
];

/**
 * Configuration → Factory system (M14), reproduced from `ConfigurationScreen.tsx` and
 * `FactorySystemSection.tsx`: the settings rail, then the two choices as radio cards.
 *
 * Shown saved with the sync **off**, the state the section exists for, and as the factory
 * administrator sees it: the only role that may change configuration (`flagsAndBranding: W`),
 * which is why the footer offers Save. That role reads no leaf or rates, so its sidebar has no
 * *Factory records* menu; the clerk's Leaf intake screen (`ConsoleImport`) shows it.
 */
export function ConsoleFactorySystem({
  t,
  className,
  chrome = true,
}: {
  t: Dictionary;
  className?: string;
  chrome?: boolean;
}) {
  const r = t.records;

  return (
    <ConsoleFrame
      width={FACTORY_SYSTEM_SHOT.width}
      height={FACTORY_SYSTEM_SHOT.height}
      className={className}
      chrome={chrome}
    >
      <ConsoleShell t={t} active="configuration" role="factoryAdmin" keepsRecords>
        <ConsolePageHeader
          title={r.configTitle}
          description={r.configSubtitle}
          actions={
            // The tenant id: shown, never editable (it comes from the subdomain).
            <span className="flex items-baseline gap-[4px] whitespace-nowrap rounded-[10px] border border-app-border bg-app-surface px-[12px] py-[8px]">
              <span className="text-[12px] leading-[16px] text-app-text-secondary">{r.tenantId}</span>
              <span className="text-[16px] font-medium leading-[24px] tabular-nums">galaboda</span>
            </span>
          }
        />

        {/* SPLIT_PANE: gap-lg, a 1fr rail beside a 3fr editor. */}
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-[16px]">
          <ConsoleCard title={r.settings} bodyClassName="px-0 pb-[8px]">
            <ul>
              {SECTIONS.map((one) => {
                const active = one.id === 'factorySystem';
                return (
                  <li key={one.id}>
                    <span
                      className={cn(
                        'flex w-full items-start gap-[8px] border-l-2 px-[16px] py-[8px]',
                        active ? 'border-app-primary bg-app-primary-muted' : 'border-transparent',
                      )}
                    >
                      <one.icon className="mt-[2px] size-[16px] shrink-0 text-app-text-secondary" strokeWidth={2} />
                      <span className="flex min-w-0 flex-col">
                        <span
                          className={cn(
                            'text-[14px] leading-[20px]',
                            active ? 'font-semibold text-app-primary' : 'text-app-text',
                          )}
                        >
                          {r.sectionTitles[one.id]}
                        </span>
                        <span className="text-[12px] leading-[16px] text-app-text-secondary">
                          {r.sectionHints[one.id]}
                        </span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </ConsoleCard>

          <ConsoleCard
            title={r.sectionTitles.factorySystem}
            description={r.factorySystemDescription}
            className="self-start"
            bodyClassName="flex flex-col gap-[16px]"
          >
            <div className="grid grid-cols-2 gap-[12px]">
              <ModeCard
                icon={Cloud}
                selected={false}
                title={r.mode.syncTitle}
                body={r.mode.syncBody}
                points={[r.mode.syncP1, r.mode.syncP2, r.mode.syncP3]}
              />
              <ModeCard
                icon={PencilLine}
                selected
                title={r.mode.manualTitle}
                body={r.mode.manualBody}
                points={[r.mode.manualP1, r.mode.manualP2, r.mode.manualP3]}
              />
            </div>

            {/* SectionFooter, saved: Save disabled, Undo disabled, "Nothing has changed." */}
            <div className="flex flex-wrap items-center gap-[8px] border-t border-app-divider pt-[12px]">
              <span className="inline-flex h-[41.25px] items-center gap-[8px] rounded-[10px] bg-[#d0d5dd] px-[16px] text-[16px] font-semibold leading-[22px] tracking-[0.2px] text-[#98a2b3]">
                <Save className="size-[16px]" strokeWidth={2} />
                {r.save}
              </span>
              <span className="inline-flex h-[41.25px] items-center gap-[8px] rounded-[10px] px-[16px] text-[16px] font-semibold leading-[22px] tracking-[0.2px] text-[#98a2b3]">
                <RotateCcw className="size-[16px]" strokeWidth={2} />
                {r.undo}
              </span>
              <p className="text-[12px] leading-[16px] text-app-text-secondary">{r.nothingToSave}</p>
            </div>
          </ConsoleCard>
        </div>
      </ConsoleShell>
    </ConsoleFrame>
  );
}

/** `ModeCard`: a radio drawn as a card, the chosen one in the primary tint with a tick. */
function ModeCard({
  icon: Icon,
  selected,
  title,
  body,
  points,
}: {
  icon: LucideIcon;
  selected: boolean;
  title: string;
  body: string;
  points: string[];
}) {
  return (
    <div
      role="radio"
      aria-checked={selected}
      className={cn(
        'flex flex-col gap-[8px] rounded-[16px] border p-[16px] text-left',
        selected ? 'border-app-primary bg-app-primary-muted' : 'border-app-border bg-app-surface',
      )}
    >
      <span className="flex items-center gap-[8px]">
        <Icon className="size-[20px] text-app-primary" strokeWidth={2} />
        <span className="flex-1 text-[16px] font-semibold leading-[24px]">{title}</span>
        {selected ? <CheckCircle2 className="size-[20px] text-app-primary" strokeWidth={2} /> : null}
      </span>
      <span className="text-[14px] leading-[20px] text-app-text-secondary">{body}</span>
      <ul className="flex list-disc flex-col gap-[2px] pl-[16px] text-[14px] leading-[20px]">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
