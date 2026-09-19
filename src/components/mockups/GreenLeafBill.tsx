import * as React from 'react';
import { Leaf, Receipt } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import {
  EXTRA_RATE_PER_KG,
  FINAL_BALANCE,
  KG_PER_MONTH,
  RATE_PER_KG,
  TOTAL_RATE_PER_KG,
  count,
  money,
} from '@/lib/sample-data';
import { StatusBar } from './PhoneFrame';

/**
 * The supplier app's Home screen, reproduced from the shipped one.
 *
 * It follows `screens/home/HomeScreen.tsx` block for block: summary hero,
 * the PDF action, the bill masthead, then the Rate section, as much of the
 * screen as fits above the fold of a real handset. Sizes are the product's
 * own tokens (spacing 4/8/12/16/20, radius 10/16/24, the typography scale from
 * `theme/tokens/typography.ts`) at their real pixel values, because
 * `DeviceShot` scales the whole screen rather than each value.
 */
export function GreenLeafBill({
  t,
  signal = 'full',
}: {
  t: Dictionary;
  signal?: 'full' | 'weak';
}) {
  const b = t.bill;
  const perKg = (n: number) => `${b.currency} ${money(n)}${b.perKg}`;

  return (
    <div className="flex h-full flex-col bg-app-background text-app-text">
      <StatusBar className="text-app-text" signal={signal} />

      {/* Screen: paddingHorizontal lg(16), gap lg(16), paddingTop md(12) */}
      <div className="flex flex-col gap-[16px] px-[16px] pt-[12px]">
        {/* ── BillSummaryHero ─────────────────────────────────────────── */}
        <div className="rounded-[24px] bg-app-primary p-[20px] shadow-[0_6px_14px_rgb(0_0_0/0.15)]">
          <div className="flex items-center justify-between gap-[8px]">
            <span className="text-[11px] font-medium uppercase leading-[16px] tracking-[1px] text-white/85">
              {b.monthOverline}
            </span>
            <span className="rounded-full bg-white px-[10px] py-[4px] text-[12px] font-bold leading-[16px] text-app-primary">
              {b.paymentMethodValue}
            </span>
          </div>

          <p className="mt-[12px] text-[14px] leading-[20px] text-white/85">{b.finalBalance}</p>
          <p className="text-[40px] font-bold leading-[48px] tracking-[-0.5px] text-white tabular-nums">
            {b.currency} {money(FINAL_BALANCE)}
          </p>
          <p className="text-[12px] leading-[16px] text-white/85">{b.supplierCode}</p>

          <div className="mt-[16px] flex gap-[12px]">
            <StatTile label={b.totalKg} value={`${count(KG_PER_MONTH)} ${b.kg}`} />
            <StatTile label={b.totalRatePerKg} value={perKg(TOTAL_RATE_PER_KG)} />
          </div>
        </div>

        {/* ── Save as PDF (Button, variant="outline", fullWidth) ───────── */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="flex min-h-[48px] w-full items-center justify-center gap-[8px] rounded-[10px] border-[1.5px] border-app-primary px-[16px] py-[8px] text-[16px] font-semibold leading-[22px] tracking-[0.2px] text-app-primary"
        >
          <Receipt className="size-[20px]" strokeWidth={2} />
          {b.savePdf}
        </button>

        {/* ── BillHeader (Card, elevated) ──────────────────────────────── */}
        <div className="rounded-[16px] border border-app-border bg-app-surface p-[16px] shadow-[0_4px_12px_rgb(0_0_0/0.10)]">
          <div className="flex items-start gap-[12px]">
            <div className="min-w-0 flex-1">
              <p className="text-[22px] font-semibold leading-[30px]">{b.factoryName}</p>
              <p className="mt-[2px] text-[12px] leading-[16px] text-app-text-secondary">
                {b.factoryLocation}
              </p>
            </div>
            <Leaf className="size-[28px] shrink-0 text-app-primary" strokeWidth={1.8} />
          </div>

          <div className="mt-[8px] flex flex-wrap gap-[16px] text-[12px] leading-[16px] text-app-text-secondary">
            <span>
              {b.phoneLabel}: {b.factoryPhone}
            </span>
            <span>{b.factoryRegNo}</span>
          </div>

          <div className="my-[12px] h-px bg-app-divider" />

          <p className="text-[11px] font-medium uppercase leading-[16px] tracking-[1px] text-app-primary">
            {b.monthOverline}
          </p>
          <div className="mt-[4px]">
            <p className="text-[18px] font-semibold leading-[26px]">{b.supplierCode}</p>
            <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">
              {b.supplierName}
            </p>
          </div>

          <div className="mt-[8px] flex flex-wrap gap-[16px] text-[12px] leading-[16px] text-app-text-secondary">
            <span>
              {b.billNoLabel}: {b.billNo}
            </span>
            <span>
              {b.dateLabel}: {b.billDate}
            </span>
          </div>
        </div>

        {/* ── Rate section ─────────────────────────────────────────────── */}
        <Section title={b.rateSection}>
          <AmountRow label={b.totalKilograms} value={`${count(KG_PER_MONTH)} ${b.kg}`} />
          <AmountRow label={b.ratePerKg} value={perKg(RATE_PER_KG)} />
          <AmountRow label={b.extraRatePerKg} value={perKg(EXTRA_RATE_PER_KG)} />
          <AmountRow label={b.totalRatePerKg} value={perKg(TOTAL_RATE_PER_KG)} emphasized />
        </Section>

      </div>
    </div>
  );
}

/** A white tile inside the primary hero: caption over a bodyStrong value. */
function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-[10px] bg-app-surface p-[12px]">
      <p className="truncate text-[12px] leading-[16px] text-app-text-secondary">{label}</p>
      <p className="mt-[2px] truncate text-[16px] font-semibold leading-[24px] tabular-nums">
        {value}
      </p>
    </div>
  );
}

/** `SectionHeader` + `Card`: the wrapper every bill block uses. */
function Section({
  title,
  children,
  padding = 16,
}: {
  title: string;
  children: React.ReactNode;
  padding?: number;
}) {
  return (
    <div>
      <p className="mb-[8px] text-[11px] font-medium uppercase leading-[16px] tracking-[1px] text-app-text-secondary">
        {title}
      </p>
      <div
        className="rounded-[16px] border border-app-border bg-app-surface"
        style={{ padding }}
      >
        {children}
      </div>
    </div>
  );
}

/** `AmountRow`: label left, value right, a rule above a total. */
function AmountRow({
  label,
  value,
  emphasized = false,
  indent = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
  indent?: boolean;
}) {
  return (
    <div
      className={
        'flex items-start justify-between gap-[12px] py-[4px] ' +
        (indent ? 'pl-[12px] ' : '') +
        (emphasized ? 'mt-[4px] border-t border-app-divider' : '')
      }
    >
      <span
        className={
          'min-w-0 flex-1 ' +
          (emphasized
            ? 'text-[16px] font-semibold leading-[24px] text-app-text'
            : 'text-[14px] leading-[20px] text-app-text-secondary')
        }
      >
        {label}
      </span>
      <span
        className={
          'shrink-0 text-right tabular-nums text-app-text ' +
          (emphasized ? 'text-[16px] font-semibold leading-[24px]' : 'text-[14px] leading-[20px]')
        }
      >
        {value}
      </span>
    </div>
  );
}
