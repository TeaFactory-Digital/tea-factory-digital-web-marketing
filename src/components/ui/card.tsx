import * as React from 'react';
import { cn } from '@/lib/utils';

/** The light surface used on cream sections. */
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-cream-300/70 bg-white p-7 shadow-lift transition-[transform,box-shadow,border-color] duration-300 ease-out',
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({
  className,
  tone = 'dark',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { tone?: 'dark' | 'light' | 'gold' }) {
  return (
    <p
      className={cn(
        't-eyebrow',
        tone === 'dark' && 'text-leaf-700',
        tone === 'light' && 'text-leaf-300',
        tone === 'gold' && 'text-gold-500',
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  tone = 'leaf',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: 'leaf' | 'gold' | 'neutral' | 'light' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-xs font-semibold',
        tone === 'leaf' && 'bg-leaf-100 text-leaf-700',
        tone === 'gold' && 'bg-gold-200/60 text-gold-600',
        tone === 'neutral' && 'bg-cream-200 text-char-700',
        tone === 'light' && 'bg-cream-50/10 text-cream-100 ring-1 ring-cream-50/15',
        className,
      )}
      {...props}
    />
  );
}
