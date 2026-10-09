import * as React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  BellRing,
  CircleCheck,
  ClipboardList,
  FileWarning,
  ImageOff,
  Inbox,
  Languages,
  Megaphone,
  MessageSquare,
  Package,
  Send,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/utils';
import {
  ADOPTION_MONTH_KEYS,
  ADOPTION_SERIES,
  CONSOLE_ADOPTION,
  CONSOLE_CONTENT,
  CONSOLE_INSTALLED_PERCENT,
  CONSOLE_QUEUES,
  CONSOLE_QUEUES_SORTED,
  count,
  formatAge,
} from '@/lib/sample-data';
import {
  ConsoleCard,
  ConsoleFrame,
  ConsolePageHeader,
  ConsoleShell,
  TitleWithTip,
} from './ConsoleChrome';

/**
 * The console runs on a 1366×768 office laptop; this is that width. The height
 * fits the Tamil copy, the longest; English leaves the canvas showing below.
 */
export const CONSOLE_SHOT = { width: 1280, height: 1470 } as const;

type Console = Dictionary['console'];
type QueueKey = (typeof CONSOLE_QUEUES)[number]['key'];

/**
 * Sizes the SVG charts are drawn at. `main` is 1280 less the 240px sidebar and
 * the 30px gutters, and the grids are `lg:grid-cols-3` with a 16px gap.
 */
const COLUMN = (1280 - 240 - 60 - 2 * 16) / 3; // 316
const TREND_W = 2 * COLUMN + 16 - 2 - 2 * 16; // the 2-col card's body: 614
const TREND_H = 324; // `min-h-64 flex-1`, stretched to the queue mix card beside it

/**
 * The console's categorical series (`chart1`–`chart5` in `@tfd/brand`), then
 * `disabled` for anything past the fifth slot (`components/charts/palette.ts`).
 */
const SERIES = ['#2A78D6', '#EB6834', '#1BAF7A', '#EDA100', '#E87BA4'] as const;
const OTHER_SERIES = '#D0D5DD';

/** Each queue's series slot, by key, as `QUEUE_SLOT` assigns them. */
const QUEUE_SLOT: Record<QueueKey, number> = {
  changeRequests: 0,
  inquiries: 1,
  advanceRequests: 2,
  loanRequests: 3,
  teaPacketRequests: 4,
  manureRequests: 5,
};

/** The sidebar icon each queue card borrows (`navigation.ts`). */
const QUEUE_ICON: Record<QueueKey, LucideIcon> = {
  changeRequests: ClipboardList,
  advanceRequests: BadgeDollarSign,
  loanRequests: BadgeDollarSign,
  manureRequests: BadgeDollarSign,
  teaPacketRequests: Package,
  inquiries: MessageSquare,
};

const CARD_SHADOW = 'shadow-[0_1px_2px_rgb(11_31_28/0.05)]';

/** `formatMonthKey` and the chart's `shortMonth`: en-GB whatever the UI language. */
const monthName = (monthKey: string, month: 'long' | 'short') => {
  const [year, m] = monthKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', {
    month,
    ...(month === 'long' ? { year: 'numeric' as const } : {}),
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, m - 1, 15)));
};

/** App-request share, last month against the one before, in points. */
const DELTA_POINTS =
  ADOPTION_SERIES[ADOPTION_SERIES.length - 1] - ADOPTION_SERIES[ADOPTION_SERIES.length - 2];

/**
 * The office console's Dashboard (M1), reproduced from the shipped screen.
 *
 * Structure, order and copy follow `modules/dashboard/DashboardScreen.tsx`: a
 * greeting, four headline tiles, the adoption trend beside the queues as a
 * ring, then the queue cards beside content health and alerts. Card hints sit
 * behind the "i" beside each title, as in the product.
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
  // The product greets by the first word of the signed-in user's name.
  // The whole name, as the console greets: "Good morning, Ruwan Gunawardena".
  const name = c.user.name;

  return (
    <ConsoleFrame width={CONSOLE_SHOT.width} height={CONSOLE_SHOT.height} className={className} chrome={chrome}>
      <ConsoleShell t={t} active="dashboard">
        <ConsolePageHeader title={c.greeting.replace('{name}', name)} description={c.pageSubtitle} />

        <KpiRow c={c} />

        <div className="grid grid-cols-3 gap-[16px]">
          <AdoptionTrendCard c={c} className="col-span-2" />
          <QueueMixCard c={c} />
        </div>

        <div className="grid grid-cols-3 items-start gap-[16px]">
          <QueueSection c={c} className="col-span-2" />
          <div className="flex flex-col gap-[16px]">
            <ContentHealthCard c={c} />
            <ConsoleCard title={c.alerts}>
              <p className="flex items-center gap-[4px] text-[14px] leading-[20px] text-app-text-secondary">
                <CircleCheck className="size-[16px] shrink-0 text-app-success" />
                {c.noAlerts}
              </p>
            </ConsoleCard>
          </div>
        </div>
      </ConsoleShell>
    </ConsoleFrame>
  );
}

/* ─────────────────────────────── headline tiles ─────────────────────────────── */

function KpiRow({ c }: { c: Console }) {
  const pending = CONSOLE_QUEUES.reduce((total, queue) => total + queue.pending, 0);
  const overdue = CONSOLE_QUEUES.reduce((total, queue) => total + queue.breaching, 0);
  const installed = CONSOLE_ADOPTION.suppliersWithApp / CONSOLE_ADOPTION.totalSuppliers;

  return (
    <div className="grid grid-cols-4 gap-[16px]">
      <StatCard
        icon={Inbox}
        label={c.kpi.waiting}
        period={c.kpi.now}
        value={count(pending)}
        delta={overdue > 0 ? <Badge>{c.kpi.overdue.replace('{count}', String(overdue))}</Badge> : null}
      />
      <StatCard
        icon={Smartphone}
        label={<TitleWithTip title={c.appAdoption} />}
        value={`${CONSOLE_INSTALLED_PERCENT}%`}
        caption={c.appInstalled
          .replace('{withApp}', count(CONSOLE_ADOPTION.suppliersWithApp))
          .replace('{total}', count(CONSOLE_ADOPTION.totalSuppliers))}
        footer={
          <div className="flex flex-col gap-[8px]">
            {/* Meter: h-1.5, a primary/15 track */}
            <div className="h-[5.625px] w-full overflow-hidden rounded-full bg-app-primary/15">
              <div className="h-full rounded-full bg-app-primary" style={{ width: `${installed * 100}%` }} />
            </div>
            <span className="inline-flex w-fit items-center gap-[2px] text-[12px] font-medium leading-[16px] text-app-primary">
              {c.appWithout.replace(
                '{count}',
                count(CONSOLE_ADOPTION.totalSuppliers - CONSOLE_ADOPTION.suppliersWithApp),
              )}
              <ArrowRight className="size-[12px]" />
            </span>
          </div>
        }
      />
      <StatCard
        icon={Send}
        label={c.kpi.appRequests}
        period={c.kpi.thisMonth}
        value={`${CONSOLE_ADOPTION.appRequestShare}%`}
        delta={<DeltaPill>{c.kpi.points.replace('{count}', String(DELTA_POINTS))}</DeltaPill>}
        caption={c.kpi.vsLastMonth}
        trend={<Sparkline values={ADOPTION_SERIES.map((v) => v / 100)} />}
      />
      <StatCard
        icon={BellRing}
        label={c.kpi.devices}
        value={count(CONSOLE_ADOPTION.devicesRegistered)}
        caption={c.kpi.devicesCaption}
      />
    </div>
  );
}

/** `components/charts/StatCard.tsx`: label row, the figure, its delta and caption. */
function StatCard({
  icon: Icon,
  label,
  period,
  value,
  delta,
  caption,
  trend,
  footer,
}: {
  icon: LucideIcon;
  label: React.ReactNode;
  period?: string;
  value: string;
  delta?: React.ReactNode;
  caption?: string;
  trend?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'flex flex-col gap-[12px] rounded-[16px] border border-app-border bg-app-surface p-[16px]',
        CARD_SHADOW,
      )}
    >
      <div className="flex items-center gap-[8px] text-[14px] font-medium leading-[20px] text-app-text-secondary">
        <span className="grid size-[26.25px] shrink-0 place-items-center rounded-[10px] bg-app-primary/10 text-app-primary">
          <Icon className="size-[16px]" />
        </span>
        <p className="min-w-0 flex-1 truncate">{label}</p>
        {period ? <span className="shrink-0 text-[12px] font-normal leading-[16px]">{period}</span> : null}
      </div>

      <div className="flex items-end justify-between gap-[12px]">
        <div className="flex min-w-0 flex-col gap-[8px]">
          <p className="text-[26px] font-semibold leading-[34px] tracking-tight tabular-nums">{value}</p>
          {delta || caption ? (
            <div className="flex flex-wrap items-center gap-[4px] text-[12px] leading-[16px] text-app-text-secondary">
              {delta}
              {caption ? <span className="min-w-0">{caption}</span> : null}
            </div>
          ) : null}
        </div>
        {trend}
      </div>

      {footer}
    </section>
  );
}

/** `Badge` in the error tone: a dot, then the text. */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center gap-[4px] whitespace-nowrap rounded-full bg-app-error-muted px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-app-error">
      <span className="size-[5.625px] shrink-0 rounded-full bg-current" />
      {children}
    </span>
  );
}

/** `DeltaPill`, rising and good: an arrow, the sign, the points. */
function DeltaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-[2px] whitespace-nowrap rounded-[6px] bg-app-success-muted px-[4px] py-[2px] text-[12px] font-semibold leading-[16px] text-app-success tabular-nums">
      <ArrowUpRight className="size-[12px] shrink-0" />
      <span>+{children}</span>
    </span>
  );
}

/** `components/charts/Sparkline.tsx`: 120×36 drawn into `h-9 w-28`, on a 0–1 domain. */
function Sparkline({ values }: { values: number[] }) {
  const W = 120;
  const H = 36;
  const x = (i: number) => (i * W) / (values.length - 1);
  const y = (v: number) => H - 3 - v * (H - 6);
  const line = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  const last = values.length - 1;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-[33.75px] w-[105px] shrink overflow-visible text-app-primary"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="console-sparkline" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity={0.2} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${line}L${W},${H}L0,${H}Z`} fill="url(#console-sparkline)" />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={x(last)}
        cy={y(values[last])}
        r={3}
        fill="currentColor"
        stroke="var(--color-app-surface)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ─────────────────────────────── adoption trend ─────────────────────────────── */

function AdoptionTrendCard({ c, className }: { c: Console; className?: string }) {
  const latest = ADOPTION_MONTH_KEYS[ADOPTION_MONTH_KEYS.length - 1];

  return (
    <ConsoleCard
      className={className}
      bodyClassName="flex flex-1 flex-col"
      title={<TitleWithTip title={c.adoptionTrend} />}
      description={
        <span className="mt-[4px] flex flex-wrap items-baseline gap-[8px]">
          <span className="text-[22px] font-semibold leading-[30px] tracking-tight text-app-text tabular-nums">
            {CONSOLE_ADOPTION.appRequestShare}%
          </span>
          <DeltaPill>{c.kpi.points.replace('{count}', String(DELTA_POINTS))}</DeltaPill>
          <span className="text-[12px] leading-[16px]">{monthName(latest, 'long')}</span>
        </span>
      }
      actions={
        // Tabs as a segmented control, the 12-month window open.
        <span className={cn('inline-flex gap-[2px] rounded-[10px] border border-app-border bg-app-surface p-[2px]', CARD_SHADOW)}>
          {[3, 6, 12].map((months) => (
            <span
              key={months}
              className={cn(
                'inline-flex items-center justify-center rounded-[6px] px-[8px] py-[4px] text-[14px] leading-[20px]',
                months === 12
                  ? 'bg-app-primary-muted font-semibold text-app-text ring-1 ring-inset ring-app-primary/30'
                  : 'font-medium text-app-text-secondary',
              )}
            >
              {c.trendMonths.replace('{count}', String(months))}
            </span>
          ))}
        </span>
      }
    >
      <AdoptionArea />
    </ConsoleCard>
  );
}

/**
 * d3's `curveMonotoneX`, which Recharts draws `type="monotone"` with: a cubic
 * per segment whose tangents never overshoot the points either side.
 */
function monotonePath(points: (readonly [number, number])[]) {
  const n = points.length;
  const sign = (v: number) => (v < 0 ? -1 : 1);
  const slope = (i: number) => (points[i + 1][1] - points[i][1]) / (points[i + 1][0] - points[i][0]);
  const tangents = points.map((_, i) => {
    if (i === 0 || i === n - 1) return 0;
    const h0 = points[i][0] - points[i - 1][0];
    const h1 = points[i + 1][0] - points[i][0];
    const s0 = slope(i - 1);
    const s1 = slope(i);
    const p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  });
  // The end tangents follow from their neighbours, as d3's `slope2` does.
  tangents[0] = (3 * slope(0) - tangents[1]) / 2;
  tangents[n - 1] = (3 * slope(n - 2) - tangents[n - 2]) / 2;

  return points.reduce((d, [x1, y1], i) => {
    if (i === 0) return `M ${x1} ${y1}`;
    const [x0, y0] = points[i - 1];
    const dx = (x1 - x0) / 3;
    return `${d} C ${x0 + dx} ${y0 + dx * tangents[i - 1]}, ${x1 - dx} ${y1 - dx * tangents[i]}, ${x1} ${y1}`;
  }, '');
}

/**
 * The twelve-month area chart as Recharts draws it in the product: hairline
 * horizontal grid in the divider colour, a 44px Y axis from 0% to 100% with no
 * axis line, the short month under each point, and a monotone line over a
 * 0.22-to-0 primary wash.
 */
function AdoptionArea() {
  const W = TREND_W;
  const H = TREND_H;
  const top = 8;
  const right = 8;
  const axisY = 44;
  const axisX = 30;
  const plotW = W - axisY - right;
  const plotH = H - top - axisX;
  const x = (i: number) => axisY + (i / (ADOPTION_SERIES.length - 1)) * plotW;
  const y = (v: number) => top + plotH - (v / 100) * plotH;

  const path = monotonePath(ADOPTION_SERIES.map((v, i) => [x(i), y(v)] as const));
  const base = top + plotH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block" aria-hidden="true">
      <defs>
        <linearGradient id="console-adoption" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-app-primary)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-app-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={axisY} x2={W - right} y1={y(v)} y2={y(v)} stroke="var(--color-app-divider)" />
          <text
            x={axisY - 14}
            y={y(v)}
            dy="0.355em"
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
      {/* Recharts pulls the last label in until it ends at the chart's edge. */}
      {ADOPTION_MONTH_KEYS.map((key, i) => (
        <text
          key={key}
          x={i === ADOPTION_MONTH_KEYS.length - 1 ? W : x(i)}
          y={base + 16}
          dy="0.71em"
          textAnchor={i === ADOPTION_MONTH_KEYS.length - 1 ? 'end' : 'middle'}
          fontSize="12"
          fill="var(--color-app-text-secondary)"
        >
          {monthName(key, 'short')}
        </text>
      ))}
    </svg>
  );
}

/* ─────────────────────────────── queue mix ─────────────────────────────── */

/** `DonutChart`: a 160 ring drawn into `size-40`, with the legend under it. */
function QueueMixCard({ c }: { c: Console }) {
  const SIZE = 160;
  const RADIUS = 62;
  const THICKNESS = 16;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const GAP = 2.5;

  const waiting = [...CONSOLE_QUEUES]
    .filter((queue) => queue.pending > 0)
    .sort((a, b) => QUEUE_SLOT[a.key] - QUEUE_SLOT[b.key]);
  const total = waiting.reduce((sum, queue) => sum + queue.pending, 0);

  let offset = 0;
  const arcs = waiting.map((queue) => {
    const length = (queue.pending / total) * CIRCUMFERENCE;
    const arc = {
      ...queue,
      color: SERIES[QUEUE_SLOT[queue.key]] ?? OTHER_SERIES,
      dash: Math.max(0, length - GAP),
      offset,
    };
    offset += length;
    return arc;
  });

  return (
    <ConsoleCard title={c.queueMix} description={c.kpi.now} bodyClassName="flex flex-1 flex-col justify-center">
      <div className="flex flex-col gap-[16px]">
        <div className="flex justify-center">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-[150px] overflow-visible" aria-hidden="true">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--color-app-surface-variant)"
              strokeWidth={THICKNESS}
            />
            {arcs.map((arc) => (
              <circle
                key={arc.key}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={arc.color}
                strokeWidth={THICKNESS}
                strokeDasharray={`${arc.dash} ${CIRCUMFERENCE - arc.dash}`}
                strokeDashoffset={-arc.offset}
                transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
              />
            ))}
            <text
              x={SIZE / 2}
              y={SIZE / 2 - 2}
              textAnchor="middle"
              fontSize="22"
              fontWeight="600"
              fill="var(--color-app-text)"
              className="tabular-nums"
            >
              {total}
            </text>
            <text
              x={SIZE / 2}
              y={SIZE / 2 + 18}
              textAnchor="middle"
              fontSize="12"
              fill="var(--color-app-text-secondary)"
            >
              {c.queueMixTotal}
            </text>
          </svg>
        </div>

        <ul className="flex flex-col gap-[2px]">
          {arcs.map((arc) => (
            <li key={arc.key} className="-mx-[8px] flex items-center gap-[8px] px-[8px] py-[4px] text-[14px] leading-[20px]">
              <span className="size-[9.375px] shrink-0 rounded-full" style={{ background: arc.color }} />
              <span className="min-w-0 flex-1 truncate">{c.queue[arc.key]}</span>
              <span className="text-app-text-secondary tabular-nums">
                {Math.round((arc.pending / total) * 100)}%
              </span>
              <span className="min-w-[37.5px] text-right font-semibold tabular-nums">{arc.pending}</span>
            </li>
          ))}
        </ul>
      </div>
    </ConsoleCard>
  );
}

/* ─────────────────────────────── queue cards ─────────────────────────────── */

/** Worst first: past target, then the longest waiting. Every queue here has something in it. */
function QueueSection({ c, className }: { c: Console; className?: string }) {
  return (
    <ConsoleCard className={className} title={c.queuesTitle} description={c.queuesHint}>
      <div className="grid grid-cols-2 gap-[12px]">
        {CONSOLE_QUEUES_SORTED.map((queue) => (
          <QueueCard
            key={queue.key}
            icon={QUEUE_ICON[queue.key]}
            label={c.queue[queue.key]}
            pending={queue.pending}
            oldest={c.oldestWaiting.replace('{age}', formatAge(queue.oldestHours))}
            breaching={
              queue.breaching > 0 ? c.pastTarget.replace('{count}', String(queue.breaching)) : undefined
            }
          />
        ))}
      </div>
    </ConsoleCard>
  );
}

function QueueCard({
  icon: Icon,
  label,
  pending,
  oldest,
  breaching,
}: {
  icon: LucideIcon;
  label: string;
  pending: number;
  oldest: string;
  breaching?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[16px] border p-[16px]',
        breaching ? 'border-app-error bg-app-error-muted/40' : 'border-app-border bg-app-surface',
      )}
    >
      <div className="flex items-center justify-between gap-[8px]">
        <span className="flex min-w-0 items-center gap-[8px]">
          <span className="grid size-[26.25px] shrink-0 place-items-center rounded-[10px] bg-app-surface-variant text-app-text-secondary">
            <Icon className="size-[16px]" />
          </span>
          <p className="truncate text-[14px] font-medium leading-[20px] text-app-text-secondary">{label}</p>
        </span>
        {breaching ? <Badge>{breaching}</Badge> : null}
      </div>
      <p className="mt-[12px] text-[26px] font-semibold leading-[34px] tracking-tight tabular-nums">{pending}</p>
      <p className="mt-[8px] text-[12px] leading-[16px] text-app-text-secondary">{oldest}</p>
      <span className="mt-[12px] inline-flex items-center gap-[2px] text-[12px] font-medium leading-[16px] text-app-primary">
        {label}
        <ArrowRight className="size-[12px]" />
      </span>
    </div>
  );
}

/* ────────────────────────── content & alerts ────────────────────────── */

function ContentHealthCard({ c }: { c: Console }) {
  const rows = [
    { text: c.contentArticlesWithGaps, count: CONSOLE_CONTENT.articlesWithGaps, icon: Languages, tone: 'warning' },
    { text: c.contentBannersExpired, count: CONSOLE_CONTENT.bannersExpired, icon: ImageOff, tone: 'neutral' },
    { text: c.contentPagesUnwritten, count: CONSOLE_CONTENT.staticPagesUnwritten, icon: FileWarning, tone: 'warning' },
  ] as const;

  return (
    <ConsoleCard title={<TitleWithTip title={c.contentHealth} />} bodyClassName="flex flex-col gap-[12px]">
      <div className="flex items-center gap-[12px] rounded-[10px] bg-app-surface-variant px-[12px] py-[8px]">
        <Megaphone className="size-[20px] shrink-0 text-app-primary" />
        <p className="flex items-baseline gap-[4px] text-[14px] leading-[20px] text-app-text-secondary">
          <span className="text-[18px] font-semibold leading-[26px] text-app-text tabular-nums">
            {CONSOLE_CONTENT.bannersLive}
          </span>
          {c.bannersLive}
        </p>
      </div>

      {/* FeedRow: a tinted icon tile, then the sentence as a link. */}
      <ul className="flex flex-col">
        {rows.map((row) => (
          <li
            key={row.text}
            className="flex items-start gap-[12px] border-t border-app-divider py-[8px] first:border-t-0 first:pt-0"
          >
            <span
              className={cn(
                'grid size-[30px] shrink-0 place-items-center rounded-[10px]',
                row.tone === 'warning'
                  ? 'bg-app-warning-muted text-app-warning'
                  : 'bg-app-surface-variant text-app-text-secondary',
              )}
            >
              <row.icon className="size-[16px]" />
            </span>
            <span className="min-w-0 pt-[4px] text-[14px] leading-[20px] underline decoration-app-border underline-offset-2">
              {row.text.replace('{count}', String(row.count))}
            </span>
          </li>
        ))}
      </ul>
    </ConsoleCard>
  );
}
