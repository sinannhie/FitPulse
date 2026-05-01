# 🎨 FitPulse — Purple Liquid Glass Design System

> **Core principle:** Soft, layered glass + controlled glow + minimal UI.  
> Not flashy. Not overloaded. One focus per screen.

**Active skills:** Emil Kowalski (motion) · Paul Bakaus (polish) · Leon (taste)

---

## 📁 File Map

```
fitpulse/
├── tailwind.config.js          ← Color tokens, shadows, animations
├── styles/globals.css          ← CSS variables, glass utilities, base reset
├── DESIGN-SYSTEM.md            ← This file
└── components/ui/
    ├── GlassCard.tsx           ← Base glass surface
    ├── GlassButton.tsx         ← Primary / ghost / pill button
    ├── GlassPillNav.tsx        ← Segmented nav with spring indicator
    ├── CircularProgressRing.tsx← Animated SVG ring
    └── LayoutContainer.tsx     ← Page layout + section + card grid
```

---

## 🎨 1. Color System

### Dark Theme (default)

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0B0B12` | Page background |
| `--bg-secondary` | `#12121A` | Elevated surfaces |
| `--purple-1` | `#6A5CFF` | Gradient start, accents |
| `--purple-2` | `#B26BFF` | Gradient end |
| `--accent-glow` | `rgba(138,92,255,0.35)` | Glow effects |
| `--text-primary` | `#FFFFFF` | Body text |
| `--text-secondary` | `rgba(255,255,255,0.60)` | Labels, metadata |
| `--text-muted` | `rgba(255,255,255,0.30)` | Placeholders, hints |

### Light Theme

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#F5F6FA` | Page background |
| `--bg-secondary` | `#FFFFFF` | Cards |
| `--purple-soft` | `#8C7CFF` | Accent |
| `--text-primary` | `#1A1A1A` | Body text |
| `--text-secondary` | `rgba(0,0,0,0.60)` | Labels |

---

## 🫧 2. Glass System

```css
/* Base — all cards */
.glass {
  background: rgba(255,255,255,0.08);   /* dark */
  background: rgba(255,255,255,0.60);   /* light */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 24px;
}

/* Elevated — hero elements only */
.glass-strong {
  background: rgba(255,255,255,0.12);
  box-shadow: 0 0 30px rgba(138,92,255,0.25);
}

/* Glow — use sparingly, dark only */
.glow {
  box-shadow:
    0 0 25px rgba(138,92,255,0.35),
    inset 0 0 10px rgba(255,255,255,0.10);
}
```

---

## 🔘 3. Components

### GlassCard
```tsx
<GlassCard>...</GlassCard>
<GlassCard variant="strong" padding="lg" interactive>...</GlassCard>
<GlassCard variant="purple" animationDelay={0.1}>...</GlassCard>
```
| Prop | Values | Default |
|---|---|---|
| `variant` | `default` `strong` `purple` | `default` |
| `padding` | `none` `sm` `md` `lg` | `md` (18px) |
| `interactive` | boolean | `false` |
| `animationDelay` | seconds | `0` |

### GlassButton
```tsx
<GlassButton variant="primary" size="lg">Start Workout</GlassButton>
<GlassButton variant="ghost">View History</GlassButton>
<GlassButton variant="pill">Week</GlassButton>
<GlassButton loading>Saving...</GlassButton>
```
| Prop | Values | Default |
|---|---|---|
| `variant` | `primary` `ghost` `glass` `pill` | `glass` |
| `size` | `sm` `md` `lg` | `md` |
| `fullWidth` | boolean | `false` |
| `loading` | boolean | `false` |

### GlassPillNav
```tsx
<GlassPillNav
  items={['Week', 'Month', 'Year']}
  defaultIndex={0}
  onChange={(i, label) => setRange(label)}
/>

// With icons
<GlassPillNav
  items={[
    { label: 'Home', icon: <House /> },
    { label: 'Stats', icon: <ChartBar /> },
  ]}
/>
```

### CircularProgressRing
```tsx
<CircularProgressRing
  progress={72}
  size={110}
  label="Calories"
  value="1,750"
  unit="kcal"
/>

// Custom colors + stagger
<CircularProgressRing progress={55} size={90} label="Protein" delay={0.1} />
<CircularProgressRing progress={40} size={90} label="Water"   delay={0.2} />
```

### LayoutContainer
```tsx
<LayoutContainer maxWidth="mobile">
  <LayoutSection title="Today's Goals" gap>
    <CardGrid cols={2}>
      <GlassCard>...</GlassCard>
      <GlassCard>...</GlassCard>
    </CardGrid>
  </LayoutSection>
</LayoutContainer>
```

---

## 📏 4. Spacing System

| Token | Value | Class | Usage |
|---|---|---|---|
| Section gap | 24px | `mb-section` | Between major sections |
| Card gap | 16px | `gap-card` | Between cards in grid |
| Inner padding | 18px | `p-inner` | Inside card content |

---

## 🔤 5. Typography

```css
.heading { font-size: 22px; font-weight: 600; }  /* section titles */
.value   { font-size: 36px; font-weight: 700; }  /* calories, weight */
.label   { font-size: 12px; font-weight: 500; }  /* metadata, units */
```

**Fonts:** Geist (default) · Outfit · Cabinet Grotesk · Satoshi  
**Ban:** Inter

---

## 📳 6. Interaction System (Emil skill)

| Action | Behavior | Duration |
|---|---|---|
| Tap / press | `scale(0.96)` | 160ms ease-out |
| Hover | glow + border-color | 200ms ease-out |
| Enter animation | `scale(0.95) + opacity:0` → `scale(1) + opacity:1` | 280ms |
| Pill nav indicator | Spring layout animation | stiffness:380 damping:32 |
| Progress ring fill | Stroke from 0 → target | 1200ms ease-out |

**Custom easing curves:**
```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

---

## ⚠️ 7. Rules

### ❌ Never
- `transition: all` — specify exact properties
- `ease-in` on UI elements
- `scale(0)` entry — use `scale(0.95)`
- Gradient text on headings (values/accents only)
- Nested cards
- Outer glow `box-shadow` as decoration
- 3-column equal card grids
- Inter font
- Fake placeholder names ("John Doe", "Acme")
- Organic-looking fake numbers like 99.99% (use 47.2%)
- Filler copy ("Elevate", "Seamless", "Unleash")
- Emojis in UI (use Phosphor or Radix icons)

### ✅ Always
- 1 focus per screen
- Generous whitespace
- Consistent 20px blur across all glass
- Loading + Empty + Error states
- Gate hover animations: `@media (hover: hover) and (pointer: fine)`
- `prefers-reduced-motion` for accessibility
- OKLCH for any custom colors (Paul skill)

---

## 🚀 Quick Start

```tsx
import { GlassCard, GlassButton, CircularProgressRing } from '@/components/ui';
import { LayoutContainer, LayoutSection } from '@/components/ui/LayoutContainer';

export default function Dashboard() {
  return (
    <LayoutContainer>
      <LayoutSection title="Today's Goals">
        <GlassCard>
          <CircularProgressRing progress={72} value="1,750" unit="kcal" label="Calories" />
        </GlassCard>
      </LayoutSection>

      <GlassButton variant="primary" fullWidth size="lg">
        Start Workout
      </GlassButton>
    </LayoutContainer>
  );
}
```

---

## 🎨 Polish Commands (Paul skill)

| Command | What it does |
|---|---|
| `/polish` | Full quality pass — spacing, typography, contrast |
| `/critique` | UX review with heuristic scoring |
| `/bolder` | Amplify bland, timid designs |
| `/quieter` | Tone down overstimulating designs |
| `/typeset` | Fix typography hierarchy |
| `/layout` | Fix spacing, rhythm, visual hierarchy |
| `/animate` | Add purposeful motion (Emil rules applied) |
