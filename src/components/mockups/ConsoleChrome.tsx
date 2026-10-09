import * as React from 'react';
import {
  BadgeDollarSign,
  Bell,
  ChevronsUpDown,
  ClipboardList,
  FileText,
  Gauge,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Newspaper,
  Package,
  Scale,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  Users,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/utils';
import { CONSOLE_ADOPTION, CONSOLE_INSTALLED_PERCENT, CONSOLE_QUEUES, count } from '@/lib/sample-data';
import { DeviceShot } from './DeviceShot';

/**
 * The console's own palette: `@tfd/brand`'s base light colours with Galaboda's primary
 * over them (`packages/brand/src/{colors,clients}`). The site's `--color-app-*` tokens are
 * the mobile app's, which are different greys, so every console screen resets them here.
 */
const CONSOLE_PALETTE = {
  '--color-app-primary': '#2e8b57',
  '--color-app-primary-muted': '#dceee2',
  '--color-app-background': '#f5f6f8',
  '--color-app-surface': '#ffffff',
  '--color-app-surface-variant': '#f2f4f7',
  '--color-app-text': '#0b0d12',
  '--color-app-text-secondary': '#667085',
  '--color-app-border': '#e7e9ee',
  '--color-app-divider': '#eef0f3',
  '--color-app-success': '#067647',
  '--color-app-warning': '#b54708',
  '--color-app-error': '#c01f14',
  '--color-app-info': '#175cd3',
  '--color-app-success-muted': '#e7f8ef',
  '--color-app-warning-muted': '#fef4e6',
  '--color-app-error-muted': '#feedec',
  '--color-app-info-muted': '#eaf3fe',
  '--color-app-table-header': '#fafbfc',
  '--color-app-row-alt': '#fcfcfd',
} as React.CSSProperties;

/**
 * The console's frame: the real `AppShell`, `Sidebar` and `Topbar`
 * (`apps/admin/src/layout/*`), shared by every console screen on this site.
 *
 * The console sets `html { font-size: 15px }`, so its numeric Tailwind sizes
 * run small (`w-64` is 240px, `h-14` 52.5px, `size-8` 30px); named tokens are
 * plain pixels. Both are written here as the pixels they resolve to.
 */
export function ConsoleFrame({
  width,
  height,
  className,
  chrome = true,
  children,
}: {
  width: number;
  height: number;
  className?: string;
  chrome?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-black/10 bg-app-surface shadow-panel sm:rounded-3xl',
        className,
      )}
      style={CONSOLE_PALETTE}
    >
      {chrome ? <BrowserChrome /> : null}
      <DeviceShot width={width} height={height}>
        {children}
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

export type ConsoleNavKey = 'dashboard' | 'inquiries' | 'deliveries' | 'configuration';

/** Unread supplier activity on the sample bell. */
const BELL_UNREAD = 3;

/**
 * Sidebar, topbar and the padded `main` every module screen renders into.
 *
 * `keepsRecords` is the factory-system sync switched **off**: the sidebar then carries the
 * *Factory records* section, exactly as `navigation.ts` shows it only in that mode.
 */
export function ConsoleShell({
  t,
  active,
  keepsRecords = false,
  children,
}: {
  t: Dictionary;
  active: ConsoleNavKey;
  keepsRecords?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full overflow-hidden bg-app-background text-app-text">
      <Sidebar t={t} active={active} keepsRecords={keepsRecords} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar t={t} active={active} />
        {/* main: px-gutter(30) pt-xs(4) pb-xxl(24); the screen inside is a column, gap-lg(16) */}
        <div className="flex min-h-0 flex-1 flex-col gap-[16px] px-[30px] pb-[24px] pt-[4px]">{children}</div>
      </div>
    </div>
  );
}

/** Pending counts on the sidebar, as `Sidebar.tsx` sums them. */
const pending = (key: (typeof CONSOLE_QUEUES)[number]['key']) =>
  CONSOLE_QUEUES.find((q) => q.key === key)?.pending ?? 0;

/** The label of the open screen, for the rows and the breadcrumb. */
function activeLabel(t: Dictionary, active: ConsoleNavKey): string {
  return t.console.nav[active];
}

/**
 * `Sidebar.tsx` as it ships: on the canvas, the factory's mark and name at the top as the
 * way home, sentence-case section titles, the open row lifted onto a white key with its
 * icon in the primary colour, the app-adoption meter and the signed-in user at the foot.
 */
function Sidebar({
  t,
  active,
  keepsRecords,
}: {
  t: Dictionary;
  active: ConsoleNavKey;
  keepsRecords: boolean;
}) {
  const c = t.console;

  const sections: {
    title: string;
    items: { key?: ConsoleNavKey; label: string; icon: LucideIcon; badge?: number }[];
  }[] = [
    {
      title: c.nav.sectionOverview,
      items: [
        { key: 'dashboard', label: c.nav.dashboard, icon: LayoutDashboard },
        { label: c.nav.suppliers, icon: Users },
      ],
    },
    {
      title: c.nav.sectionQueues,
      items: [
        { label: c.nav.changeRequests, icon: ClipboardList, badge: pending('changeRequests') },
        {
          label: c.nav.credit,
          icon: BadgeDollarSign,
          badge: pending('advanceRequests') + pending('loanRequests') + pending('manureRequests'),
        },
        { label: c.nav.teaPackets, icon: Package, badge: pending('teaPacketRequests') },
        { key: 'inquiries', label: c.nav.inquiries, icon: MessageSquare, badge: pending('inquiries') },
      ],
    },
    {
      title: c.nav.sectionSupport,
      items: [{ label: c.nav.bills, icon: FileText }],
    },
    // Only while the factory-system sync is off: the office keeps the records here.
    ...(keepsRecords
      ? [
          {
            title: c.nav.sectionRecords,
            items: [
              { key: 'deliveries' as const, label: c.nav.deliveries, icon: Scale },
              { label: c.nav.rates, icon: Gauge },
            ],
          },
        ]
      : []),
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
        { key: 'configuration', label: c.nav.configuration, icon: Settings },
        { label: c.nav.users, icon: UsersRound },
      ],
    },
  ];

  return (
    // w-64 (240) · px-md(12) py-lg(16) · gap-md(12), on the canvas with a rule to the right
    <nav className="flex w-[240px] shrink-0 flex-col gap-[12px] border-r border-app-border bg-app-background px-[12px] py-[16px]">
      <span className="flex shrink-0 items-center gap-[8px] rounded-[10px] p-[4px]">
        <ConsoleLogo className="size-[32px] shrink-0" />
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[14px] font-bold leading-[20px] tracking-tight">{t.bill.factoryName}</span>
          <span className="truncate text-[12px] leading-[16px] text-app-text-secondary">{t.bill.factoryLocation}</span>
        </span>
      </span>

      <div className="min-h-0 flex-1 overflow-hidden">
        {sections.map((section, s) => (
          <div key={section.title} className={s > 0 ? 'mt-[16px]' : undefined}>
            <p className="px-[8px] pb-[4px] text-[12px] font-medium leading-[16px] text-app-text-secondary">
              {section.title}
            </p>
            <ul className="flex flex-col gap-[2px]">
              {section.items.map((item) => {
                const on = item.key === active;
                return (
                  <li key={item.label}>
                    <span
                      className={cn(
                        'flex h-[33.75px] items-center gap-[8px] rounded-[10px] px-[8px] text-[14px] font-medium leading-[20px]',
                        on
                          ? 'bg-app-surface text-app-text shadow-[0_1px_2px_rgb(11_13_18/0.05)] ring-1 ring-app-border'
                          : 'text-app-text-secondary',
                      )}
                    >
                      <item.icon
                        className={cn('size-[16px] shrink-0', on ? 'text-app-primary' : 'text-app-text-secondary')}
                        strokeWidth={2}
                      />
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {item.badge ? (
                        <span className="inline-flex min-w-[22.5px] justify-center rounded-full bg-app-primary-muted px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-app-primary tabular-nums">
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

      {/* AdoptionMeter: the one figure the console is answerable for, on every screen. */}
      <div className="flex shrink-0 flex-col gap-[8px] rounded-[16px] border border-app-border bg-app-surface p-[12px] shadow-[0_1px_2px_rgb(11_13_18/0.05)]">
        <div className="flex items-baseline justify-between gap-[8px] text-[14px] font-medium leading-[20px]">
          <span className="font-semibold">{c.appAdoption}</span>
          <span className="tabular-nums text-app-text-secondary">{CONSOLE_INSTALLED_PERCENT}%</span>
        </div>
        <div className="h-[5.625px] w-full overflow-hidden rounded-full bg-app-primary/15">
          <div className="h-full rounded-full bg-app-primary" style={{ width: `${CONSOLE_INSTALLED_PERCENT}%` }} />
        </div>
        <span className="text-[12px] leading-[16px] text-app-text-secondary tabular-nums">
          {c.appInstalled
            .replace('{withApp}', count(CONSOLE_ADOPTION.suppliersWithApp))
            .replace('{total}', count(CONSOLE_ADOPTION.totalSuppliers))}
        </span>
      </div>

      {/* UserMenu, placement "sidebar": avatar, name, role, and the menu chevron. */}
      <span className="flex w-full min-w-0 items-center gap-[8px] rounded-[10px] p-[4px]">
        <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-linear-to-br from-app-primary to-[#8fc13f] text-[12px] font-semibold leading-[16px] text-white">
          {initials(c.user.name)}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[14px] font-semibold leading-[20px]">{c.user.name}</span>
          <span className="truncate text-[12px] leading-[16px] text-app-text-secondary">{c.user.role}</span>
        </span>
        <ChevronsUpDown className="size-[16px] shrink-0 text-app-text-secondary" strokeWidth={2} />
      </span>
    </nav>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '')).toUpperCase();
}

/**
 * `Topbar.tsx` as it ships: on the canvas with no rule under it, the breadcrumb
 * *factory · screen* on the left, then search and the notification bell on the right.
 * The signed-in user is at the foot of the sidebar on a desk-sized window.
 */
function Topbar({ t, active }: { t: Dictionary; active: ConsoleNavKey }) {
  const c = t.console;
  return (
    // h-16 (60) · px-gutter (30) · gap-md (12)
    <header className="flex h-[60px] shrink-0 items-center justify-between gap-[12px] px-[30px]">
      <p className="flex min-w-0 items-center gap-[4px] text-[14px] font-medium leading-[20px] text-app-text-secondary">
        <span className="truncate">{t.bill.factoryName}</span>
        <span aria-hidden="true">·</span>
        <span className="truncate text-app-text">{activeLabel(t, active)}</span>
      </p>
      <div className="flex items-center gap-[8px]">
        {/* CommandMenu trigger: h-9 w-64, Ctrl K searches suppliers and pages. */}
        <span className="flex h-[33.75px] w-[240px] items-center gap-[8px] rounded-[10px] border border-app-border bg-app-surface px-[8px] text-[14px] leading-[20px] text-app-text-secondary shadow-[0_1px_2px_rgb(11_13_18/0.05)]">
          <Search className="size-[16px] shrink-0" strokeWidth={2} />
          <span className="flex-1">{c.search}</span>
          <kbd className="rounded-[6px] border border-app-border px-[4px] font-sans text-[12px] leading-[16px]">Ctrl K</kbd>
        </span>
        {/* NotificationBell: the waiting queues and the suppliers' recent activity. */}
        <span className="relative flex size-[33.75px] items-center justify-center rounded-[10px] border border-app-border bg-app-surface text-app-text-secondary shadow-[0_1px_2px_rgb(11_13_18/0.05)]">
          <Bell className="size-[16px]" strokeWidth={2} />
          <span className="absolute -right-[4px] -top-[4px] flex h-[18.75px] min-w-[18.75px] items-center justify-center rounded-full bg-app-error px-[2px] text-[12px] font-semibold leading-[16px] text-white tabular-nums">
            {BELL_UNREAD}
          </span>
        </span>
      </div>
    </header>
  );
}

/**
 * The bundled default mark (`apps/admin/public/brand/logo.svg`): two tea leaves
 * over a cup, artwork in literal colours rather than themed ones.
 */
export function ConsoleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="3 4 122 104" className={className} aria-hidden="true">
      <g fill="none" stroke="#6C9B52" strokeWidth="7" strokeLinecap="round">
        <path d="M108 66c14-5 20 15 3 24" />
        <ellipse cx="80" cy="57" rx="31" ry="10.5" />
        <path d="M49 57c0 25 14 46 31 46s31-21 31-46" />
      </g>
      <g fill="#AECB4F">
        <path d="M65 7c19 22 14 58-20 84C30 62 39 26 65 7Z" />
        <path d="M6 61c17-12 38-4 51 25C41 82 20 76 6 61Z" />
      </g>
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
        <path d="M47 85C47 59 50 33 63 14" strokeWidth="3.5" />
        <path d="M52 81C40 74 25 68 14 63" strokeWidth="3" />
      </g>
    </svg>
  );
}

/** A card title with the console's "i" tip beside it (`InfoTip`, 30px, round). */
export function TitleWithTip({ title }: { title: string }) {
  return (
    <span className="inline-flex items-center gap-[2px]">
      {title}
      <span className="grid size-[30px] place-items-center rounded-full text-app-text-secondary">
        <InfoGlyph />
      </span>
    </span>
  );
}

function InfoGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

/**
 * `Card` / `CardHeader` / `CardBody` from `components/ui/Card.tsx`, as they ship today: no
 * rule under the header (the title's weight separates it), a 16px subtitle-size title, a
 * hairline `shadow-card`, and a body that drops its top padding under a header. Titles are
 * not heading elements here: this site styles every heading in its display face, and the
 * console sets them in the system one.
 */
export function ConsoleCard({
  title,
  description,
  actions,
  className,
  bodyClassName,
  children,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'flex flex-col rounded-[16px] border border-app-border bg-app-surface shadow-[0_1px_2px_rgb(11_31_28/0.05)]',
        className,
      )}
    >
      {title ? (
        <header className="flex items-start justify-between gap-[12px] px-[16px] pb-[12px] pt-[16px]">
          <div className="min-w-0">
            <p className="text-[16px] font-semibold leading-[24px] tracking-tight">{title}</p>
            {description ? (
              <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-[8px]">{actions}</div> : null}
        </header>
      ) : null}
      <div className={cn(title ? 'px-[16px] pb-[16px]' : 'p-[16px]', bodyClassName)}>{children}</div>
    </section>
  );
}

/** `PageHeader`: an `h1` in the h2 size (26/34) set semibold and tight, the description 4px under it. */
export function ConsolePageHeader({
  title,
  description,
  actions,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-[12px]">
      <div className="min-w-0">
        <p className="text-[26px] font-semibold leading-[34px] tracking-tight">{title}</p>
        {description ? (
          <p className="mt-[4px] text-[14px] leading-[20px] text-app-text-secondary">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-[8px]">{actions}</div> : null}
    </div>
  );
}
