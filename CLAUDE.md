# Project: FitPulse (Purple Liquid Glass UI)

## Tech Stack

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS v3
* Framer Motion v11

## Structure

```
fit-app/
├── app/
│   ├── page.tsx               # Dashboard
│   ├── session/page.tsx       # Active Session
│   ├── nutrition/page.tsx     # Nutrition tracking
│   ├── progress/page.tsx      # Stats & progress
│   ├── layout.tsx             # Root layout (font, metadata, dark class)
│   └── globals.css            # CSS variables, glass utilities
├── components/
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   ├── GlassButton.tsx
│   │   ├── GlassPillNav.tsx
│   │   ├── CircularProgressRing.tsx
│   │   └── LayoutContainer.tsx
│   └── layout/
│       └── AppShell.tsx       # Bottom nav wrapper
├── lib/
│   └── utils.ts               # cn(), clamp(), pct(), formatDuration()
├── public/icons/              # App icons / PWA assets
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
├── package.json
├── DESIGN-SYSTEM.md           # Full design system reference
└── CLAUDE.md                  # This file
```

## Design System

* Glassmorphism UI (blur 20px, rgba transparency)
* Purple gradient theme (#6A5CFF → #B26BFF)
* Minimal, premium layout — 1 focus per screen
* Mobile-first (max-w-md)

## Rules

* Always reuse existing components — do NOT create duplicates
* Keep UI minimal (no clutter, no excessive glow)
* Maintain spacing: 24px section gap, 16px card gap, 18px inner padding
* Use `@/` path alias for all imports
* Read DESIGN-SYSTEM.md before adding any new component

## Key Components

| Component | Path | Purpose |
|---|---|---|
| `GlassCard` | `components/ui/GlassCard.tsx` | All card surfaces |
| `GlassButton` | `components/ui/GlassButton.tsx` | All buttons/CTAs |
| `GlassPillNav` | `components/ui/GlassPillNav.tsx` | Bottom nav, segmented controls |
| `CircularProgressRing` | `components/ui/CircularProgressRing.tsx` | Animated SVG rings |
| `LayoutContainer` | `components/ui/LayoutContainer.tsx` | Page layout wrapper |
| `AppShell` | `components/layout/AppShell.tsx` | Bottom nav + main layout |

## Current Pages

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | ✅ Dashboard |
| `/session` | `app/session/page.tsx` | ✅ Active Session |
| `/nutrition` | `app/nutrition/page.tsx` | 🚧 Placeholder |
| `/progress` | `app/progress/page.tsx` | 🚧 Placeholder |

## Development Commands

```bash
npm install
npm run dev     # localhost:3000
npm run build
npm run lint
```

## Goal

Build a premium personal fitness tracking PWA.
