'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';

/*
 * CircularProgressRing
 * ─────────────────────────────────────────────────
 * Design system: Purple Liquid Glass
 * Skills applied:
 *   Emil  — animated stroke entry from 0 → target,
 *           ease-out 1.2s, glow filter controlled (not overdone)
 *   Paul  — optional glow dark-only, clean center layout
 *   Leon  — gradient stroke #6A5CFF → #B26BFF
 *
 * Props:
 *   progress    0–100
 *   size        SVG diameter in px (default 110)
 *   strokeWidth ring thickness (default 7)
 *   label       text below ring
 *   value       center large text
 *   unit        center small text
 *   colorStart  gradient from (default --purple-1)
 *   colorEnd    gradient to   (default --purple-2)
 *   delay       animation delay in seconds
 */

interface CircularProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  value?: string;
  unit?: string;
  colorStart?: string;
  colorEnd?: string;
  delay?: number;
  className?: string;
}

export function CircularProgressRing({
  progress,
  size = 110,
  strokeWidth = 7,
  label,
  value,
  unit,
  colorStart = '#6A5CFF',
  colorEnd   = '#B26BFF',
  delay = 0,
  className,
}: CircularProgressRingProps) {
  const uid       = useId();
  const gradId    = `grad-${uid}`;
  const filterId  = `glow-${uid}`;

  const radius      = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedP    = Math.min(Math.max(progress, 0), 100);
  const targetOffset  = circumference - (clampedP / 100) * circumference;

  return (
    <div
      className={`flex flex-col items-center gap-2 ${className ?? ''}`}
      aria-label={label ? `${label}: ${progress}%` : `Progress: ${progress}%`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block -rotate-90"
          aria-hidden="true"
        >
          <defs>
            {/* Purple gradient stroke */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={colorStart} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
            {/*
              Emil: glow filter — controlled, not overdone (Paul rule).
              stdDeviation kept at 2.5 (soft, not blinding)
            */}
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--progress-track)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress arc — Emil: from circumference → target, ease-out 1.2s */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference, opacity: 0 }}
            animate={{ strokeDashoffset: targetOffset, opacity: 1 }}
            transition={{
              strokeDashoffset: {
                duration: 1.2,
                delay,
                ease: [0.23, 1, 0.32, 1], // --ease-out
              },
              opacity: { duration: 0.3, delay },
            }}
            filter={`url(#${filterId})`}
          />
        </svg>

        {/* Center label */}
        {(value || unit) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {value && (
              <span
                className="font-bold leading-none text-[var(--text-primary)]"
                style={{ fontSize: Math.round(size * 0.20) }}
              >
                {value}
              </span>
            )}
            {unit && (
              <span
                className="text-[var(--text-muted)] leading-tight mt-0.5"
                style={{ fontSize: Math.round(size * 0.11) }}
              >
                {unit}
              </span>
            )}
          </div>
        )}
      </div>

      {label && (
        <span className="text-[11px] font-medium text-[var(--text-secondary)]">
          {label}
        </span>
      )}
    </div>
  );
}
