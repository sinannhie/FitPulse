/* ═══════════════════════════════════════════════════
   lib/utils.ts — FitPulse shared utilities
═══════════════════════════════════════════════════ */

import { clsx, type ClassValue } from 'clsx';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Return integer percentage, clamped 0–100 */
export function pct(current: number, goal: number): number {
  if (goal === 0) return 0;
  return Math.min(100, Math.max(0, Math.round((current / goal) * 100)));
}

/** Format seconds → "MM:SS" */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Format seconds → "Xh Ym" for longer durations */
export function formatDurationLong(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

/** Compact number: 1750 → "1.75k" above 9999 */
export function compactNum(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

/** Day labels for charts */
export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

/** Returns today's day label */
export function todayLabel(): string {
  return DAYS_SHORT[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
}

/** Clamp a number between min and max */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}
