'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence }                  from 'framer-motion';
import { GlassCard, GlassButton }                  from '@/components';

/* ═══════════════════════════════════════════════════
   ACTIVE SESSION PAGE
   Skills: Emil (motion) · Paul (polish) · Leon (taste)
   ───────────────────────────────────────────────────
   Layout order:
     1  Top bar     — back + exercise counter
     2  Header      — exercise name + set label
     3  Hero bubble — reps + weight (PRIMARY FOCUS)
     4  Last session — faded context
     5  Controls    — Next Set / Previous / Finish
   Overlay: Rest timer (AnimatePresence, scale+fade)
═══════════════════════════════════════════════════ */

// ── Static workout data ──────────────────────────
const EXERCISES = [
  { name: 'Bench Press',        sets: 4, reps: 10, weight: 80, last: '80kg × 8'  },
  { name: 'Incline Dumbbell',   sets: 3, reps: 12, weight: 24, last: '22kg × 10' },
  { name: 'Cable Fly',          sets: 3, reps: 15, weight: 15, last: '12.5kg × 12' },
  { name: 'Overhead Press',     sets: 4, reps: 8,  weight: 50, last: '47.5kg × 8' },
  { name: 'Lateral Raise',      sets: 3, reps: 15, weight: 10, last: '8kg × 12'  },
  { name: 'Tricep Pushdown',    sets: 3, reps: 12, weight: 25, last: '22.5kg × 10' },
];

const REST_DURATION = 45; // seconds

// ── Icon: chevron left ───────────────────────────
function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// ── Rest overlay timer ───────────────────────────
interface RestOverlayProps {
  duration:    number;
  nextExercise: string;
  onSkip:      () => void;
}

function RestOverlay({ duration, nextExercise, onSkip }: RestOverlayProps) {
  const [remaining, setRemaining] = useState(duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onSkip();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [onSkip]);

  const mm  = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss  = String(remaining % 60).padStart(2, '0');
  const pct = (remaining / duration) * 100;
  const r   = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    // Emil: backdrop — opacity only (no blur animate), ease-out
    <motion.div
      key="rest-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center"
      style={{ background: 'rgba(11,11,18,0.82)', backdropFilter: 'blur(6px)' }}
    >
      {/* Rest label */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
        className="text-[11px] font-semibold tracking-[0.18em] uppercase
                   text-[var(--text-muted)] mb-8"
      >
        Rest Time
      </motion.p>

      {/* Timer bubble — Emil: scale(0.95)+opacity:0 enter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative mb-8"
      >
        {/* SVG ring */}
        <svg width="148" height="148" viewBox="0 0 148 148" className="-rotate-90 block">
          {/* Track */}
          <circle cx="74" cy="74" r={r}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          {/* Progress arc */}
          <motion.circle
            cx="74" cy="74" r={r}
            fill="none"
            stroke="url(#restGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1s linear',
              filter: 'drop-shadow(0 0 5px rgba(138,92,255,0.4))',
            }}
          />
          <defs>
            <linearGradient id="restGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#6A5CFF" />
              <stop offset="100%" stopColor="#B26BFF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center time */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold text-[var(--text-primary)] tabular-nums"
            style={{ fontSize: '36px', lineHeight: 1 }}
          >
            {mm}:{ss}
          </span>
          <span className="text-[12px] text-[var(--text-muted)] mt-1">remaining</span>
        </div>
      </motion.div>

      {/* Next exercise label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.10, ease: [0.23, 1, 0.32, 1] }}
        className="text-center mb-10"
      >
        <p className="text-[11px] text-[var(--text-muted)] mb-1">Up next</p>
        <p className="text-[15px] font-semibold text-[var(--text-primary)]">
          {nextExercise}
        </p>
      </motion.div>

      {/* Skip — ghost, not competing with timer */}
      <GlassButton variant="ghost" size="sm" onClick={onSkip}>
        Skip Rest
      </GlassButton>
    </motion.div>
  );
}

// ── Main page ────────────────────────────────────
export default function ActiveSessionPage() {
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [currentSet,  setCurrentSet]  = useState(1);
  const [resting,     setResting]     = useState(false);
  const [done,        setDone]        = useState(false);

  const exercise    = EXERCISES[exerciseIdx];
  const totalSets   = exercise.sets;
  const isLastSet   = currentSet === totalSets;
  const isLastEx    = exerciseIdx === EXERCISES.length - 1;
  const nextExName  = isLastEx ? 'Finished' : EXERCISES[exerciseIdx + 1].name;

  const [pulseKey, setPulseKey] = useState(0);

  // ── advance to next set / exercise ──
  const handleNextSet = useCallback(() => {
    // Haptic feedback (web vibration API — silent fail on unsupported)
    navigator.vibrate?.(50);
    if (isLastSet) {
      if (isLastEx) { setDone(true); return; }
      setResting(true);
    } else {
      setResting(true);
    }
  }, [isLastSet, isLastEx]);

  // ── called by RestOverlay on skip or timeout ──
  const handleRestEnd = useCallback(() => {
    setResting(false);
    // Emil: 120ms delay before pulse — overlay has time to exit first
    setTimeout(() => setPulseKey(k => k + 1), 120);
    navigator.vibrate?.(30);
    if (isLastSet) {
      setExerciseIdx(i => i + 1);
      setCurrentSet(1);
    } else {
      setCurrentSet(s => s + 1);
    }
  }, [isLastSet]);

  // ── go back one set ──
  const handlePrev = useCallback(() => {
    if (currentSet > 1) {
      setCurrentSet(s => s - 1);
    } else if (exerciseIdx > 0) {
      const prev = EXERCISES[exerciseIdx - 1];
      setExerciseIdx(i => i - 1);
      setCurrentSet(prev.sets);
    }
  }, [currentSet, exerciseIdx]);

  const canGoBack = currentSet > 1 || exerciseIdx > 0;

  // ── Finished state ──────────────────────────────
  if (done) {
    return (
      <div className="min-h-dvh max-w-md mx-auto flex flex-col items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          {/* Checkmark */}
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #6A5CFF, #B26BFF)',
              boxShadow: '0 0 32px rgba(106,92,255,0.35)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold text-[var(--text-primary)] mb-2">
            Great Work
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] mb-10">
            Push Day complete · {EXERCISES.length} exercises
          </p>
          <GlassButton
            variant="primary" size="lg" fullWidth
            onClick={() => { setExerciseIdx(0); setCurrentSet(1); setDone(false); }}
          >
            Back to Dashboard
          </GlassButton>
        </motion.div>
      </div>
    );
  }

  return (
    // Full-screen, no bottom nav — session is immersive
    <div className="relative min-h-dvh max-w-md mx-auto flex flex-col overflow-hidden">

      {/* ── 1. TOP BAR ────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-safe-top pt-5 pb-4 shrink-0">
        <button
          // Emil: transition only opacity+transform, no transition:all
          className="flex items-center gap-1.5 text-[var(--text-secondary)]
                     [transition:opacity_160ms_cubic-bezier(0.23,1,0.32,1),transform_160ms_cubic-bezier(0.23,1,0.32,1)]
                     active:opacity-60 active:scale-95"
          onClick={() => window.history.back()}
          aria-label="Back"
        >
          <ChevronLeft />
          <span className="text-[13px] font-medium">Push Day</span>
        </button>

        <span className="text-[12px] font-semibold text-[var(--text-muted)]">
          {exerciseIdx + 1} / {EXERCISES.length}
        </span>
      </div>

      {/* ── 2. EXERCISE HEADER ────────────────────── */}
      {/* Emil: AnimatePresence on key change = exit+enter on exercise switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`header-${exerciseIdx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="px-5 mb-6 shrink-0"
        >
          <h1
            className="font-bold text-[var(--text-primary)] leading-tight mb-1"
            style={{ fontSize: '30px' }}
          >
            {exercise.name}
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            Set {currentSet} of {totalSets}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── 3. HERO BUBBLE — PRIMARY FOCUS ────────── */}
      {/* Paul: one main focus, this dominates the screen */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bubble-${exerciseIdx}`}
            // Emil: scale(0.95)+opacity:0 enter
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="w-full flex flex-col items-center"
          >
            {/* Bubble — pulse wrapper: scale [1→1.05→1] on rest end */}
            <motion.div
              key={pulseKey}
              animate={pulseKey > 0 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center"
            >
              {/* Glass bubble — primary focus */}
              <div
                className="relative flex flex-col items-center justify-center"
                style={{
                  width: 244,
                  height: 244,
                  borderRadius: '50%',
                  // Fix 1: inner radial gradient = liquid light reflection
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 60%), rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  // Paul: controlled glow — not excessive
                  boxShadow: '0 0 48px rgba(106,92,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
              >
                {/* Fix 2: reps animated on set/exercise change */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`reps-${exerciseIdx}-${currentSet}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="font-bold text-[var(--text-primary)] tabular-nums leading-none"
                    style={{ fontSize: '80px' }}
                  >
                    {exercise.reps}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[15px] font-medium text-[var(--text-secondary)] mt-1">
                  {exercise.weight}kg
                </span>
              </div>

              {/* Fix 3: last session — animate to opacity 0.3, delay 200ms */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.3, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="text-[13px] font-medium mt-5 tabular-nums text-[var(--text-primary)]"
              >
                Last: {exercise.last}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── 5. CONTROLS ───────────────────────────── */}
      <div className="px-5 shrink-0" style={{ paddingBottom: 'calc(40px + env(safe-area-inset-bottom))' }}>
        {/* Primary: Next Set */}
        <GlassButton
          variant="primary"
          size="lg"
          fullWidth
          className="mb-3"
          onClick={handleNextSet}
        >
          {isLastSet && isLastEx ? 'Finish Session' : 'Next Set'}
        </GlassButton>

        {/* Secondary row — ghost buttons, lower visual weight */}
        <div className="flex gap-3">
          <GlassButton
            variant="ghost"
            size="md"
            className="flex-1"
            onClick={handlePrev}
            disabled={!canGoBack}
          >
            Previous
          </GlassButton>
          <GlassButton
            variant="ghost"
            size="md"
            className="flex-1"
            onClick={() => setDone(true)}
          >
            Finish
          </GlassButton>
        </div>
      </div>

      {/* ── REST OVERLAY ──────────────────────────── */}
      {/* Emil: AnimatePresence handles scale+fade enter/exit cleanly */}
      <AnimatePresence>
        {resting && (
          <RestOverlay
            duration={REST_DURATION}
            nextExercise={isLastSet && !isLastEx ? nextExName : exercise.name}
            onSkip={handleRestEnd}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
