'use client';

import * as React from 'react';
import { ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Button } from '@/components/ui/button';
import { FieldError, Input, Label, Optional, Textarea } from '@/components/ui/field';
import { motion } from '@/components/ui/motion';
import { cn } from '@/lib/utils';

type Errors = Partial<Record<string, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The demo request.
 *
 * Interest is multi-select rather than single: a factory evaluating the app
 * usually wants the console walked through as well, and the copy asks for "at
 * least one". Validation runs in the browser and again on the server, because
 * the browser's copy is a convenience and the server's is the real one.
 */
export function DemoForm({ t }: { t: Dictionary }) {
  const f = t.demo.form;
  const [interest, setInterest] = React.useState<string[]>([]);
  const [errors, setErrors] = React.useState<Errors>({});
  const [state, setState] = React.useState<'idle' | 'sending' | 'done'>('idle');

  const options = [
    { key: 'app', label: f.interestOptions.app },
    { key: 'console', label: f.interestOptions.console },
    { key: 'whiteLabel', label: f.interestOptions.whiteLabel },
    { key: 'integration', label: f.interestOptions.integration },
    { key: 'complete', label: f.interestOptions.complete },
  ];

  function toggle(key: string) {
    setInterest((current) =>
      current.includes(key) ? current.filter((k) => k !== key) : [...current, key],
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries()) as Record<string, string>;

    const next: Errors = {};
    for (const field of ['fullName', 'company', 'role', 'phone'] as const) {
      if (!values[field]?.trim()) next[field] = t.demo.validation.required;
    }
    if (!values.email?.trim()) next.email = t.demo.validation.required;
    else if (!EMAIL.test(values.email.trim())) next.email = t.demo.validation.email;
    if (interest.length === 0) next.interest = t.demo.validation.interest;

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setState('sending');
    try {
      await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, interest }),
      });
    } catch {
      // The submission is recorded best-effort; the confirmation below is the
      // same either way so a network blip does not lose the person's context.
    }
    setState('done');
  }

  if (state === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-4xl border border-leaf-300 bg-white p-9 text-center shadow-lift md:p-12"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-leaf-100 text-leaf-700">
          <CheckCircle2 className="size-7" strokeWidth={2} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold text-forest-900">
          {t.demo.success.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-char-500">
          {t.demo.success.body}
        </p>
        <Button
          variant="outline"
          className="mt-7"
          onClick={() => {
            setInterest([]);
            setErrors({});
            setState('idle');
          }}
        >
          {t.demo.success.again}
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-4xl border border-cream-300/70 bg-white p-7 shadow-lift md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label={f.fullName} error={errors.fullName} required>
          <Input id="fullName" name="fullName" autoComplete="name" aria-invalid={!!errors.fullName} />
        </Field>

        <Field id="company" label={f.company} error={errors.company} required>
          <Input id="company" name="company" autoComplete="organization" aria-invalid={!!errors.company} />
        </Field>

        <Field id="role" label={f.role} error={errors.role} required>
          <Input id="role" name="role" autoComplete="organization-title" aria-invalid={!!errors.role} />
        </Field>

        <Field id="email" label={f.email} error={errors.email} required>
          <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} />
        </Field>

        <Field id="phone" label={f.phone} error={errors.phone} required>
          <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} />
        </Field>

        <div className="grid grid-cols-2 gap-5">
          <Field id="suppliers" label={f.suppliers} optional={f.optional}>
            <Input id="suppliers" name="suppliers" inputMode="numeric" />
          </Field>
          <Field id="factories" label={f.factories} optional={f.optional}>
            <Input id="factories" name="factories" inputMode="numeric" />
          </Field>
        </div>
      </div>

      {/* ---- Interest ---- */}
      <fieldset className="mt-7">
        <legend className="mb-3 font-display text-sm font-semibold text-char-800">
          {f.interest}
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {options.map((option) => {
            const active = interest.includes(option.key);
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => toggle(option.key)}
                aria-pressed={active}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200',
                  active
                    ? 'border-leaf-600 bg-leaf-100/70 text-forest-900'
                    : 'border-cream-300 bg-cream-50 text-char-600 hover:border-char-300',
                )}
              >
                <span
                  className={cn(
                    'grid size-4 place-items-center rounded-full border transition-colors',
                    active ? 'border-leaf-600 bg-leaf-600' : 'border-char-300',
                  )}
                >
                  {active ? <span className="size-1.5 rounded-full bg-white" /> : null}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
        <FieldError>{errors.interest}</FieldError>
      </fieldset>

      {/* ---- Message ---- */}
      <div className="mt-7">
        <Label htmlFor="message">
          {f.message}
          <Optional>{f.optional}</Optional>
        </Label>
        <Textarea id="message" name="message" placeholder={f.messagePlaceholder} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-char-400">
          <Clock3 className="size-4 shrink-0" strokeWidth={2} />
          {t.demo.aside.duration}
        </p>
        <Button type="submit" size="lg" disabled={state === 'sending'} className="group">
          {state === 'sending' ? f.submitting : f.submit}
          {state === 'sending' ? null : (
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" strokeWidth={2.4} />
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="ms-1 text-leaf-600">*</span> : null}
        {optional ? <Optional>{optional}</Optional> : null}
      </Label>
      {children}
      <FieldError>{error}</FieldError>
    </div>
  );
}

