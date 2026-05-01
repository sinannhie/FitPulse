'use client';

import { useState }                                       from 'react';
import { motion, AnimatePresence }                        from 'framer-motion';
import { GlassCard, GlassButton, GlassPillNav }          from '@/components';
import { LayoutContainer, LayoutSection }                 from '@/components';
import { AppShell }                                       from '@/components';
import { pct }                                            from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   NUTRITION PAGE
   Skills: Emil (motion) · Paul (polish) · Leon (taste)
   ───────────────────────────────────────────────────
   Sections:
     1  Calorie summary bar (hero)
     2  Macro breakdown (3 bars, no grid of cards)
     3  Meal log list
     4  Add Meal CTA
═══════════════════════════════════════════════════ */

// ── Data ────────────────────────────────────────
const GOALS = { calories: 2400, protein: 180, carbs: 250, fat: 70 };

const MACROS = [
  { label: 'Protein', current: 125, goal: GOALS.protein, color: '#6A5CFF' },
  { label: 'Carbs',   current: 160, goal: GOALS.carbs,   color: '#B26BFF' },
  { label: 'Fat',     current: 55,  goal: GOALS.fat,     color: '#8C7CFF' },
] as const;

const MEALS = [
  { id: 1, time: '07:30', name: 'Oats + Banana',      kcal: 420, protein: 14 },
  { id: 2, time: '10:00', name: 'Greek Yogurt',        kcal: 180, protein: 18 },
  { id: 3, time: '13:15', name: 'Chicken Rice Bowl',   kcal: 610, protein: 47 },
  { id: 4, time: '16:30', name: 'Protein Shake',       kcal: 220, protein: 32 },
  { id: 5, time: '19:45', name: 'Salmon + Veg',        kcal: 520, protein: 42 },
] as const;

const TOTAL_KCAL = MEALS.reduce((s, m) => s + m.kcal, 0);
const REMAINING  = GOALS.calories - TOTAL_KCAL;

// ── Macro bar row ────────────────────────────────
function MacroBar({
  label, current, goal, color, delay,
}: { label: string; current: number; goal: number; color: string; delay: number }) {
  const p = pct(current, goal);
  return (
    <div>
      <div className="flex justify-between items-baseline mb-[6px]">
        <span className="text-[12px] font-medium text-[var(--text-secondary)]">{label}</span>
        <span className="text-[13px] font-bold text-[var(--text-primary)]">
          {current}
          <span className="text-[11px] font-normal text-[var(--text-muted)] ml-0.5">/{goal}g</span>
        </span>
      </div>
      <div className="h-[6px] rounded-full track overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${p}%`,
            background: `linear-gradient(90deg, #6A5CFF, ${color})`,
            // Emil: exact prop, ease-out, stagger via delay
            transition: `width 900ms cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

// ── Meal row ─────────────────────────────────────
function MealRow({ meal, delay }: { meal: typeof MEALS[number]; delay: number }) {
  return (
    <motion.div
      // Emil: fade-up, ease-out, stagger 50ms
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-3 py-3 border-b border-[var(--glass-border)] last:border-0"
    >
      <span className="text-[11px] font-medium text-[var(--text-muted)] w-10 shrink-0 tabular-nums">
        {meal.time}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[var(--text-primary)] truncate">{meal.name}</p>
        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{meal.protein}g protein</p>
      </div>
      <span className="text-[13px] font-bold text-[var(--text-primary)] tabular-nums shrink-0">
        {meal.kcal}
      </span>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────
export default function NutritionPage() {
  const [filter, setFilter] = useState(0); // 0=Today 1=Week

  return (
    <AppShell>
      <LayoutContainer maxWidth="mobile">

        {/* ── Header ──────────────────────────── */}
        <LayoutSection gap={false}>
          <div className="pt-6 pb-4 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--text-muted)] mb-1">
                Nutrition
              </p>
              <h1 className="text-[26px] font-bold text-[var(--text-primary)]">
                Today's Intake
              </h1>
            </div>
            <GlassPillNav
              items={['Today', 'Week']}
              size="sm"
              onChange={(i) => setFilter(i)}
            />
          </div>
        </LayoutSection>

        {/* ── 1. Calorie hero ─────────────────── */}
        <LayoutSection>
          <GlassCard variant="strong" padding="lg" animationDelay={0.05}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-1">
                  Calories
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[36px] font-bold leading-none text-[var(--text-primary)]">
                    {TOTAL_KCAL.toLocaleString()}
                  </span>
                  <span className="text-[13px] text-[var(--text-muted)]">
                    / {GOALS.calories.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-[var(--text-muted)] mb-0.5">Remaining</p>
                <p className="text-[20px] font-bold text-[var(--text-primary)]">
                  {REMAINING.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Calorie progress bar */}
            <div className="h-[6px] rounded-full track overflow-hidden mb-5">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct(TOTAL_KCAL, GOALS.calories)}%`,
                  background: 'linear-gradient(90deg, #6A5CFF, #B26BFF)',
                  transition: 'width 1000ms cubic-bezier(0.23,1,0.32,1) 100ms',
                }}
              />
            </div>

            {/* ── 2. Macro bars ─────────────────── */}
            <div className="flex flex-col gap-[14px]">
              {MACROS.map((m, i) => (
                <MacroBar key={m.label} {...m} delay={i * 80} />
              ))}
            </div>
          </GlassCard>
        </LayoutSection>

        {/* ── 3. Meal log ─────────────────────── */}
        <LayoutSection title="Meals">
          <GlassCard padding="md" animationDelay={0.10}>
            {MEALS.map((meal, i) => (
              <MealRow key={meal.id} meal={meal} delay={0.12 + i * 0.05} />
            ))}
          </GlassCard>
        </LayoutSection>

        {/* ── 4. CTA ──────────────────────────── */}
        <LayoutSection>
          <div style={{ paddingBottom: 'calc(40px + env(safe-area-inset-bottom))' }}>
            <GlassButton variant="primary" size="lg" fullWidth>
              Log Meal
            </GlassButton>
          </div>
        </LayoutSection>

      </LayoutContainer>
    </AppShell>
  );
}
