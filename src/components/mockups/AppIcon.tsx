import * as React from 'react';

/**
 * The supplier app's own icon set, path for path from
 * `src/components/icons/Icon.tsx` in the mobile repo: a 24×24 box, stroke 2,
 * round caps and joins, no fill. The app does not use Lucide, so neither do
 * the mockups of it.
 */
const PATHS = {
  receipt: ['M6 2h12v20l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 22z', 'M9 8h6', 'M9 12h6'],
  leaf: ['M4 20C4 12 10 5 20 4c0 10-7 16-15 16Z', 'M5 19c4-6 8-9 13-11'],
  info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v5', 'M12 8h.01'],
  message: ['M4 5h16v11H8l-4 4z'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  bell: ['M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z', 'M10 20a2 2 0 0 0 4 0'],
  chevronLeft: ['m15 6-6 6 6 6'],
  send: ['M22 2 11 13', 'M22 2 15 22 11 13 2 9 22 2Z'],
} as const;

export type AppIconName = keyof typeof PATHS;

export function AppIcon({
  name,
  size,
  className,
}: {
  name: AppIconName;
  size: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/**
 * The supplier's chosen cartoon face (`components/ui/Avatar.tsx`, face 0):
 * pastel ground, short hair, the same shapes the app draws.
 */
export function AppAvatar({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="#DCEEE2" />
      <rect x="42" y="70" width="16" height="16" rx="6" fill="#F2C79C" />
      <circle cx="50" cy="52" r="28" fill="#F2C79C" />
      <circle cx="23" cy="54" r="5" fill="#F2C79C" />
      <circle cx="77" cy="54" r="5" fill="#F2C79C" />
      <path d="M22 48 Q26 20 50 20 Q74 20 78 48 Q66 36 50 36 Q34 36 22 48 Z" fill="#3A2A1A" />
      <circle cx="40" cy="52" r="3.2" fill="#2B2B2B" />
      <circle cx="60" cy="52" r="3.2" fill="#2B2B2B" />
      <path d="M40 63 Q50 73 60 63" stroke="#B4634A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <ellipse cx="34" cy="60" rx="4" ry="2.6" fill="#F2A79A" opacity="0.5" />
      <ellipse cx="66" cy="60" rx="4" ry="2.6" fill="#F2A79A" opacity="0.5" />
    </svg>
  );
}
