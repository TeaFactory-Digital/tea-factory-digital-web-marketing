import * as React from 'react';
import { FileUp, TriangleAlert } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { money } from '@/lib/sample-data';
import { cn } from '@/lib/utils';
import { ConsoleCard, ConsoleFrame, ConsolePageHeader, ConsoleShell } from './ConsoleChrome';

export const SLIP_COMPARISON_SHOT = { width: 1280, height: 760 } as const;

/** The month's counts: 571 bills, two that differ from the printed slip, one of them held. */
const COUNTS = { match: 569, mismatch: 2, missing: 0, held: 1 } as const;

/** Every bill that is not a plain match. Sample suppliers; ours minus printed is the difference. */
const ROWS: {
  code: string;
  name: string;
  ours: number;
  printed: number;
  held: boolean;
}[] = [
  { code: '5310', name: 'S. Perera', ours: 41250, printed: 41240, held: false },
  {
    code: '5617',
    name: 'R. Kumari',
    ours: 38900,
    printed: 38350,
    held: true,
  },
];

/**
 * Rates & month close, scrolled to "Compare with printed slips" (`SlipComparisonCard.tsx`).
 *
 * For a factory whose bills are calculated in the console: its own system still prints a
 * slip for every supplier, and the two must agree. The counts, then every bill that is not
 * a plain match with ours, printed and the difference. One is held (its reason under the
 * name), one is not yet, so the warning says the month cannot be published.
 */
export function ConsoleSlipComparison({
  t,
  className,
  chrome = true,
}: {
  t: Dictionary;
  className?: string;
  chrome?: boolean;
}) {
  const s = t.records.slips;
  const blocking = ROWS.filter((row) => !row.held).length;

  return (
    <ConsoleFrame width={SLIP_COMPARISON_SHOT.width} height={SLIP_COMPARISON_SHOT.height} className={className} chrome={chrome}>
      <ConsoleShell t={t} active="rates" role="manager" keepsRecords>
        <ConsolePageHeader
          title={s.monthsTitle}
          description={s.monthsSubtitle}
          actions={
            <span className="inline-flex h-[40px] items-center gap-[8px] rounded-[10px] border border-app-border bg-app-surface px-[16px] text-[14px] font-medium leading-[20px] shadow-[0_1px_2px_rgb(11_31_28/0.05)]">
              <FileUp className="size-[16px]" strokeWidth={2} />
              {s.importButton}
            </span>
          }
        />

        <ConsoleCard title={s.title} description={s.description} bodyClassName="flex flex-col gap-[12px]">
          {/* dl: grid of four, caption over the count (subtitle), a count above 0 in the error colour */}
          <dl className="grid grid-cols-4 gap-x-[16px] gap-y-[4px]">
            <Count label={s.countMatch} value={COUNTS.match} />
            <Count label={s.countMismatch} value={COUNTS.mismatch} alert />
            <Count label={s.countMissing} value={COUNTS.missing} alert />
            <Count label={s.countHeld} value={COUNTS.held} />
          </dl>

          {/* Notice, tone "warning". */}
          <div className="flex items-start gap-[8px] rounded-[10px] bg-app-warning-muted px-[16px] py-[8px] text-[14px] leading-[20px] text-app-warning">
            <TriangleAlert className="mt-[2px] size-[16px] shrink-0" strokeWidth={2} />
            {s.blocking.replace('{count}', String(blocking))}
          </div>

          <div className="overflow-hidden rounded-[10px] border border-app-border">
            <table className="w-full border-collapse text-[13px] leading-[18px]">
              <thead className="bg-app-table-header">
                <tr>
                  <Th>{s.colSupplier}</Th>
                  <Th right>{s.colOurs}</Th>
                  <Th right>{s.colPrinted}</Th>
                  <Th right>{s.colDifference}</Th>
                  <Th>{s.colStatus}</Th>
                  <Th right> </Th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, index) => (
                  <tr key={row.code} className={cn('border-t border-app-divider', index % 2 === 1 && 'bg-app-row-alt')}>
                    <td className="px-[12px] py-[8px]">
                      <span className="font-medium text-app-primary">{row.code}</span>{' '}
                      <span>{row.name}</span>
                      {/* A held bill's reason, as the office typed it (sample, in the page's language). */}
                      {row.held ? (
                        <p className="text-[12px] leading-[16px] text-app-text-secondary">{s.sampleReason}</p>
                      ) : null}
                    </td>
                    <td className="px-[12px] py-[8px] text-right tabular-nums">{money(row.ours)}</td>
                    <td className="px-[12px] py-[8px] text-right tabular-nums">{money(row.printed)}</td>
                    <td className="px-[12px] py-[8px] text-right font-medium tabular-nums text-app-error">
                      {money(row.ours - row.printed)}
                    </td>
                    <td className="px-[12px] py-[8px]">
                      <div className="flex flex-wrap gap-[4px]">
                        <Badge tone="error">{s.statusMismatch}</Badge>
                        {row.held ? <Badge tone="info">{s.statusHeld}</Badge> : null}
                      </div>
                    </td>
                    <td className="px-[12px] py-[8px]">
                      <div className="flex justify-end gap-[4px]">
                        <Button>{s.enterPrinted}</Button>
                        {row.held ? null : <Button secondary>{s.hold}</Button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[12px] leading-[16px] text-app-text-secondary">{s.howToFix}</p>
        </ConsoleCard>
      </ConsoleShell>
    </ConsoleFrame>
  );
}

function Count({ label, value, alert }: { label: string; value: number; alert?: boolean }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[12px] leading-[16px] text-app-text-secondary">{label}</dt>
      <dd className={cn('text-[16px] font-medium leading-[24px] tabular-nums', alert && value > 0 && 'text-app-error')}>
        {value.toLocaleString('en-US')}
      </dd>
    </div>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={cn(
        'px-[12px] py-[8px] text-[12px] font-semibold leading-[16px] tracking-[0.3px] text-app-text-secondary',
        right ? 'text-right' : 'text-left',
      )}
    >
      {children}
    </th>
  );
}

/** `Badge`: a status pill with its dot, in the tone's muted fill. */
function Badge({ tone, children }: { tone: 'error' | 'info'; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-[4px] whitespace-nowrap rounded-full px-[8px] py-[2px] text-[12px] font-medium leading-[16px]',
        tone === 'error' ? 'bg-app-error-muted text-app-error' : 'bg-app-info-muted text-app-info',
      )}
    >
      <span className="size-[6px] shrink-0 rounded-full bg-current" />
      {children}
    </span>
  );
}

/** `Button` size "sm": ghost, or secondary with its border and lift. */
function Button({ children, secondary }: { children: React.ReactNode; secondary?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-[34px] items-center whitespace-nowrap rounded-[10px] px-[12px] text-[14px] font-medium leading-[20px]',
        secondary && 'border border-app-border bg-app-surface shadow-[0_1px_2px_rgb(11_31_28/0.05)]',
      )}
    >
      {children}
    </span>
  );
}
