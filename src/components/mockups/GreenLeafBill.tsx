import * as React from 'react';
import type { Dictionary } from '@/i18n';
import {
  EXTRA_RATE_PER_KG,
  FINAL_BALANCE,
  KG_PER_MONTH,
  RATE_PER_KG,
  TOTAL_RATE_PER_KG,
  kilos,
  money,
} from '@/lib/sample-data';
import { AppIcon } from './AppIcon';
import { AppHeader, AppTabBar, HomeIndicator } from './AppChrome';
import { TeaBreeze } from './TeaBreeze';

/** A client palette, for the white-label comparison. Defaults to Galaboda. */
export type AppBrand = { primary: string; muted: string };

/**
 * The supplier app's Home screen, reproduced from the shipped one.
 *
 * It follows `screens/home/HomeScreen.tsx` block for block, under the
 * `AppHeader` and above the floating tab bar: the summary hero with its
 * TeaBreeze scene, the PDF action, the bill masthead, then the Rate section, as
 * much of the screen as fits above the fold of a real handset. Sizes are the
 * product's own tokens (spacing 4/8/12/16/20, radius 10/16/24, the typography
 * scale from `theme/tokens/typography.ts`) at their real pixel values, because
 * `DeviceShot` scales the whole screen rather than each value.
 *
 * `brand` swaps the client palette by overriding the two CSS variables the
 * screen's primary colours resolve to, which is how the app does it too: a
 * brand is a config row, not a second screen.
 */
export function GreenLeafBill({
  t,
  signal = 'full',
  brand,
  factoryName,
}: {
  t: Dictionary;
  signal?: 'full' | 'weak';
  brand?: AppBrand;
  factoryName?: string;
}) {
  const b = t.bill;
  const perKg = (n: number) => `${b.currency} ${money(n)}${b.perKg}`;
  const kg = `${kilos(KG_PER_MONTH)} ${b.kg}`;
  const palette = brand
    ? ({
        '--color-app-primary': brand.primary,
        '--color-app-primary-muted': brand.muted,
      } as React.CSSProperties)
    : undefined;

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden bg-app-background text-app-text"
      style={palette}
    >
      <AppHeader title={b.appTitle} unread={2} signal={signal} />

      {/* Screen: paddingHorizontal lg(16), gap lg(16), paddingTop md(12) */}
      <div className="flex flex-col gap-[16px] px-[16px] pt-[12px]">
        {/* ── BillSummaryHero, with the breeze behind it ──────────────── */}
        <div className="relative rounded-[24px] bg-app-primary p-[20px] shadow-[0_6px_14px_rgb(0_0_0/0.15)]">
          <TeaBreeze />
          <div className="relative">
            <div className="flex items-center justify-between gap-[8px]">
              <span className="text-[11px] font-medium leading-[16px] tracking-[1px] text-white/85">
                {b.monthLabel}
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
              <StatTile label={b.totalKg} value={kg} />
              <StatTile label={b.totalRatePerKg} value={perKg(TOTAL_RATE_PER_KG)} />
            </div>
          </div>
        </div>

        {/* ── Save as PDF (Button, variant="outline", fullWidth) ───────── */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="flex min-h-[48px] w-full items-center justify-center gap-[8px] rounded-[10px] border-[1.5px] border-app-primary px-[16px] py-[8px] text-[16px] font-semibold leading-[22px] tracking-[0.2px] text-app-primary"
        >
          <AppIcon name="receipt" size={20} />
          {b.savePdf}
        </button>

        {/* ── BillHeader (Card, elevated) ──────────────────────────────── */}
        <div className="rounded-[16px] border border-app-border bg-app-surface p-[16px] shadow-[0_4px_12px_rgb(0_0_0/0.10)]">
          <div className="flex items-start gap-[12px]">
            <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
              <p className="text-[22px] font-semibold leading-[30px]">
                {factoryName ?? b.factoryName}
              </p>
              <p className="text-[12px] leading-[16px] text-app-text-secondary">
                {b.factoryLocation}
              </p>
            </div>
            <AppIcon name="leaf" size={32} className="shrink-0 text-app-primary" />
          </div>

          <div className="mt-[8px] flex flex-wrap gap-[16px] text-[12px] leading-[16px] text-app-text-secondary">
            <span>
              {b.phoneLabel}: {b.factoryPhone}
            </span>
            <span>{b.factoryRegNo}</span>
          </div>

          <div className="my-[12px] h-[0.5px] bg-app-divider" />

          <p className="text-[11px] font-medium leading-[16px] tracking-[1px] text-app-primary">
            {b.monthLabel}
          </p>
          <div className="mt-[4px] flex flex-col gap-[2px]">
            <p className="text-[18px] font-semibold leading-[26px]">{b.supplierCode}</p>
            <p className="text-[14px] leading-[20px] text-app-text-secondary">{b.supplierName}</p>
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
          <AmountRow label={b.totalKilograms} value={kg} />
          <AmountRow label={b.ratePerKg} value={perKg(RATE_PER_KG)} />
          <AmountRow label={b.extraRatePerKg} value={perKg(EXTRA_RATE_PER_KG)} />
          <AmountRow label={b.totalRatePerKg} value={perKg(TOTAL_RATE_PER_KG)} emphasized />
        </Section>
      </div>

      <AppTabBar t={t} />
      <HomeIndicator />
    </div>
  );
}

/** A white tile inside the primary hero: caption over a bodyStrong value. */
function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-[10px] bg-app-surface p-[12px]">
      <p className="text-[12px] leading-[16px] text-app-text-secondary">{label}</p>
      <p className="mt-[2px] text-[16px] font-semibold leading-[24px] tabular-nums">
        {value}
      </p>
    </div>
  );
}

/**
 * `BillSection`: a `SectionHeader` (the one place the app uppercases, with
 * its own 8px margin) over a `Card`, in a column with an 8px gap, so the
 * header sits 16px above the card.
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="mb-[8px] text-[11px] font-medium uppercase leading-[16px] tracking-[1px] text-app-text-secondary">
        {title}
      </p>
      <div className="rounded-[16px] border border-app-border bg-app-surface p-[16px]">
        {children}
      </div>
    </div>
  );
}

/** `AmountRow`: label left, value right, a hairline above a total. */
function AmountRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={
        'flex items-start justify-between gap-[12px] py-[4px] ' +
        (emphasized ? 'mt-[4px] border-t-[0.5px] border-app-divider' : '')
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
