'use client';

import { useState }                                 from 'react';
import { motion }                                   from 'framer-motion';
import { GlassCard, GlassPillNav }                  from '@/components';
import { LayoutContainer, LayoutSection }           from '@/components';
import { AppShell }                                 from '@/components';
import { DAYS_SHORT }                               from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   PROGRESS PAGE
   Skills: Emil (motion) · Paul (polish) · Leon (taste)
   ───────────────────────────────────────────────────
   Sections:
     1  Range toggle (GlassPillNav) — Week/Month/Year
     2  Weight trend card (SVG line chart)
     3  Stats row — 3 organic numbers
     4  Workout frequency bar chart
═══════════════════════════════════════════════════ */

// ── Data ─────────────────────────────────────────
// Leon: organic numbers, not 99.99%
const WEIGHT_DATA = {
  Week:  [74.1, 73.8, 73.6, 73.9, 73.4, 73.2, 72.9],
  Month: [76.2, 75.4, 74.8, 74.1, 73.6, 73.1, 72.9, 72.6],
  Year:  [82.0, 80.1, 78.4, 76.9, 75.5, 74.2, 73.1, 72.9],
} as const;

const FREQ_DATA = [4, 3, 5, 4, 6, 3, 4]; // workouts logged per day this week
const MAX_FREQ  = 7;

const STATS = [
  { label: 'Lost this month',  value: '3.1',  unit: 'kg'       },
  { label: 'Workouts done',    value: '23',   unit: 'sessions'  },
  { label: 'Avg daily kcal',   value: '2,148', unit: 'kcal'    },
] as const;

type Range = 'Week' | 'Month' | 'Year';
const RANGES: Range[] = ['Week', 'Month', 'Year'];

// ── SVG line chart ────────────────────────────────
function LineChart({ data, range }: { data: number[]; range: Range }) {
  const W = 280, H = 90;
  const pad = { t: 8, b: 4, l: 4, r: 4 };
  const min = Math.min(...data) - 0.5;
  const max = Math.max(...data) + 0.5;

  const xs = data.map((_, i) =>
    pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r)
  );
  const ys = data.map(v =>
    pad.t + ((max - v) / (max - min)) * (H - pad.t - pad.b)
  );

  const line  = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  const area  = `${line} L${xs[xs.length-1]},${H} L${xs[0]},${H} Z`;
  const lastX = xs[xs.length - 1];
  const lastY = ys[ys.length - 1];

  return (
    <svg
      width="100%" height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6A5CFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6A5CFF" stopOpacity="0"    />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#6A5CFF" />
          <stop offset="100%" stopColor="#B26BFF" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path d={area} fill="url(#chartGrad)" />
      {/* Line — Emil: animate pathLength on range change via key */}
      <motion.path
        key={range}
        d={line}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      />
      {/* Latest point */}
      <circle
        cx={lastX} cy={lastY} r="4" fill="#B26BFF"
        style={{ filter: 'drop-shadow(0 0 4px rgba(178,107,255,0.6))' }}
      />
    </svg>
  );
}

// ── Bar chart (workout frequency) ─────────────────
function FreqBars() {
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <div className="flex items-end justify-between gap-2 h-16">
      {FREQ_DATA.map((val, i) => {
        const h       = Math.max(8, (val / MAX_FREQ) * 52);
        const day     = DAYS_SHORT[i];
        const isToday = i === todayIdx;

        return (
          <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex items-end" style={{ height: 52 }}>
              <motion.div
                className="w-full rounded-[5px]"
                // Emil: stagger 40ms, scaleY from bottom (originY:1), ease-out
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: [0.23, 1, 0.32, 1],
                }}
                style={{
                  originY: 1,
                  height: h,
                  background: isToday
                    ? 'linear-gradient(180deg, #6A5CFF, #B26BFF)'
                    : 'rgba(255,255,255,0.10)',
                }}
              />
            </div>
            <span
              className="text-[10px] font-medium"
              style={{ color: isToday ? 'var(--purple-1)' : 'var(--text-muted)' }}
            >
              {day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Page ─────────────────────────────────────────
export default function ProgressPage() {
  const [rangeIdx, setRangeIdx] = useState(0);
  const range    = RANGES[rangeIdx];
  const data     = WEIGHT_DATA[range];
  const current  = data[data.length - 1];
  const previous = data[0];
  const delta    = (current - previous).toFixed(1);
  const lost     = parseFloat(delta) < 0;

  // X-axis labels
  const xLabels = range === 'Week'
    ? Array.from(DAYS_SHORT)
    : data.map((_, i) => `W${i + 1}`);

  return (
    <AppShell>
      <LayoutContainer maxWidth="mobile">

        {/* ── Header ──────────────────────────── */}
        <LayoutSection gap={false}>
          <div className="pt-6 pb-5 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--text-muted)] mb-1">
                Progress
              </p>
              <h1 className="text-[26px] font-bold text-[var(--text-primary)]">
                Your Trends
              </h1>
            </div>
            {/* Paul: GlassPillNav = range toggle, no dropdown */}
            <GlassPillNav
              items={RANGES}
              defaultIndex={0}
              size="sm"
              onChange={(i) => setRangeIdx(i)}
            />
          </div>
        </LayoutSection>

        {/* ── 1. Weight trend ─────────────────── */}
        <LayoutSection>
          <GlassCard variant="strong" padding="lg" animationDelay={0.05}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-1">
                  Weight
                </p>
                <div className="flex items-baseline gap-2">
                  {/* Emil: animate value on range change via key */}
                  <motion.span
                    key={range}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="text-[36px] font-bold leading-none text-[var(--text-primary)]"
                  >
                    {current}
                  </motion.span>
                  <span className="text-[14px] text-[var(--text-muted)]">kg</span>
                </div>
              </div>

              {/* Delta badge — green for loss, red for gain */}
              <div
                className="px-3 py-1 rounded-pill text-[12px] font-semibold"
                style={{
                  background:   lost ? 'rgba(34,197,94,0.12)'  : 'rgba(239,68,68,0.12)',
                  border: `1px solid ${lost ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                  color:        lost ? '#22c55e'                : '#ef4444',
                }}
              >
                {lost ? '' : '+'}{delta} kg
              </div>
            </div>

            {/* Line chart — key forces remount on range change */}
            <div className="mb-3">
              <LineChart data={[...data]} range={range} />
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between">
              {xLabels.map(l => (
                <span key={l} className="text-[10px] text-[var(--text-muted)]">{l}</span>
              ))}
            </div>
          </GlassCard>
        </LayoutSection>

        {/* ── 2. Stats row ─────────────────────── */}
        {/* Paul: no identical card grid — asymmetric layout */}
        <LayoutSection title="This Month">
          <GlassCard padding="md" animationDelay={0.10}>
            <div className="flex divide-x divide-[var(--glass-border)]">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.12 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  className="flex-1 px-3 first:pl-0 last:pr-0 text-center"
                >
                  <p className="text-[20px] font-bold text-[var(--text-primary)] leading-tight">
                    {s.value}
                  </p>
                  <p className="text-[9px] text-[var(--text-muted)] mt-1 leading-tight">
                    {s.unit}
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 leading-tight">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </LayoutSection>

        {/* ── 3. Workout frequency ─────────────── */}
        <LayoutSection title="Workout Frequency">
          <GlassCard padding="md" animationDelay={0.15}>
            <FreqBars />
          </GlassCard>
        </LayoutSection>

        {/* Bottom breathing room */}
        <div style={{ height: 'calc(40px + env(safe-area-inset-bottom))' }} />

      </LayoutContainer>
    </AppShell>
  );
}
