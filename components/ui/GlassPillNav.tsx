'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useState } from 'react';

/*
 * GlassPillNav
 * ─────────────────────────────────────────────────
 * Design system: Purple Liquid Glass
 * Skills applied:
 *   Emil  — layoutId spring for indicator, ease-out enter
 *   Leon  — Framer Motion spring stiffness:380 damping:32
 *   Paul  — no gradient text on labels
 *
 * Fully rounded pill navigation / segmented toggle.
 * Active indicator slides with layout animation.
 *
 * Usage:
 *   <GlassPillNav
 *     items={['Week', 'Month', 'Year']}
 *     onChange={(i, label) => setRange(label)}
 *   />
 */

type NavItem = { label: string; icon?: React.ReactNode };

interface GlassPillNavProps {
  items: (string | NavItem)[];
  defaultIndex?: number;
  onChange?: (index: number, label: string) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function GlassPillNav({
  items,
  defaultIndex = 0,
  onChange,
  size = 'md',
  className,
}: GlassPillNavProps) {
  const [active, setActive] = useState(defaultIndex);

  const normalized: NavItem[] = items.map(i =>
    typeof i === 'string' ? { label: i } : i
  );

  const select = (i: number) => {
    setActive(i);
    onChange?.(i, normalized[i].label);
  };

  return (
    <div
      role="tablist"
      className={clsx(
        'inline-flex items-center',
        'glass',
        size === 'sm' ? 'p-1 gap-0.5' : 'p-1.5 gap-1',
        // Paul: override radius to full pill on container
        '!rounded-pill',
        className
      )}
    >
      {normalized.map((item, i) => (
        <button
          key={item.label}
          role="tab"
          aria-selected={active === i}
          onClick={() => select(i)}
          className={clsx(
            'relative flex items-center gap-1.5 rounded-pill font-medium',
            'focus-visible:outline-none',
            // Emil: specify exact transition props
            '[transition:color_180ms_cubic-bezier(0.23,1,0.32,1)]',
            size === 'sm' ? 'px-3 py-1 text-[12px]' : 'px-4 py-[7px] text-[13px]',
            active === i
              ? 'text-white'
              : 'text-[var(--text-secondary)]'
          )}
        >
          {/* Emil: layoutId spring, scale entry from 0.95 */}
          {active === i && (
            <motion.span
              layoutId="pill-indicator"
              className="absolute inset-0 rounded-pill bg-purple-gradient glow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 32,
              }}
            />
          )}
          {item.icon && (
            <span className="relative z-10 leading-none">{item.icon}</span>
          )}
          <span className="relative z-10">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
