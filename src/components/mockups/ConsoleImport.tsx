import * as React from 'react';
import { FileSpreadsheet, RotateCcw, Upload, X } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/utils';
import { ConsoleFrame, ConsolePageHeader, ConsoleShell } from './ConsoleChrome';

export const IMPORT_SHOT = { width: 1280, height: 820 } as const;

/** Sample weighings as a file would carry them. Row 5's kilos were typed as a word. */
const ROWS: { date: string; supplierCode: string; kg: string; collectionPoint: string }[] = [
  { date: '2026-10-08', supplierCode: '5147', kg: '24.5', collectionPoint: 'DENIYAYA' },
  { date: '2026-10-08', supplierCode: '5203', kg: '18', collectionPoint: 'DENIYAYA' },
  { date: '2026-10-08', supplierCode: '5208', kg: '31.5', collectionPoint: 'DENIYAYA' },
  { date: '2026-10-08', supplierCode: '5310', kg: 'twenty', collectionPoint: 'MAKADURA' },
  { date: '2026-10-08', supplierCode: '5412', kg: '27', collectionPoint: 'MAKADURA' },
  { date: '2026-10-08', supplierCode: '5506', kg: '22.5', collectionPoint: 'MAKADURA' },
  { date: '2026-10-08', supplierCode: '5617', kg: '35', collectionPoint: 'DENIYAYA' },
  { date: '2026-10-08', supplierCode: '5708', kg: '29.5', collectionPoint: 'DENIYAYA' },
];
const COLUMNS = ['date', 'supplierCode', 'kg', 'collectionPoint'] as const;
/** The spreadsheet row of the bad cell: the header is row 1, so the fourth weighing is 5. */
const BAD = { row: 5, column: 'kg' } as const;

/**
 * Leaf intake → Import from file, at the preview step (`components/ImportDialog.tsx`).
 *
 * The file has been read and every row checked before anything is sent. One cell is
 * wrong, so the row is tinted, the cell is red, the problem is named by row and column,
 * and Import stays disabled: a file with one bad row saves nothing.
 */
export function ConsoleImport({
  t,
  className,
  chrome = true,
}: {
  t: Dictionary;
  className?: string;
  chrome?: boolean;
}) {
  const r = t.records;
  const count = String(ROWS.length);

  return (
    <ConsoleFrame width={IMPORT_SHOT.width} height={IMPORT_SHOT.height} className={className} chrome={chrome}>
      <div className="relative h-full">
        <ConsoleShell t={t} active="deliveries" role="clerk" keepsRecords>
          <ConsolePageHeader title={r.deliveriesTitle} description={r.deliveriesSubtitle} />
        </ConsoleShell>

        {/* Dialog overlay: bg-overlay (rgba(11,13,18,0.45)) with a light blur. */}
        <div className="absolute inset-0 bg-[rgb(11_13_18/0.45)] backdrop-blur-[2px]" />

        {/* Dialog, size "md": max-w-dialog-wide (48rem at the console's 15px root = 720px). */}
        <div className="absolute left-1/2 top-1/2 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] border border-app-border bg-app-surface text-app-text shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
          <div className="flex items-start justify-between gap-[12px] border-b border-app-divider px-[16px] py-[12px]">
            <div className="min-w-0">
              <p className="text-[18px] font-semibold leading-[26px]">{r.importTitle}</p>
              <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">{r.importIntro}</p>
            </div>
            <span className="rounded-[10px] p-[4px] text-app-text-secondary">
              <X className="size-[20px]" strokeWidth={2} />
            </span>
          </div>

          <div className="flex flex-col gap-[12px] px-[16px] py-[12px]">
            <div className="flex flex-wrap items-center gap-[8px] text-[14px] leading-[20px]">
              <FileSpreadsheet className="size-[16px] text-app-primary" strokeWidth={2} />
              <span className="font-medium">{r.fileName}</span>
              <span className="text-app-text-secondary">{r.rowCount.replace('{count}', count)}</span>
            </div>

            {/* Notice, tone "error". */}
            <div className="flex items-start gap-[8px] rounded-[10px] bg-app-error-muted px-[16px] py-[8px] text-[14px] leading-[20px] text-app-error">
              <span className="flex flex-col gap-[4px]">
                <strong className="font-semibold">{r.problems.replace('{count}', '1')}</strong>
                <ul className="list-disc pl-[16px]">
                  <li>
                    {r.problemLine
                      .replace('{row}', String(BAD.row))
                      .replace('{column}', BAD.column)
                      .replace('{message}', r.notANumber)}
                  </li>
                </ul>
              </span>
            </div>

            <div className="overflow-hidden rounded-[10px] border border-app-border">
              <table className="w-full text-left text-[12px] leading-[16px]">
                <thead className="bg-app-surface-variant">
                  <tr>
                    <th className="px-[8px] py-[4px] font-semibold text-app-text-secondary">#</th>
                    {COLUMNS.map((column) => (
                      <th key={column} className="whitespace-nowrap px-[8px] py-[4px] font-mono font-semibold text-app-text-secondary">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, index) => {
                    const line = index + 2;
                    const bad = line === BAD.row;
                    return (
                      <tr key={line} className={cn('border-t border-app-divider', bad && 'bg-app-error-muted')}>
                        <td className="px-[8px] py-[4px] tabular-nums text-app-text-secondary">{line}</td>
                        {COLUMNS.map((column) => (
                          <td
                            key={column}
                            className={cn(
                              'whitespace-nowrap px-[8px] py-[4px]',
                              bad && column === BAD.column ? 'font-semibold text-app-error' : 'text-app-text',
                            )}
                          >
                            {row[column]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-[8px] border-t border-app-divider px-[16px] py-[12px]">
            <span className="inline-flex h-[41.25px] items-center rounded-[10px] px-[16px] text-[16px] font-semibold leading-[22px] tracking-[0.2px]">
              {r.cancel}
            </span>
            <span className="inline-flex h-[41.25px] items-center gap-[8px] rounded-[10px] border border-app-border bg-app-surface px-[16px] text-[16px] font-semibold leading-[22px] tracking-[0.2px] shadow-[0_1px_2px_rgb(11_31_28/0.05)]">
              <RotateCcw className="size-[16px]" strokeWidth={2} />
              {r.another}
            </span>
            {/* Disabled: there is a problem, and a file is all or nothing. */}
            <span className="inline-flex h-[41.25px] items-center gap-[8px] rounded-[10px] bg-[#d0d5dd] px-[16px] text-[16px] font-semibold leading-[22px] tracking-[0.2px] text-[#98a2b3]">
              <Upload className="size-[16px]" strokeWidth={2} />
              {r.submit.replace('{count}', count)}
            </span>
          </div>
        </div>
      </div>
    </ConsoleFrame>
  );
}
