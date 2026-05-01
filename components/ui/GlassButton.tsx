'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

/*
 * GlassButton
 * ─────────────────────────────────────────────────
 * Design system: Purple Liquid Glass
 * Skills applied:
 *   Emil  — whileTap scale(0.96), spring stiffness:420 damping:28
 *           hover gated behind media query (CSS class)
 *           transition only transform+box-shadow (not: all)
 *   Paul  — no gradient text on labels
 *   Leon  — Framer Motion spring, only transform+opacity animated
 *
 * Variants:
 *   primary  — gradient fill, pill shape (main CTA)
 *   ghost    — transparent + border
 *   glass    — glass surface
 *   pill     — fully rounded ghost (nav / segmented toggle)
 *
 * Sizes: sm | md | lg
 */

type Variant = 'primary' | 'ghost' | 'glass' | 'pill';
type Size    = 'sm' | 'md' | 'lg';

interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary: [
    'bg-purple-gradient text-white font-semibold',
    'border border-transparent rounded-pill',
    'shadow-btn',
    // Emil: hover gated, only box-shadow animated
    '[transition:transform_160ms_cubic-bezier(0.23,1,0.32,1),box-shadow_200ms_cubic-bezier(0.23,1,0.32,1)]',
    'hover:shadow-btn-hover',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--text-secondary)] font-medium',
    'border border-[var(--glass-border)] rounded-glass',
    '[transition:transform_160ms_cubic-bezier(0.23,1,0.32,1),border-color_200ms_cubic-bezier(0.23,1,0.32,1),background_200ms_cubic-bezier(0.23,1,0.32,1)]',
    '@media(hover:hover){hover:bg-[var(--glass-bg)] hover:border-[var(--glass-border-active)] hover:text-[var(--text-primary)]}',
  ].join(' '),

  glass: [
    'bg-[var(--glass-bg)] backdrop-blur-glass text-[var(--text-primary)] font-medium',
    'border border-[var(--glass-border)] rounded-glass',
    '[transition:transform_160ms_cubic-bezier(0.23,1,0.32,1),box-shadow_200ms_cubic-bezier(0.23,1,0.32,1)]',
  ].join(' '),

  pill: [
    'bg-[var(--chip-bg)] backdrop-blur-glass text-[var(--text-secondary)] font-medium',
    'border border-[var(--chip-border)] rounded-pill',
    '[transition:transform_160ms_cubic-bezier(0.23,1,0.32,1),border-color_200ms_cubic-bezier(0.23,1,0.32,1)]',
  ].join(' '),
};

const SIZES: Record<Size, string> = {
  sm: 'h-9  px-4  text-[13px] gap-1.5',
  md: 'h-11 px-5  text-[14px] gap-2',
  lg: 'h-13 px-6  text-[15px] gap-2.5',
};

export function GlassButton({
  children,
  variant = 'glass',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: GlassButtonProps) {
  return (
    <motion.button
      // Emil: spring for tap feedback, stiffness:420 damping:28
      // Leon: spring stiffness:100 damping:20 for magnetic feel
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}
