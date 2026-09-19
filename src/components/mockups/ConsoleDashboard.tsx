import * as React from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  Bell,
  ChevronDown,
  ClipboardList,
  FileText,
  Gauge,
  LayoutDashboard,
  Leaf,
  Megaphone,
  MessageSquare,
  Newspaper,
  Package,
  ScrollText,
  Settings,
  ShieldCheck,
  TriangleAlert,
  Users,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/utils';
import {
  ADOPTION_SERIES,
  CONSOLE_ADOPTION,
  CONSOLE_CONTENT,
  CONSOLE_INSTALLED_PERCENT,
  CONSOLE_QUEUES,
  count,
} from '@/lib/sample-data';
import { DeviceShot } from './DeviceShot';

/** The console runs on a 1366×768 office laptop; this is that viewport. */
export const CONSOLE_SHOT = { width: 1280, height: 1060 } as const;

/**
 * The office console's Dashboard (M1), reproduced from the shipped screen.
 *
 * Structure, order and copy follow `modules/dashboard/DashboardScreen.tsx`:
 * queue cards first (what is waiting), then app adoption, content health and
 * alerts, then the twelve-month adoption trend. The chrome is the real
 * `Sidebar` and `Topbar`: persistent nav, sections in their shipped order,
 * the active row carrying a left rule and the primary-muted fill.
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
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-black/10 bg-app-surface shadow-panel sm:rounded-3xl',
        className,
      )}
    >
      {chrome ? <BrowserChrome /> : null}
      <DeviceShot width={CONSOLE_SHOT.width} height={CONSOLE_SHOT.height}>
        <ConsoleScreen t={t} />
      </DeviceShot>
    </div>
  );
}

function BrowserChrome() {
  return (
    <div className="flex items-center gap-3 border-b border-app-border bg-app-surface-variant px-4 py-2.5">
      <div className="flex gap-1.5">
        {['#ef6a5e', '#f5bf4f', '#61c454'].map((color) => (
          <span key={color} className="size-2.5 rounded-full" style={{ background: color }} />
        ))}
      </div>
      <div className="mx-auto flex max-w-[280px] flex-1 items-center gap-1.5 rounded-md bg-app-surface px-3 py-1 ring-1 ring-app-border">
        <ShieldCheck className="size-3 shrink-0 text-app-primary" strokeWidth={2.2} />
        <span className="truncate text-[10px] text-app-text-secondary">
          galaboda.teafactorydigital.lk
        </span>
      </div>
      <div className="w-[52px]" />
    </div>
  );
}

/* ─────────────────────────────── the screen ─────────────────────────────── */

function ConsoleScreen({ t }: { t: Dictionary }) {
  const c = t.console;

  const sections: { title: string; items: { label: string; icon: LucideIcon; badge?: number }[] }[] =
    [
      {
        title: c.nav.sectionOverview,
        items: [
          { label: c.nav.dashboard, icon: LayoutDashboard },
          { label: c.nav.suppliers, icon: Users },
        ],
      },
      {
        title: c.nav.sectionQueues,
        items: [
          { label: c.nav.changeRequests, icon: ClipboardList, badge: 4 },
          { label: c.nav.credit, icon: BadgeDollarSign, badge: 12 },
          { label: c.nav.teaPackets, icon: Package, badge: 5 },
          { label: c.nav.inquiries, icon: MessageSquare, badge: 3 },
        ],
      },
      {
        title: c.nav.sectionSupport,
        items: [{ label: c.nav.bills, icon: FileText }],
      },
      {
        title: c.nav.sectionContent,
        items: [
          { label: c.nav.news, icon: Newspaper },
          { label: c.nav.banners, icon: Megaphone },
          { label: c.nav.content, icon: ScrollText },
          { label: c.nav.notifications, icon: Bell },
        ],
      },
      {
        title: c.nav.sectionAdmin,
        items: [
          { label: c.nav.reports, icon: Gauge },
          { label: c.nav.audit, icon: ShieldCheck },
          { label: c.nav.configuration, icon: Settings },
          { label: c.nav.users, icon: UsersRound },
        ],
      },
    ];

  return (
    <div className="flex h-full overflow-hidden bg-app-background text-app-text">
      {/* ── Sidebar: w-64, persistent ──────────────────────────────────── */}
      <nav className="flex w-[256px] shrink-0 flex-col border-r border-app-border bg-app-surface">
        <div className="border-b border-app-border px-[16px] py-[12px]">
          <span className="flex items-center gap-[8px]">
            <span className="grid size-[32px] shrink-0 place-items-center rounded-[8px] bg-app-primary">
              <Leaf className="size-[18px] text-white" strokeWidth={2.2} />
            </span>
            <span className="truncate text-[16px] font-semibold leading-[24px]">
              {t.bill.factoryName}
            </span>
          </span>
        </div>

        <div className="flex-1 overflow-hidden py-[8px]">
          {sections.map((section) => (
            <div key={section.title} className="mb-[12px]">
              <p className="px-[16px] py-[4px] text-[11px] font-medium uppercase leading-[16px] tracking-[1px] text-app-text-secondary">
                {section.title}
              </p>
              <ul>
                {section.items.map((item, i) => {
                  const active = section.title === c.nav.sectionOverview && i === 0;
                  return (
                    <li key={item.label}>
                      <span
                        className={cn(
                          'flex items-center gap-[8px] border-l-2 px-[16px] py-[8px] text-[14px] leading-[20px]',
                          active
                            ? 'border-app-primary bg-app-primary-muted font-semibold text-app-primary'
                            : 'border-transparent text-app-text',
                        )}
                      >
                        <item.icon className="size-[20px] shrink-0" strokeWidth={1.9} />
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        {item.badge ? (
                          <span className="rounded-full bg-app-surface-variant px-[6px] py-[1px] text-[12px] font-semibold leading-[16px] text-app-text-secondary tabular-nums">
                            {item.badge}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar: h-14 */}
        <header className="flex h-[56px] shrink-0 items-center justify-between gap-[12px] border-b border-app-border bg-app-surface px-[16px]">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold leading-[20px]">
              {t.bill.factoryName}
            </p>
            <p className="truncate text-[12px] leading-[16px] text-app-text-secondary">
              {t.bill.factoryLocation}
            </p>
          </div>
          <div className="flex items-center gap-[8px]">
            <span className="flex flex-col items-end">
              <span className="text-[14px] font-medium leading-[20px]">{c.user.name}</span>
              <span className="text-[12px] leading-[16px] text-app-text-secondary">
                {c.user.role}
              </span>
            </span>
            <ChevronDown className="size-[16px] text-app-text-secondary" strokeWidth={2} />
          </div>
        </header>

        {/* main: px-gutter py-lg, content gap-lg */}
        <div className="flex min-h-0 flex-1 flex-col gap-[16px] px-[24px] py-[16px]">
          <div>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.2px]">
              {c.pageTitle}
            </h1>
            <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">
              {c.pageSubtitle}
            </p>
          </div>

          {/* Queue cards: grid gap-md, xl:grid-cols-3 */}
          <div className="grid grid-cols-3 gap-[12px]">
            {CONSOLE_QUEUES.map((queue) => (
              <QueueCard
                key={queue.key}
                label={c.queue[queue.key as keyof typeof c.queue]}
                pending={queue.pending}
                oldest={c.oldestWaiting.replace('{age}', queue.oldest)}
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
            <Card title={c.appAdoption} description={c.appAdoptionHint}>
              <p className="text-[26px] font-bold leading-[34px] tabular-nums">
                {CONSOLE_INSTALLED_PERCENT}%
              </p>
              <p className="text-[14px] leading-[20px] text-app-text-secondary">
                {c.appInstalled
                  .replace('{withApp}', count(CONSOLE_ADOPTION.suppliersWithApp))
                  .replace('{total}', count(CONSOLE_ADOPTION.totalSuppliers))}
              </p>
              <p className="text-[14px] leading-[20px] text-app-primary underline underline-offset-2">
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
            </Card>

            <Card title={c.contentHealth} description={c.contentHealthHint}>
              <p className="text-[26px] font-bold leading-[34px] tabular-nums">
                {CONSOLE_CONTENT.bannersLive}
              </p>
              <p className="text-[14px] leading-[20px] text-app-text-secondary">{c.bannersLive}</p>
              <p className="text-[14px] leading-[20px] text-app-warning underline decoration-app-border underline-offset-2">
                {c.contentArticlesWithGaps.replace('{count}', String(CONSOLE_CONTENT.articlesWithGaps))}
              </p>
              <p className="text-[14px] leading-[20px] text-app-text-secondary underline decoration-app-border underline-offset-2">
                {c.contentBannersExpired.replace('{count}', String(CONSOLE_CONTENT.bannersExpired))}
              </p>
            </Card>

            <Card title={c.alerts}>
              <ul className="flex flex-col gap-[8px]">
                {[c.alertOne, c.alertTwo].map((alert, i) => (
                  <li key={i} className="flex items-start gap-[8px]">
                    <TriangleAlert
                      className={cn(
                        'mt-[2px] size-[16px] shrink-0',
                        i === 0 ? 'text-app-warning' : 'text-app-info',
                      )}
                      strokeWidth={2}
                    />
                    <span className="text-[14px] leading-[20px] text-app-text">{alert}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Adoption trend */}
          <div className="rounded-[16px] border border-app-border bg-app-surface">
            <header className="border-b border-app-divider px-[16px] py-[12px]">
              <h2 className="text-[18px] font-semibold leading-[26px]">{c.adoptionTrend}</h2>
              <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">
                {c.adoptionTrendHint}
              </p>
            </header>
            <div className="px-[16px] py-[12px]">
              <AdoptionArea />
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <div className="rounded-[16px] border border-app-border bg-app-surface p-[16px]">
      <div className="flex items-baseline justify-between gap-[8px]">
        <p className="min-w-0 truncate text-[14px] font-medium leading-[20px] text-app-text-secondary">
          {label}
        </p>
        {breaching ? (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-app-error-muted px-[8px] py-[1px] text-[12px] font-semibold leading-[16px] text-app-error">
            {breaching}
          </span>
        ) : null}
      </div>
      <p className="mt-[4px] text-[26px] font-bold leading-[34px] tabular-nums">{pending}</p>
      <p className="mt-[2px] text-[12px] leading-[16px] text-app-text-secondary">{oldest}</p>
      <span className="mt-[8px] inline-flex items-center gap-[2px] text-[12px] leading-[16px] text-app-primary">
        {label} <ArrowRight className="size-[12px]" strokeWidth={2.2} />
      </span>
    </div>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col rounded-[16px] border border-app-border bg-app-surface">
      <header className="border-b border-app-divider px-[16px] py-[12px]">
        <h2 className="text-[18px] font-semibold leading-[26px]">{title}</h2>
        {description ? (
          <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">
            {description}
          </p>
        ) : null}
      </header>
      <div className="flex flex-1 flex-col gap-[4px] px-[16px] py-[12px]">{children}</div>
    </section>
  );
}

/** The twelve-month area chart, drawn the way Recharts renders it in-product. */
function AdoptionArea() {
  const w = 1140;
  const h = 170;
  const max = 80;
  const points = ADOPTION_SERIES.map((v, i) => {
    const x = (i / (ADOPTION_SERIES.length - 1)) * w;
    return [x, h - (v / max) * h] as const;
  });
  const path = points.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = arr[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }, '');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[170px] w-full" aria-hidden="true">
      <defs>
        <linearGradient id="console-adoption" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-app-primary)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="var(--color-app-primary)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1="0"
          x2={w}
          y1={h * f}
          y2={h * f}
          stroke="var(--color-app-divider)"
          strokeDasharray="3 3"
        />
      ))}
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#console-adoption)" />
      <path d={path} fill="none" stroke="var(--color-app-primary)" strokeWidth="2" />
    </svg>
  );
}
