import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * The mark: a tea leaf with a midrib, cut by a horizontal break that reads as
 * a screen line: the leaf and the interface in one shape.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn('size-8', className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M22.8 8.2c0 7.2-4.2 12-9.6 12-1.3 0-2.5-.3-3.5-.8 0 0 .3-4.7 3.4-7.9 2.6-2.7 6.4-3.3 9.7-3.3Z"
        fill="var(--logo-leaf, #83bd6d)"
      />
      <path
        d="M22.4 8.6c-4.6 1.4-8.1 4.6-10.3 9.1-.7 1.5-1.2 3-1.5 4.4"
        stroke="var(--logo-vein, #04150e)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="8" y="23.4" width="16" height="1.9" rx="0.95" fill="var(--logo-bar, #c69b3f)" />
    </svg>
  );
}

export function Logo({
  className,
  tone = 'dark',
  showWord = true,
}: {
  className?: string;
  tone?: 'dark' | 'light';
  showWord?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={cn('size-9 shrink-0', tone === 'dark' ? 'text-forest-900' : 'text-cream-50')} />
      {showWord ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-[15px] font-semibold tracking-tight',
              tone === 'dark' ? 'text-forest-900' : 'text-cream-50',
            )}
          >
            Tea Factory
          </span>
          <span
            className={cn(
              'font-display text-[15px] font-semibold tracking-tight',
              tone === 'dark' ? 'text-leaf-600' : 'text-leaf-300',
            )}
          >
            Digital
          </span>
        </span>
      ) : null}
    </span>
  );
}
