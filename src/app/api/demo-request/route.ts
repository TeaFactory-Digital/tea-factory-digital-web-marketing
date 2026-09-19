import { NextResponse } from 'next/server';

/**
 * Demo request endpoint.
 *
 * It validates and records the request, and that is deliberately where it
 * stops: no mail provider, CRM or spreadsheet is wired up yet, because which
 * one to use is the operator's decision. The TODO below is the single place
 * to add it. Everything before it (shape, validation, error contract) is
 * already what a real destination would need.
 */

type Payload = {
  fullName?: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  suppliers?: string;
  factories?: string;
  interest?: string[];
  message?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  for (const field of ['fullName', 'company', 'role', 'phone'] as const) {
    if (!body[field]?.trim()) errors[field] = 'required';
  }
  if (!body.email?.trim()) errors.email = 'required';
  else if (!EMAIL.test(body.email.trim())) errors.email = 'email';
  if (!body.interest?.length) errors.interest = 'required';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: forward to the destination the operator chooses (email, CRM, sheet).
  console.info('[demo-request]', {
    at: new Date().toISOString(),
    company: body.company,
    email: body.email,
    interest: body.interest,
  });

  return NextResponse.json({ ok: true });
}
