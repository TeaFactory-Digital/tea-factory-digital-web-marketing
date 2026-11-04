/**
 * Real-world impact figures for the proof strip.
 *
 * **Empty on purpose.** This site never invents adoption, volume or customer
 * figures (see the README), so until a pilot factory reports numbers the strip
 * shows fixed facts about the platform instead. Add an entry here only from a
 * figure someone can stand behind, with the month it was true for; the strip
 * switches over on its own and prints that month under the numbers.
 *
 * Labels are copy and live in each dictionary under `proof.impact`.
 */
export type ImpactMetric = {
  key: 'leafKilos' | 'approvalHours' | 'factories';
  value: number;
  /** Printed straight after the number, e.g. `+` for a floor rather than an exact count. */
  suffix?: string;
};

export const IMPACT_METRICS: ImpactMetric[] = [];

/** The month the figures above were true for, as `YYYY-MM`. Required once there are any. */
export const IMPACT_AS_OF: string | null = null;
