import * as React from 'react';
import { cn } from '@/lib/utils';
import { DeviceShot } from './DeviceShot';

/** The product's screen size. Everything inside is written at these pixels. */
export const PHONE_SCREEN = { width: 384, height: 832 } as const;

/**
 * A device shell around a product screen.
 *
 * The frame has no aspect ratio of its own: its height comes from the screen
 * inside it, which `DeviceShot` locks to the real handset ratio. So the shell
 * can be dropped into any column width and still hold a faithful screen.
 */
export function PhoneFrame({
  children,
  className,
  tone = 'dark',
  shadow = true,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'dark' | 'light';
  shadow?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative w-full rounded-[2.6rem] p-[3px]',
        tone === 'dark'
          ? 'bg-gradient-to-b from-char-700 via-char-900 to-char-800'
          : 'bg-gradient-to-b from-cream-300 via-cream-200 to-cream-300',
        shadow && 'shadow-device',
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-[2.45rem]',
          tone === 'dark' ? 'bg-char-900' : 'bg-white',
        )}
      >
        <div className="overflow-hidden rounded-[2.3rem] bg-app-background">
          <DeviceShot width={PHONE_SCREEN.width} height={PHONE_SCREEN.height}>
            {children}
          </DeviceShot>
        </div>
        {/* Pill cutout, sized against the device rather than in fixed pixels. */}
        <div className="pointer-events-none absolute left-1/2 top-[1.1%] z-20 h-[2.1%] w-[20%] -translate-x-1/2 rounded-full bg-char-900" />
      </div>
    </div>
  );
}

/** The OS status bar above every app screen, at true size. */
export function StatusBar({
  className,
  signal = 'full',
}: {
  className?: string;
  signal?: 'full' | 'weak';
}) {
  return (
    <div
      className={cn(
        'flex h-[32px] shrink-0 items-center justify-between px-[20px] pt-[6px] text-[12px] font-semibold',
        className,
      )}
    >
      <span className="tabular-nums">9:41</span>
      <div className="flex items-center gap-[5px]">
        <svg viewBox="0 0 15 10" className="h-[10px] w-[15px]" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={i * 4}
              y={9 - (i + 1) * 2.2}
              width="2.6"
              height={(i + 1) * 2.2}
              rx="0.8"
              fill="currentColor"
              opacity={signal === 'weak' && i > 0 ? 0.22 : 1}
            />
          ))}
        </svg>
        <svg viewBox="0 0 20 10" className="h-[10px] w-[20px]" aria-hidden="true">
          <rect x="0.5" y="0.5" width="16" height="9" rx="2.6" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="11" height="6" rx="1.5" fill="currentColor" />
          <path d="M18 3.4v3.2a1.8 1.8 0 0 0 0-3.2Z" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
