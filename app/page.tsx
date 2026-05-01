'use client';

import {
  GlassCard,
  GlassButton,
  CircularProgressRing,
  LayoutContainer,
  LayoutSection,
  AppShell,
} from '@/components';
import { pct } from '@/lib/utils';

// ── Static data (replace with real data layer later) ──
const CALORIES = { current: 1750, goal: 2400 };
const MACROS = [
  { label: 'Protein', current: 125, goal: 180, color: '#6A5CFF' },
  { label: 'Carbs',   current: 160, goal: 250, color: '#B26BFF' },
  { label: 'Fat',     current: 55,  goal: 70,  color: '#8C7CFF' },
];
const WORKOUT = {
  name:     'Push Day',
  subtitle: '6 exercises · 50 min',
  tags:     ['Chest', 'Shoulders', 'Triceps'],
};

const calorieProgress = Math.round((CALORIES.current / CALORIES.goal) * 100);

export default function DashboardPage() {
  return (
    <AppShell>
      <LayoutContainer maxWidth="mobile">

        {/* ── 1. GREETING ───────────────────────────────
            Paul /typeset: clear hierarchy — date muted,
            name prominent, progress context below.
            Emil: no animation on text (keyboard-adjacent).
        ─────────────────────────────────────────────── */}
        <LayoutSection gap={false}>
          <div className="pt-6 pb-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--text-muted)] mb-1">
              Friday, May 1
            </p>
            <h1 className="text-[26px] font-bold leading-tight text-[var(--text-primary)]">
              Good morning, Sinan
            </h1>
            <p className="text-[13px] text-[var(--text-secondary)] mt-1">
              Today · {CALORIES.current.toLocaleString()} kcal tracked
            </p>
          </div>
        </LayoutSection>

        {/* ── 2. MAIN HERO — Calorie Ring ───────────────
            One main focus. variant="strong" = elevated.
            Macro bars inside — no separate grid section.
            Paul: no nested cards, macro bars not cards.
            Leon: DESIGN_VARIANCE=8, asymmetric layout.
        ─────────────────────────────────────────────── */}
        <LayoutSection>
          <GlassCard variant="strong" padding="lg" animationDelay={0.05}>

            {/* Ring + macro bars side by side */}
            <div className="flex items-center gap-8">

              {/* Calorie ring — primary focus */}
              <div className="shrink-0">
                <CircularProgressRing
                  progress={calorieProgress}
                  size={124}
                  strokeWidth={7}
                  value={CALORIES.current.toLocaleString()}
                  unit="kcal"
                  colorStart="#6A5CFF"
                  colorEnd="#B26BFF"
                  delay={0.15}
                />
                <p className="text-[11px] text-center text-[var(--text-muted)] mt-2">
                  of {CALORIES.goal.toLocaleString()} goal
                </p>
              </div>

              {/* Macro bars — secondary info */}
              <div className="flex-1 flex flex-col gap-[14px]">
                {MACROS.map((m, i) => {
                  const p = pct(m.current, m.goal);
                  return (
                    <div key={m.label}>
                      <div className="flex justify-between items-baseline mb-[6px]">
                        <span className="text-[12px] font-medium text-[var(--text-secondary)]">
                          {m.label}
                        </span>
                        <span className="text-[13px] font-bold text-[var(--text-primary)]">
                          {m.current}
                          <span className="text-[11px] font-normal text-[var(--text-muted)] ml-0.5">
                            /{m.goal}g
                          </span>
                        </span>
                      </div>
                      {/* Emil: transition only width, ease-out, no transition:all */}
                      <div className="h-[6px] rounded-full track overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${p}%`,
                            background: `linear-gradient(90deg, #6A5CFF, ${m.color})`,
                            // Emil: CSS transition, ease-out, exact property
                            transition: `width 900ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </LayoutSection>

        {/* ── 3. TODAY'S WORKOUT ────────────────────────
            interactive=true → hover + tap feedback.
            Paul: no heavy animation, slight press only.
            Leon: no emoji — using text icon substitute.
        ─────────────────────────────────────────────── */}
        <LayoutSection>
          <GlassCard
            variant="purple"
            padding="md"
            interactive
            animationDelay={0.10}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-1">
                  Today's Workout
                </p>
                <h2 className="text-[18px] font-bold text-[var(--text-primary)] leading-tight">
                  {WORKOUT.name}
                </h2>
                <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                  {WORKOUT.subtitle}
                </p>
              </div>
              {/* Paul: no emoji — simple visual accent */}
              <div
                className="w-10 h-10 rounded-[12px] shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(106,92,255,0.20)', border: '1px solid rgba(106,92,255,0.30)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B26BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 6.5h11M6.5 17.5h11M12 6.5v11"/>
                  <circle cx="6.5" cy="6.5" r="2.5"/>
                  <circle cx="17.5" cy="6.5" r="2.5"/>
                  <circle cx="6.5" cy="17.5" r="2.5"/>
                  <circle cx="17.5" cy="17.5" r="2.5"/>
                </svg>
              </div>
            </div>

            {/* Muscle group tags */}
            <div className="flex gap-2 flex-wrap">
              {WORKOUT.tags.map(tag => (
                <span
                  key={tag}
                  className="chip text-[11px] font-medium px-3 py-1 text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </LayoutSection>

        {/* ── 4. CTA ────────────────────────────────────
            Paul: label above creates breathing room.
            One primary action, nothing competing.
        ─────────────────────────────────────────────── */}
        <LayoutSection>
          <div style={{ paddingBottom: 'calc(40px + env(safe-area-inset-bottom))' }}>
            <p className="text-[11px] font-medium text-center text-[var(--text-muted)] mb-3 tracking-wide">
              Ready to train?
            </p>
            <GlassButton variant="primary" size="lg" fullWidth>
              Start Workout
            </GlassButton>
          </div>
        </LayoutSection>

      </LayoutContainer>
    </AppShell>
  );
}
