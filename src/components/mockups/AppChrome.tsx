import * as React from 'react';
import { ChartLine, House, Newspaper, Settings, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { AppIcon } from './AppIcon';
import { StatusBar } from './PhoneFrame';

/**
 * The app's `AppHeader` (`src/navigation/AppHeader.tsx`) with the status bar
 * it sits under: white, 40px plus the inset, a hairline rule, and a 32px slot
 * either side of a centred title (iOS). A tab screen carries the drawer button
 * and the bell; a pushed screen carries a back chevron and an empty slot.
 */
export function AppHeader({
  title,
  variant = 'tab',
  unread = 0,
  signal,
}: {
  title: string;
  variant?: 'tab' | 'pushed';
  unread?: number;
  signal?: 'full' | 'weak';
}) {
  return (
    <div className="shrink-0 border-b-[0.5px] border-app-border bg-app-surface">
      <StatusBar className="text-app-text" signal={signal} />
      <div className="flex h-[40px] items-center px-[12px]">
        <span className="flex w-[32px] shrink-0 justify-start text-app-text">
          <AppIcon name={variant === 'tab' ? 'menu' : 'chevronLeft'} size={24} />
        </span>
        <p className="min-w-0 flex-1 truncate text-center text-[16px] font-semibold leading-[24px]">
          {title}
        </p>
        <span className="relative flex w-[32px] shrink-0 justify-end text-app-text">
          {variant === 'tab' ? (
            <span className="relative">
              <AppIcon name="bell" size={24} />
              {unread > 0 ? (
                <span className="absolute -right-[6px] -top-[4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-[8px] border-[1.5px] border-white bg-app-error px-[3px] text-[10px] font-bold leading-[13px] text-white tabular-nums">
                  {unread > 9 ? '9+' : unread}
                </span>
              ) : null}
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
}

/**
 * The tab bar on iOS: the app builds against the iOS 26 SDK, so the system
 * draws its floating Liquid Glass bar (`AppTabs.ios.tsx`). Four tabs, active
 * tint the brand primary, inactive the secondary text colour. The glass is
 * approximated with a translucent white fill, a backdrop blur and a bright rim.
 */
export function AppTabBar({ t, active = 0 }: { t: Dictionary; active?: number }) {
  const tabs: { label: string; icon: LucideIcon }[] = [
    { label: t.bill.tabs.home, icon: House },
    { label: t.bill.tabs.income, icon: ChartLine },
    { label: t.bill.tabs.news, icon: Newspaper },
    { label: t.bill.tabs.settings, icon: Settings },
  ];

  return (
    <div className="absolute inset-x-[20px] bottom-[22px] z-10 flex h-[62px] items-center rounded-full border border-white/70 bg-white/62 p-[4px] shadow-[0_8px_28px_rgb(11_31_28/0.16),inset_0_1px_0_rgb(255_255_255/0.9)] backdrop-blur-md backdrop-saturate-150">
      {tabs.map((tab, i) => (
        <span
          key={tab.label}
          className={
            'flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-[2px] rounded-full ' +
            (i === active ? 'bg-app-text/[0.07] text-app-primary' : 'text-app-text-secondary')
          }
        >
          <tab.icon className="size-[22px]" strokeWidth={2.1} />
          <span className="max-w-full truncate px-[4px] text-[10px] font-semibold leading-[12px]">
            {tab.label}
          </span>
        </span>
      ))}
    </div>
  );
}

/** The iPhone home indicator, over whatever the screen ends on. */
export function HomeIndicator() {
  return (
    <span className="absolute bottom-[8px] left-1/2 z-10 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-app-text" />
  );
}
