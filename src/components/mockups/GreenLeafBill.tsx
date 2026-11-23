import * as React from 'react';
import type { Dictionary } from '@/i18n';
import {
  CHANGE,
  EXTRA_RATE_PER_KG,
  FINAL_BALANCE,
  GROSS_AMOUNT,
  SIX_MONTH_AVERAGE,
  SIX_MONTH_KGS,
  TOTAL_DEDUCTIONS,
  WHY,
  KG_PER_MONTH,
  MTD_APPROVED,
  MTD_DAILY_SUPPLY,
  MTD_KG,
  MTD_SUPPLY_DAYS,
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
 * `AppHeader` and above the floating tab bar: when the figures were fetched, the
 * summary hero with its TeaBreeze scene, the change against last month with why it
 * changed, "Your bill, explained" (closed), the last six months, the PDF action, the
 * bill masthead, then the Rate section, as much of the screen as fits above the fold
 * of a real handset (matched 24 November 2026). Sizes are the
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
  monthToDate = false,
}: {
  t: Dictionary;
  signal?: 'full' | 'weak';
  brand?: AppBrand;
  factoryName?: string;
  /** The factory has `enableMonthToDate` on: "This month so far" sits above the bill. */
  monthToDate?: boolean;
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
        {/* UpdatedAgo: caption, textSecondary */}
        <p className="text-[12px] leading-[16px] text-app-text-secondary">{b.updated}</p>
        {monthToDate ? <MonthToDateCard t={t} /> : null}

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

        <ChangeCard t={t} />
        <ExplainCard t={t} />
        <SixMonthsCard t={t} />

        {/* ── Share or save PDF (Button, variant="outline", fullWidth) ──── */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="flex min-h-[48px] w-full items-center justify-center gap-[8px] rounded-[10px] border-[1.5px] border-app-primary px-[16px] py-[8px] text-[16px] font-semibold leading-[22px] tracking-[0.2px] text-app-primary"
        >
          <AppIcon name="share" size={20} />
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

/**
 * `MonthToDateCard`: a section over a card, for the month after the bill below (August,
 * under July's bill). The month as an overline, the kilos in `h1`, the days in `bodySmall`,
 * a 56px `BarChart` strip with no axis, the approvals as `AmountRow`s, the note in `caption`.
 */
function MonthToDateCard({ t }: { t: Dictionary }) {
  const b = t.bill;
  const m = b.monthToDate;
  const rupees = (n: number) => `${b.currency} ${money(n)}`;
  return (
    <Section title={m.title}>
      <p className="text-[11px] font-medium leading-[16px] tracking-[1px] text-app-text-secondary">
        {m.monthLabel}
      </p>
      <p className="mt-[4px] text-[32px] font-bold leading-[40px] tracking-[-0.3px] tabular-nums">
        {MTD_KG.toFixed(1)} {b.kg}
      </p>
      <p className="text-[14px] leading-[20px] text-app-text-secondary">
        {m.days.replace('{n}', String(MTD_SUPPLY_DAYS))} · {m.lastSupply.replace('{date}', m.lastDate)}
      </p>
      <div className="mt-[12px]">
        <DailyStrip />
      </div>
      <div className="mt-[12px]">
        <p className="mb-[4px] text-[12px] leading-[16px] text-app-text-secondary">{m.approved}</p>
        <AmountRow label={m.advance} value={rupees(MTD_APPROVED.advance)} />
        <AmountRow label={m.teaPackets} value={rupees(MTD_APPROVED.teaPackets)} />
      </div>
      <p className="mt-[12px] text-[12px] leading-[16px] text-app-text-secondary">{m.note}</p>
    </Section>
  );
}

/**
 * The app's `BarChart` with `height={56}` and `showYAxis={false}`: a 4px gutter, a 1px
 * baseline, bars at 60% of their slot, scaled to `axisTicks`' tidy top (100 for a 56 kg
 * day). The card's inner width is 384 - 2x16 - 2x16 = 320px.
 */
function DailyStrip() {
  const width = 320;
  const height = 56;
  const gutter = 4;
  const topPad = 10;
  const chartHeight = height - 6 - topPad;
  const top = 100;
  const slot = (width - gutter) / MTD_DAILY_SUPPLY.length;
  const barWidth = Math.max(2, slot * 0.6);
  return (
    <svg width={width} height={height} aria-hidden="true" className="block">
      <line
        x1={gutter}
        x2={width}
        y1={topPad + chartHeight}
        y2={topPad + chartHeight}
        stroke="var(--color-app-divider)"
        strokeWidth={1}
      />
      {MTD_DAILY_SUPPLY.map((kg, i) => {
        const h = kg ? (kg / top) * chartHeight : 0;
        return h > 0 ? (
          <rect
            key={i}
            x={gutter + i * slot + (slot - barWidth) / 2}
            y={topPad + chartHeight - h}
            width={barWidth}
            height={h}
            rx={2}
            fill="var(--color-app-primary)"
          />
        ) : null;
      })}
    </svg>
  );
}

/** `Card padding="md"`: 12px, radius 16, the app's border. */
function SmallCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[16px] border border-app-border bg-app-surface p-[12px]">{children}</div>;
}

/**
 * `BillChangeCard`: the month against the one before, each figure with a chevron, then
 * "Why it changed" in words, largest first (`explainChange`).
 */
function ChangeCard({ t }: { t: Dictionary }) {
  const b = t.bill;
  const rupees = (n: number) => `${b.currency} ${money(Math.abs(n))}`;
  const rows = [
    { label: b.change.totalKgs, delta: CHANGE.kgs, text: `${kilos(Math.abs(CHANGE.kgs))} ${b.kg}` },
    { label: b.change.gross, delta: CHANGE.gross, text: rupees(CHANGE.gross) },
    { label: b.change.final, delta: CHANGE.paid, text: rupees(CHANGE.paid) },
  ];
  const words = (kind: string) =>
    kind === 'kgs'
      ? b.why.kgs.replace('{{kgs}}', `${kilos(Math.abs(CHANGE.kgs))} ${b.kg}`)
      : kind === 'rate'
        ? b.why.rate.replace('{{rate}}', `${b.currency} ${money(1.5)}`)
        : b.why.deductions.replace('{{line}}', b.deductions.advance);
  return (
    <SmallCard>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] leading-[16px] text-app-text-secondary">{b.change.title}</p>
        {rows.map((row) => {
          const up = row.delta > 0;
          return (
            <div key={row.label} className="flex items-center justify-between gap-[8px]">
              <span className="min-w-0 shrink text-[14px] leading-[20px] text-app-text-secondary">{row.label}</span>
              <span className={'flex shrink-0 items-center gap-[2px] whitespace-nowrap text-[16px] font-semibold leading-[24px] tabular-nums ' + (up ? 'text-app-success' : 'text-app-error')}>
                <AppIcon name="chevronDown" size={16} className={up ? 'rotate-180' : ''} />
                {(up ? '+' : '-') + row.text}
              </span>
            </div>
          );
        })}
        <div className="mt-[4px] flex flex-col gap-[4px] border-t border-app-divider pt-[8px]">
          <p className="text-[12px] leading-[16px] text-app-text-secondary">{b.why.title}</p>
          {WHY.map((reason) => (
            <div key={reason.kind} className="flex items-start justify-between gap-[8px]">
              <span className="min-w-0 shrink text-[14px] leading-[20px]">{words(reason.kind)}</span>
              <span className={'shrink-0 whitespace-nowrap text-[14px] leading-[20px] tabular-nums ' + (reason.effect > 0 ? 'text-app-success' : 'text-app-error')}>
                {(reason.effect > 0 ? '+' : '-') + rupees(reason.effect)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SmallCard>
  );
}

/** `BillExplainCard`, closed: the title and what was paid in the header, the one-line story under it. */
function ExplainCard({ t }: { t: Dictionary }) {
  const b = t.bill;
  const rupees = (n: number) => `${b.currency} ${money(n)}`;
  return (
    <SmallCard>
      <div className="flex min-h-[48px] items-center gap-[12px] py-[12px]">
        <span className="min-w-0 flex-1 text-[16px] font-semibold leading-[24px]">{b.explain.title}</span>
        <span className="shrink text-right text-[14px] leading-[20px] text-app-text-secondary tabular-nums">{rupees(FINAL_BALANCE)}</span>
        <AppIcon name="chevronRight" size={24} className="shrink-0 text-app-text-secondary" />
      </div>
      <p className="text-[14px] leading-[20px] text-app-text-secondary">
        {b.explain.short
          .replace('{{gross}}', rupees(GROSS_AMOUNT))
          .replace('{{off}}', rupees(TOTAL_DEDUCTIONS))
          .replace('{{paid}}', rupees(FINAL_BALANCE))}
      </p>
    </SmallCard>
  );
}

/**
 * `SixMonthsCard`: the title, the Kilos/Earnings switch on Kilos, the app's `BarChart` at
 * 150px with a label under every bar, the average, and "See every month". The card's inner
 * width is 384 - 2x16 - 2x12 = 328px.
 */
function SixMonthsCard({ t }: { t: Dictionary }) {
  const b = t.bill;
  const s = b.sixMonths;
  const width = 328;
  const height = 150;
  const axis = 34;
  const labels = 18;
  const top = 1500;
  const chart = height - labels - 10;
  const slot = (width - axis) / SIX_MONTH_KGS.length;
  const bar = slot * 0.6;
  return (
    <SmallCard>
      <div className="flex flex-col gap-[12px]">
        <p className="text-[16px] font-medium leading-[24px]">{s.title}</p>
        <div className="flex rounded-[10px] bg-app-surface-variant p-[4px]">
          <span className="flex-1 rounded-[6px] bg-app-surface py-[8px] text-center text-[14px] font-medium leading-[20px] text-app-primary shadow-[0_1px_3px_rgb(0_0_0/0.12)]">{s.kgs}</span>
          <span className="flex-1 py-[8px] text-center text-[14px] font-medium leading-[20px] text-app-text-secondary">{s.earned}</span>
        </div>
        <svg width={width} height={height} aria-hidden="true" className="block">
          {[0, 500, 1000, 1500].map((v) => {
            const y = 10 + chart - (v / top) * chart;
            return (
              <g key={v}>
                <line x1={axis} x2={width} y1={y} y2={y} stroke="var(--color-app-divider)" strokeWidth={1} />
                <text x={axis - 6} y={y + 3} textAnchor="end" fontSize={10} fill="var(--color-app-text-secondary)">
                  {v === 0 ? '0' : v >= 1000 ? `${v / 1000}k` : v}
                </text>
              </g>
            );
          })}
          {SIX_MONTH_KGS.map((kg, i) => {
            const h = (kg / top) * chart;
            const x = axis + i * slot + (slot - bar) / 2;
            return (
              <g key={i}>
                <rect x={x} y={10 + chart - h} width={bar} height={h} rx={2} fill="var(--color-app-primary)" />
                <text x={x + bar / 2} y={height - 3} textAnchor="middle" fontSize={10} fill="var(--color-app-text-secondary)">
                  {s.months[i]}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-[14px] leading-[20px] text-app-text-secondary">
          {s.average.replace('{{value}}', `${kilos(SIX_MONTH_AVERAGE)} ${b.kg}`)}
        </p>
        <p className="py-[6px] text-center text-[14px] font-semibold leading-[20px] text-app-primary">{s.seeAll}</p>
      </div>
    </SmallCard>
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
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
export function AmountRow({
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
