import * as React from 'react';
import {
  BadgeDollarSign,
  Bell,
  ChevronDown,
  ClipboardList,
  FileText,
  Gauge,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Newspaper,
  Package,
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
import { CONSOLE_QUEUES } from '@/lib/sample-data';
import { DeviceShot } from './DeviceShot';

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

export type ConsoleNavKey = 'dashboard' | 'inquiries';

/** Sidebar, topbar and the padded `main` every module screen renders into. */
export function ConsoleShell({
  t,
  active,
  children,
}: {
  t: Dictionary;
  active: ConsoleNavKey;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full overflow-hidden bg-app-background text-app-text">
      <Sidebar t={t} active={active} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar t={t} />
        {/* main: px-gutter(30) py-lg(16); content gap-lg(16) */}
        <div className="flex min-h-0 flex-1 flex-col gap-[16px] px-[30px] py-[16px]">{children}</div>
      </div>
    </div>
  );
}

/** Pending counts on the sidebar, as `Sidebar.tsx` sums them. */
const pending = (key: (typeof CONSOLE_QUEUES)[number]['key']) =>
  CONSOLE_QUEUES.find((q) => q.key === key)?.pending ?? 0;

function Sidebar({ t, active }: { t: Dictionary; active: ConsoleNavKey }) {
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
    <nav className="flex w-[240px] shrink-0 flex-col border-r border-app-border bg-app-surface">
      {/* Header: the topbar's height, so the two bottom rules line up. */}
      <div className="flex h-[52.5px] shrink-0 items-center border-b border-app-border px-[8px]">
        <span className="flex min-w-0 items-center gap-[8px] px-[8px] py-[4px]">
          <ConsoleLogo className="size-[32px] shrink-0" />
          <span className="truncate text-[14px] font-semibold leading-[20px]">
            {t.bill.factoryName}
          </span>
        </span>
      </div>

      <div className="flex-1 overflow-hidden px-[8px] py-[12px]">
        {sections.map((section, s) => (
          <div
            key={section.title}
            className={s > 0 ? 'mt-[12px] border-t border-app-divider pt-[12px]' : undefined}
          >
            <p className="px-[8px] pb-[4px] text-[11px] font-medium uppercase leading-[16px] tracking-[0.05em] text-app-text-secondary">
              {section.title}
            </p>
            <ul className="flex flex-col gap-[2px]">
              {section.items.map((item) => {
                const on = item.key === active;
                return (
                  <li key={item.label}>
                    <span
                      className={cn(
                        'flex items-center gap-[8px] rounded-[10px] p-[4px] text-[14px] leading-[20px]',
                        on
                          ? 'bg-app-primary font-semibold text-white shadow-[0_1px_3px_rgb(0_0_0/0.1),0_1px_2px_-1px_rgb(0_0_0/0.1)]'
                          : 'text-app-text',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-[30px] shrink-0 place-items-center rounded-[10px]',
                          on ? 'bg-white/15 text-white' : 'bg-app-surface-variant text-app-text-secondary',
                        )}
                      >
                        <item.icon className="size-[16px]" strokeWidth={2} />
                      </span>
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
    </nav>
  );
}

function Topbar({ t }: { t: Dictionary }) {
  const c = t.console;
  return (
    <header className="flex h-[52.5px] shrink-0 items-center justify-between gap-[12px] border-b border-app-border bg-app-surface px-[16px]">
      <p className="min-w-0 truncate text-[14px] font-semibold leading-[20px]">{t.bill.factoryName}</p>
      <div className="flex items-center gap-[12px]">
        {/* CommandMenu trigger: Ctrl+K searches suppliers and pages. */}
        <span className="flex items-center gap-[8px] rounded-[10px] border border-app-border bg-app-surface-variant px-[12px] py-[4px] text-[14px] leading-[20px] text-app-text-secondary">
          <Search className="size-[16px]" strokeWidth={2} />
          {c.search}
          <kbd className="rounded-[6px] border border-app-border bg-app-surface px-[4px] font-sans text-[12px] leading-[16px]">
            Ctrl K
          </kbd>
        </span>
        {/* User menu: a ghost button. The role line is the raw role id, untranslated. */}
        <span className="flex h-[33.75px] items-center gap-[4px] rounded-[10px] px-[12px]">
          <span className="flex flex-col items-start">
            <span className="text-[14px] font-medium leading-[20px]">{c.user.name}</span>
            <span className="text-[12px] leading-[16px] text-app-text-secondary">{c.user.role}</span>
          </span>
          <ChevronDown className="size-[16px] text-app-text-secondary" strokeWidth={2} />
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
 * `Card` / `CardHeader` / `CardBody` from `components/ui/Card.tsx`. Titles are
 * not heading elements here: this site styles every heading in its display
 * face, and the console sets them in the system one.
 */
export function ConsoleCard({
  title,
  description,
  className,
  bodyClassName,
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn('flex flex-col rounded-[16px] border border-app-border bg-app-surface', className)}>
      <header className="border-b border-app-divider px-[16px] py-[12px]">
        <p className="text-[18px] font-semibold leading-[26px]">{title}</p>
        {description ? (
          <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">{description}</p>
        ) : null}
      </header>
      <div className={cn('px-[16px] py-[12px]', bodyClassName)}>{children}</div>
    </section>
  );
}
