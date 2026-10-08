import { NextResponse } from 'next/server';

/**
 * Demo request endpoint.
 *
 * Validates the request and emails it to the company inbox through Resend
 * (https://resend.com). Three settings, all server-side:
 *
 *   RESEND_API_KEY      the Resend API key. Without it nothing is sent and the
 *                       form is told so, rather than thanking someone whose
 *                       request went nowhere.
 *   DEMO_REQUEST_TO     the inbox that receives requests. Comma-separated for
 *                       more than one.
 *   DEMO_REQUEST_FROM   the sender. Until the company domain is verified in
 *                       Resend this must stay `onboarding@resend.dev`, and Resend
 *                       then only delivers to the address the Resend account was
 *                       created with.
 *
 * The email's Reply-To is the person who asked, so "Reply" answers them.
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
  /** Hidden from people; a bot that fills every field fills this one too. */
  website?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DEFAULT_FROM = 'Tea Factory Digital <onboarding@resend.dev>';

const INTEREST_LABELS: Record<string, string> = {
  app: 'Supplier App',
  console: 'Office Console',
  whiteLabel: 'White-Label',
  integration: 'Integration',
  complete: 'Complete Platform',
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  // A bot: answer as if it worked, so it has no reason to try again.
  if (body.website?.trim()) return NextResponse.json({ ok: true });

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.DEMO_REQUEST_TO ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);
  if (!apiKey || to.length === 0) {
    console.error('[demo-request] not sent: RESEND_API_KEY or DEMO_REQUEST_TO is not set');
    return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }

  const rows: Array<[string, string]> = [
    ['Name', body.fullName!.trim()],
    ['Company / factory', body.company!.trim()],
    ['Role', body.role!.trim()],
    ['Email', body.email!.trim()],
    ['Phone', body.phone!.trim()],
    ['Suppliers', body.suppliers?.trim() || '-'],
    ['Factories', body.factories?.trim() || '-'],
    ['Interested in', body.interest!.map((key) => INTEREST_LABELS[key] ?? key).join(', ')],
    ['Message', body.message?.trim() || '-'],
  ];

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.DEMO_REQUEST_FROM || DEFAULT_FROM,
      to,
      reply_to: body.email!.trim(),
      subject: `Demo request: ${body.company!.trim()}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: emailHtml(rows),
    }),
  }).catch((error: unknown) => {
    console.error('[demo-request] Resend unreachable', error);
    return null;
  });

  if (!response?.ok) {
    if (response) {
      console.error('[demo-request] Resend refused', response.status, await response.text());
    }
    return NextResponse.json({ ok: false, error: 'send-failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`).replace(/\n/g, '<br>');

function emailHtml(rows: Array<[string, string]>) {
  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;vertical-align:top;white-space:nowrap">${escape(label)}</td>` +
        `<td style="padding:6px 0;color:#1f2a24">${escape(value)}</td></tr>`,
    )
    .join('');
  return (
    `<div style="font-family:Arial,sans-serif;font-size:14px">` +
    `<h2 style="color:#1f4d36;margin:0 0 12px">New demo request</h2>` +
    `<table style="border-collapse:collapse">${cells}</table>` +
    `<p style="color:#6b6b6b;margin-top:16px">Reply to this email to answer them directly.</p></div>`
  );
}
