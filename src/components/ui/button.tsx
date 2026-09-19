import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-55 active:translate-y-px',
  {
    variants: {
      variant: {
        primary:
          'bg-forest-800 text-cream-50 shadow-lift hover:bg-forest-700 hover:shadow-panel hover:-translate-y-0.5',
        leaf: 'bg-leaf-600 text-white shadow-lift hover:bg-leaf-700 hover:-translate-y-0.5',
        cream:
          'bg-cream-50 text-forest-900 shadow-lift hover:bg-white hover:-translate-y-0.5',
        outline:
          'border border-forest-800/20 bg-transparent text-forest-900 hover:border-forest-800/45 hover:bg-forest-800/[0.04]',
        ghostLight:
          'border border-cream-50/25 bg-cream-50/[0.06] text-cream-50 backdrop-blur-sm hover:bg-cream-50/[0.14] hover:border-cream-50/40',
        link: 'text-forest-700 underline-offset-4 hover:underline px-0',
      },
      size: {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-6 text-[0.95rem]',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
