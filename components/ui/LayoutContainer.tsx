'use client';

import { clsx } from 'clsx';

/*
 * LayoutContainer + LayoutSection + CardGrid
 * ─────────────────────────────────────────────────
 * Design system: Purple Liquid Glass
 * Skills applied:
 *   Paul  — consistent 24px section gap, 16px card gap, 18px inner pad
 *   Leon  — CSS Grid default, no 3-col equal grids (ban)
 *
 * Components:
 *   LayoutContainer — page-level max-width + horizontal padding
 *   LayoutSection   — 24px bottom margin section wrapper
 *   CardGrid        — 1 or 2 col grid (Leon: ban 3-col equal)
 */

// ── LayoutContainer ──────────────────────────────
interface ContainerProps {
  children: React.ReactNode;
  /** mobile=max-w-md · wide=max-w-2xl · full=no cap */
  maxWidth?: 'mobile' | 'wide' | 'full';
  className?: string;
}

const MAX = { mobile: 'max-w-md', wide: 'max-w-2xl', full: '' } as const;

export function LayoutContainer({ children, maxWidth = 'mobile', className }: ContainerProps) {
  return (
    <div className={clsx('w-full mx-auto px-4 sm:px-5', MAX[maxWidth], className)}>
      {children}
    </div>
  );
}

// ── LayoutSection ─────────────────────────────────
interface SectionProps {
  children: React.ReactNode;
  title?: string;
  /** Default: 24px gap (design system spec) */
  gap?: boolean;
  className?: string;
}

export function LayoutSection({ children, title, gap = true, className }: SectionProps) {
  return (
    <section className={clsx(gap && 'mb-section', className)}>
      {title && (
        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[var(--text-muted)] mb-3 px-1">
          {title}
        </p>
      )}
      {children}
    </section>
  );
}

// ── CardGrid ──────────────────────────────────────
// Leon: ban 3-col equal grids → max 2 cols
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2;
  className?: string;
}

export function CardGrid({ children, cols = 2, className }: GridProps) {
  return (
    <div
      className={clsx(
        'grid gap-card',
        cols === 1 ? 'grid-cols-1' : 'grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
}
