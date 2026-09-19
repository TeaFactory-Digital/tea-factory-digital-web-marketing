import * as React from 'react';
import { cn } from '@/lib/utils';

const control =
  'w-full rounded-2xl border border-char-300/55 bg-white px-4 py-3.5 text-[0.95rem] text-char-900 placeholder:text-char-400 shadow-[0_1px_2px_rgb(4_21_14/0.04)] transition-colors outline-none focus:border-leaf-600 focus:ring-4 focus:ring-leaf-600/12 aria-[invalid=true]:border-red-500/70 aria-[invalid=true]:focus:ring-red-500/12';

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('mb-2 block font-display text-sm font-semibold text-char-800', className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, 'min-h-32 resize-y', className)} {...props} />;
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm text-red-700">
      {children}
    </p>
  );
}

export function Optional({ children }: { children: React.ReactNode }) {
  return <span className="ml-1.5 font-sans text-xs font-normal text-char-400">({children})</span>;
}
