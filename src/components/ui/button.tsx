import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * The solid variants carry a `btn-sheen` gradient (globals.css) that slides on
 * hover, and a focus ring of their own: a thick, offset ring in a colour that
 * contrasts with the surface the variant is meant for, since a conversion
 * button is the one control a keyboard user must never lose.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,background-position,border-color,color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-55 active:translate-y-px active:duration-75 focus-visible:outline-none',
  {
    variants: {
      variant: {
        primary:
          'btn-sheen btn-sheen--forest bg-forest-800 text-cream-50 shadow-lift hover:shadow-panel hover:-translate-y-0.5 focus-visible:shadow-[0_0_0_3px_var(--color-cream-50),0_0_0_6px_var(--color-leaf-600)]',
        leaf: 'btn-sheen btn-sheen--leaf bg-leaf-600 text-white shadow-lift hover:shadow-panel hover:-translate-y-0.5 focus-visible:shadow-[0_0_0_3px_var(--color-cream-50),0_0_0_6px_var(--color-forest-800)]',
        cream:
          'btn-sheen btn-sheen--cream bg-cream-50 text-forest-900 shadow-lift hover:shadow-[0_18px_40px_-14px_rgb(220_182_102/0.55)] hover:-translate-y-0.5 focus-visible:shadow-[0_0_0_3px_var(--color-forest-950),0_0_0_6px_var(--color-gold-400)]',
        outline:
          'border border-forest-800/25 bg-transparent text-forest-900 hover:border-forest-800/55 hover:bg-forest-800/[0.05] focus-visible:shadow-[0_0_0_3px_var(--color-cream-50),0_0_0_6px_var(--color-leaf-600)]',
        ghostLight:
          'border border-cream-50/30 bg-cream-50/[0.07] text-cream-50 backdrop-blur-sm hover:bg-cream-50/[0.15] hover:border-cream-50/55 focus-visible:shadow-[0_0_0_3px_var(--color-forest-950),0_0_0_6px_var(--color-gold-400)]',
        link: 'text-forest-700 underline-offset-4 hover:underline px-0 focus-visible:underline',
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
