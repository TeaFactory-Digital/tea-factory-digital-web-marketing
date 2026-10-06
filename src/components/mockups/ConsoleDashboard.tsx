import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/utils';
import {
  ADOPTION_MONTHS,
  ADOPTION_SERIES,
  CONSOLE_ADOPTION,
  CONSOLE_CONTENT,
  CONSOLE_INSTALLED_PERCENT,
  CONSOLE_QUEUES_SORTED,
  count,
  formatAge,
} from '@/lib/sample-data';
import { ConsoleCard, ConsoleFrame, ConsoleShell, TitleWithTip } from './ConsoleChrome';

/** The console runs on a 1366×768 office laptop; this is that width. */
export const CONSOLE_SHOT = { width: 1280, height: 1010 } as const;

/**
 * The office console's Dashboard (M1), reproduced from the shipped screen.
 *
 * Structure, order and copy follow `modules/dashboard/DashboardScreen.tsx`:
 * the waiting queues first, past-target ones leading and outlined in red, then
 * app adoption, content health and alerts, then the twelve-month adoption
 * trend. Card hints sit behind the "i" beside each title, as in the product.
 *
 * "Needs attention" reads as the product reads today: the server sends no
 * alerts yet, so the card says nothing needs attention rather than showing
 * alerts the console would not.
 *
 * It is a **light** product. The section around it on this site is dark; the
 * console itself is not, and pretending otherwise would be the mismatch.
 */
export function ConsoleDashboard({
  t,
  className,
  chrome = true,
}: {
  t: Dictionary;
  className?: string;
  chrome?: boolean;
}) {
  const c = t.console;

  return (
    <ConsoleFrame width={CONSOLE_SHOT.width} height={CONSOLE_SHOT.height} className={className} chrome={chrome}>
      <ConsoleShell t={t} active="dashboard">
        {/* PageHeader: h1 text-h3 (22/30, 600) */}
        <div>
          <p className="text-[22px] font-semibold leading-[30px]">{c.pageTitle}</p>
          <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">
            {c.pageSubtitle}
          </p>
        </div>

        {/* QueueSection: waiting queues only, grid gap-md, xl:grid-cols-3 */}
        <div className="grid grid-cols-3 gap-[12px]">
          {CONSOLE_QUEUES_SORTED.map((queue) => (
            <QueueCard
              key={queue.key}
              label={c.queue[queue.key]}
              pending={queue.pending}
              oldest={c.oldestWaiting.replace('{age}', formatAge(queue.oldestHours))}
              breaching={
                queue.breaching > 0
                  ? c.pastTarget.replace('{count}', String(queue.breaching))
                  : undefined
              }
            />
          ))}
        </div>

        {/* Adoption · content · alerts: grid gap-lg, lg:grid-cols-3 */}
        <div className="grid grid-cols-3 gap-[16px]">
          <ConsoleCard title={<TitleWithTip title={c.appAdoption} />} bodyClassName="flex flex-col gap-[4px]">
            <p className="text-[26px] font-bold leading-[34px] tracking-[-0.2px] tabular-nums">
              {CONSOLE_INSTALLED_PERCENT}%
            </p>
            <p className="text-[14px] leading-[20px] text-app-text-secondary">
              {c.appInstalled
                .replace('{withApp}', count(CONSOLE_ADOPTION.suppliersWithApp))
                .replace('{total}', count(CONSOLE_ADOPTION.totalSuppliers))}
            </p>
            <p className="text-[14px] leading-[20px] text-app-primary">
              {c.appWithout.replace(
                '{count}',
                count(CONSOLE_ADOPTION.totalSuppliers - CONSOLE_ADOPTION.suppliersWithApp),
              )}
            </p>
            <p className="text-[12px] leading-[16px] text-app-text-secondary">
              {c.appDevices.replace('{count}', count(CONSOLE_ADOPTION.devicesRegistered))}
            </p>
            <p className="text-[14px] leading-[20px] text-app-text-secondary tabular-nums">
              {c.appRequestShare.replace('{value}', `${CONSOLE_ADOPTION.appRequestShare}%`)}
            </p>
          </ConsoleCard>

          <ConsoleCard title={<TitleWithTip title={c.contentHealth} />} bodyClassName="flex flex-col gap-[8px]">
            <p className="text-[26px] font-bold leading-[34px] tracking-[-0.2px] tabular-nums">
              {CONSOLE_CONTENT.bannersLive}
            </p>
            <p className="text-[14px] leading-[20px] text-app-text-secondary">{c.bannersLive}</p>
            <ul className="flex flex-col gap-[2px] text-[14px] leading-[20px]">
              <li className="text-app-warning underline decoration-app-border underline-offset-2">
                {c.contentArticlesWithGaps.replace('{count}', String(CONSOLE_CONTENT.articlesWithGaps))}
              </li>
              <li className="text-app-text-secondary underline decoration-app-border underline-offset-2">
                {c.contentBannersExpired.replace('{count}', String(CONSOLE_CONTENT.bannersExpired))}
              </li>
              <li className="text-app-warning underline decoration-app-border underline-offset-2">
                {c.contentPagesUnwritten.replace('{count}', String(CONSOLE_CONTENT.staticPagesUnwritten))}
              </li>
            </ul>
          </ConsoleCard>

          <ConsoleCard title={c.alerts}>
            <p className="text-[14px] leading-[20px] text-app-text-secondary">{c.noAlerts}</p>
          </ConsoleCard>
        </div>

        {/* Adoption trend: Recharts AreaChart in an h-64 (240px) box */}
        <ConsoleCard title={<TitleWithTip title={c.adoptionTrend} />}>
          <AdoptionArea />
        </ConsoleCard>
      </ConsoleShell>
    </ConsoleFrame>
  );
}

function QueueCard({
  label,
  pending,
  oldest,
  breaching,
}: {
  label: string;
  pending: number;
  oldest: string;
  breaching?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[16px] border bg-app-surface p-[16px]',
        breaching
          ? 'border-app-error shadow-[0_1px_3px_rgb(0_0_0/0.1),0_1px_2px_-1px_rgb(0_0_0/0.1)]'
          : 'border-app-border',
      )}
    >
      <div className="flex items-baseline justify-between gap-[8px]">
        <p className="min-w-0 truncate text-[14px] font-medium leading-[20px] text-app-text-secondary">
          {label}
        </p>
        {breaching ? (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-app-error-muted px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-app-error">
            {breaching}
          </span>
        ) : null}
      </div>
      <p className="mt-[4px] text-[26px] font-bold leading-[34px] tracking-[-0.2px] tabular-nums">
        {pending}
      </p>
      <p className="mt-[2px] text-[12px] leading-[16px] text-app-text-secondary">{oldest}</p>
      <span className="mt-[8px] inline-flex items-center gap-[2px] text-[12px] leading-[16px] text-app-primary">
        {label} <ArrowRight className="size-[12px]" strokeWidth={2.2} />
      </span>
    </div>
  );
}

/**
 * The twelve-month area chart as Recharts draws it in the product: solid
 * horizontal grid, a 56px Y axis from 0% to 100%, an X axis line with the
 * two-digit month, a monotone line over a 0.35-to-0.02 gradient.
 */
function AdoptionArea() {
  const W = 1144;
  const H = 240;
  const top = 8;
  const right = 8;
  const axisY = 56;
  const axisX = 30;
  const plotW = W - axisY - right;
  const plotH = H - top - axisX;
  const x = (i: number) => axisY + (i / (ADOPTION_SERIES.length - 1)) * plotW;
  const y = (v: number) => top + plotH - (v / 100) * plotH;

  const points = ADOPTION_SERIES.map((v, i) => [x(i), y(v)] as const);
  const path = points.reduce((acc, [px, py], i, arr) => {
    if (i === 0) return `M ${px} ${py}`;
    const [qx, qy] = arr[i - 1];
    const cx = (qx + px) / 2;
    return `${acc} C ${cx} ${qy}, ${cx} ${py}, ${px} ${py}`;
  }, '');
  const base = top + plotH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[240px] w-full" aria-hidden="true">
      <defs>
        <linearGradient id="console-adoption" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-app-primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-app-primary)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={axisY} x2={W - right} y1={y(v)} y2={y(v)} stroke="var(--color-app-divider)" />
          <text
            x={axisY - 8}
            y={y(v)}
            dy="0.32em"
            textAnchor="end"
            fontSize="12"
            fill="var(--color-app-text-secondary)"
          >
            {v}%
          </text>
        </g>
      ))}
      <path d={`${path} L ${x(ADOPTION_SERIES.length - 1)} ${base} L ${axisY} ${base} Z`} fill="url(#console-adoption)" />
      <path d={path} fill="none" stroke="var(--color-app-primary)" strokeWidth="2" />
      <line x1={axisY} x2={W - right} y1={base} y2={base} stroke="var(--color-app-text-secondary)" />
      {ADOPTION_MONTHS.map((m, i) => (
        <text
          key={m}
          x={x(i)}
          y={base + 18}
          textAnchor="middle"
          fontSize="12"
          fill="var(--color-app-text-secondary)"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}
