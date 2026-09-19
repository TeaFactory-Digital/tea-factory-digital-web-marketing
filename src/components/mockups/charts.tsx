import * as React from 'react';
import { cn } from '@/lib/utils';
import { ADOPTION_SERIES, DAILY_SUPPLY, INCOME_SERIES } from '@/lib/sample-data';

/**
 * Day 1–31 with the kilos recorded against each.
 *
 * Drawn the way the app draws it (`components/bill/DailySupplyGrid.tsx`): seven
 * columns, a `primaryMuted` fill on days with a delivery and `surfaceVariant`
 * on days without, the day number in secondary text above the kilos. A blank
 * day is an en dash, not an empty cell, following the printed slip's convention.
 */
export function DailySupplyGrid({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-7 gap-[4px]', className)}>
      {DAILY_SUPPLY.map((kg, i) => (
        <div
          key={i}
          className={cn(
            'flex aspect-square flex-col items-center justify-center rounded-md',
            kg === null ? 'bg-app-surface-variant' : 'bg-app-primary-muted',
          )}
        >
          <span className="text-[10px] leading-[14px] text-app-text-secondary sm:text-xs">
            {i + 1}
          </span>
          <span
            className={cn(
              'text-[10px] leading-[14px] tabular-nums sm:text-xs',
              kg === null ? 'text-app-text-secondary' : 'font-medium text-app-primary',
            )}
          >
            {kg === null ? '–' : kg}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Twelve monthly totals as bars. The last bar is the month on screen. */
export function IncomeBars({
  className,
  tone = 'light',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const max = Math.max(...INCOME_SERIES);
  const labels = ['A', 'S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J'];

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex flex-1 items-end gap-1.5 sm:gap-2">
        {INCOME_SERIES.map((value, i) => {
          const last = i === INCOME_SERIES.length - 1;
          return (
            <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
              <div
                className={cn(
                  'w-full rounded-t-[4px] transition-all duration-300',
                  last
                    ? 'bg-leaf-600'
                    : tone === 'dark'
                      ? 'bg-cream-50/18 group-hover:bg-cream-50/30'
                      : 'bg-forest-800/16 group-hover:bg-forest-800/28',
                )}
                style={{ height: `${(value / max) * 100}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1.5 sm:gap-2">
        {labels.map((label, i) => (
          <span
            key={i}
            className={cn(
              'flex-1 text-center text-[8px] font-medium sm:text-[9px]',
              i === labels.length - 1
                ? 'text-leaf-600'
                : tone === 'dark'
                  ? 'text-cream-50/35'
                  : 'text-char-400',
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * App-request share over twelve months, as a line with a soft area under it.
 * Drawn as an SVG path so it scales with the card rather than with a library.
 */
export function AdoptionLine({
  className,
  tone = 'dark',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const w = 320;
  const h = 96;
  const max = 80;
  const points = ADOPTION_SERIES.map((v, i) => {
    const x = (i / (ADOPTION_SERIES.length - 1)) * w;
    const y = h - (v / max) * h;
    return [x, y] as const;
  });

  // A light Catmull-Rom-to-Bezier smoothing so the line reads as a trend.
  const path = points.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = arr[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }, '');

  const stroke = tone === 'dark' ? 'var(--color-leaf-400)' : 'var(--color-leaf-600)';

  return (
    <svg
      viewBox={`0 0 ${w} ${h + 6}`}
      className={cn('w-full', className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="adoption-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.32" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#adoption-fill)" />
      <path d={path} fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx={points[points.length - 1][0] - 2} cy={points[points.length - 1][1]} r="3.4" fill={stroke} />
    </svg>
  );
}

/** A tiny sparkline for KPI tiles. */
export function Sparkline({
  values,
  className,
  color = 'var(--color-leaf-400)',
}: {
  values: number[];
  className?: string;
  color?: string;
}) {
  const w = 72;
  const h = 22;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const d = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('h-5 w-[72px]', className)} aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
