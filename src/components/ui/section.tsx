import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './card';

type Tone = 'cream' | 'white' | 'forest' | 'ink';

const toneClass: Record<Tone, string> = {
  cream: 'bg-cream-50 text-char-800',
  white: 'bg-white text-char-800',
  forest: 'bg-forest-900 text-cream-100',
  ink: 'bg-forest-950 text-cream-100',
};

export function Section({
  id,
  tone = 'cream',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: Tone }) {
  return (
    <section
      id={id}
      className={cn('relative overflow-hidden py-20 md:py-28 lg:py-32', toneClass[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'dark',
  align = 'start',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: 'dark' | 'light';
  align?: 'start' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone === 'light' ? 'light' : 'dark'} className="mb-4">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          't-h2 font-semibold',
          tone === 'light' ? 'text-cream-50' : 'text-forest-900',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 text-lg',
            tone === 'light' ? 'text-cream-100/72' : 'text-char-500',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
