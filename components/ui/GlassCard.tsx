'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

/*
 * GlassCard
 * ─────────────────────────────────────────────────
 * Design system: Purple Liquid Glass
 * Skills applied:
 *   Emil  — scale(0.95)+opacity:0 entry, ease-out 280ms, no transition:all
 *   Paul  — no nested cards, consistent 24px radius
 *   Leon  — no outer glow by default, no identical card grids
 *
 * Variants:
 *   default  — base glass (rgba 8%)
 *   strong   — elevated glass (rgba 12%) + subtle glow
 *   purple   — purple-tinted surface
 *
 * Padding:  sm=16px  md=18px(default)  lg=24px  none=0
 */

type Variant = 'default' | 'strong' | 'purple';
type Padding = 'none' | 'sm' | 'md' | 'lg';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  variant?: Variant;
  padding?: Padding;
  interactive?: boolean;
  animationDelay?: number;
  className?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  default: 'glass shadow-card',
  strong:  'glass-strong',
  purple:  'glass shadow-card bg-[rgba(106,92,255,0.10)] border-[rgba(106,92,255,0.25)]',
};

const PADDING_CLASSES: Record<Padding, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-[18px]',
  lg:   'p-6',
};

export function GlassCard({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  animationDelay = 0,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      // Emil: entry from scale(0.95)+opacity:0, ease-out, max 300ms
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.28,
        delay: animationDelay,
        ease: [0.23, 1, 0.32, 1], // --ease-out
      }}
      className={clsx(
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        interactive && 'interactive',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
