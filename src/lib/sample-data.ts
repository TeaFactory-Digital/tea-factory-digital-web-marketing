/**
 * Sample figures for the product mockups.
 *
 * Invented for illustration, and every surface that renders them is labelled as
 * sample data. They are internally consistent on purpose: the kilos sum to the
 * total, the total times the rate is the gross, the deductions subtract to the
 * balance, and the coins carried forward are the fraction the slip rounds off.
 * A factory accountant reads a mockup like an account.
 *
 * The deduction keys are the nine the app actually renders
 * (`bill.deductions.*` in the mobile string table), not a shortened set.
 */

export const KG_PER_MONTH = 1245;

/** The auction rate plus the factory's extra, exactly as the slip splits them. */
export const RATE_PER_KG = 105;
export const EXTRA_RATE_PER_KG = 7.35;
export const TOTAL_RATE_PER_KG = RATE_PER_KG + EXTRA_RATE_PER_KG; // 112.35
export const GROSS_AMOUNT = KG_PER_MONTH * TOTAL_RATE_PER_KG; // 139,875.75

export const DEDUCTIONS = [
  { key: 'transport', amount: 4980 },
  { key: 'tea', amount: 1250 },
  { key: 'savings', amount: 6225 },
  { key: 'loansAdvance', amount: 8000 },
  { key: 'advance', amount: 25000 },
  { key: 'manure', amount: 3400 },
  { key: 'otherCards', amount: 820 },
  { key: 'stamps', amount: 60 },
  { key: 'previousDebts', amount: 240 },
] as const;

export const TOTAL_DEDUCTIONS = DEDUCTIONS.reduce((sum, d) => sum + d.amount, 0); // 49,975
export const BALANCE_AMOUNT = GROSS_AMOUNT - TOTAL_DEDUCTIONS; // 89,900.75
/** The slip pays whole rupees and carries the coins into next month. */
export const COINS_CARRIED_FORWARD = 0.75;
export const FINAL_BALANCE = BALANCE_AMOUNT - COINS_CARRIED_FORWARD; // 89,900
export const SAVINGS_TO_DATE = 74300;

/** Day 1–31. `null` is a day with no delivery. Sums to KG_PER_MONTH. */
export const DAILY_SUPPLY: (number | null)[] = [
  48, 52, null, 48, 55, 44, null, 58, 47, 49,
  51, null, 57, 46, 60, null, 53, 55, 49, 48,
  null, 50, 57, 44, 59, null, 52, 61, 47, 55,
  null,
];

/** Twelve months of final balance, oldest first. */
export const INCOME_SERIES = [
  62400, 58900, 71200, 66800, 79400, 84100,
  76300, 81700, 88200, 83600, 91400, 89900,
];

/** Twelve months of app-request share, oldest first. Ends at the headline 72%. */
export const ADOPTION_SERIES = [11, 16, 22, 27, 31, 38, 44, 49, 55, 61, 67, 72];

/* ─────────────────────────── console sample data ─────────────────────────── */

export const CONSOLE_ADOPTION = {
  /** Suppliers who have signed in, against the roll. */
  suppliersWithApp: 412,
  totalSuppliers: 570,
  devicesRegistered: 486,
  /** Share of this month's requests raised in the app. */
  appRequestShare: 72,
} as const;

/** Installed share, rounded the way the console's `formatPercent` would. */
export const CONSOLE_INSTALLED_PERCENT = Math.round(
  (CONSOLE_ADOPTION.suppliersWithApp / CONSOLE_ADOPTION.totalSuppliers) * 100,
); // 72

export const CONSOLE_QUEUES = [
  { key: 'changeRequests', pending: 4, oldest: '6h', breaching: 0 },
  { key: 'advanceRequests', pending: 7, oldest: '2h', breaching: 2 },
  { key: 'loanRequests', pending: 3, oldest: '1d', breaching: 0 },
  { key: 'manureRequests', pending: 2, oldest: '4h', breaching: 0 },
  { key: 'teaPacketRequests', pending: 5, oldest: '3h', breaching: 0 },
  { key: 'inquiries', pending: 3, oldest: '1d 3h', breaching: 0 },
] as const;

export const CONSOLE_CONTENT = {
  bannersLive: 2,
  articlesWithGaps: 3,
  bannersExpired: 1,
} as const;

/** The three supporting tiles under the adoption headline. */
export const ANALYTICS_TILES = [
  { key: 'devices', value: CONSOLE_ADOPTION.devicesRegistered, suffix: '' },
  { key: 'activity', value: 63, suffix: '%' },
  { key: 'reach', value: 91, suffix: '%' },
] as const;

/** Rupees the way the slip prints them: grouped, two decimals. */
export function money(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Whole numbers: kilos, counts, device totals. */
export function count(value: number): string {
  return value.toLocaleString('en-US');
}
