/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {

      // ── COLORS ──────────────────────────────────────
      colors: {
        'bg-primary':   '#0B0B12',
        'bg-secondary': '#12121A',
        'purple-1':     '#6A5CFF',
        'purple-2':     '#B26BFF',
        'light-primary':   '#F5F6FA',
        'light-secondary': '#FFFFFF',
        'purple-soft':     '#8C7CFF',
      },

      // ── GRADIENTS ────────────────────────────────────
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #6A5CFF, #B26BFF)',
        'liquid-bg': 'radial-gradient(circle at 30% 20%, rgba(106,92,255,0.22), transparent 60%)',
      },

      // ── BORDER RADIUS ────────────────────────────────
      borderRadius: {
        'glass': '24px',
        'pill':  '999px',
      },

      // ── BOX SHADOW ───────────────────────────────────
      boxShadow: {
        'glass-glow':   '0 0 25px rgba(138,92,255,0.35), inset 0 0 10px rgba(255,255,255,0.10)',
        'glass-strong': '0 0 30px rgba(138,92,255,0.25)',
        'glass-sm':     '0 0 14px rgba(138,92,255,0.20)',
        'btn':          '0 0 20px rgba(106,92,255,0.40)',
        'btn-hover':    '0 0 32px rgba(106,92,255,0.55)',
        'card':         '0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.07)',
        'card-light':   '0 4px 20px rgba(106,92,255,0.08), 0 1px 4px rgba(106,92,255,0.05)',
      },

      // ── BACKDROP BLUR ─────────────────────────────────
      backdropBlur: {
        'glass': '20px',
      },

      // ── SPACING ───────────────────────────────────────
      // Section gap: 24px → gap-section
      // Card gap:    16px → gap-card
      // Inner pad:   18px → p-inner
      spacing: {
        'section': '24px',
        'card':    '16px',
        'inner':   '18px',
      },

      // ── TYPOGRAPHY ────────────────────────────────────
      fontSize: {
        'heading': ['22px', { fontWeight: '600', lineHeight: '1.3' }],
        'value':   ['36px', { fontWeight: '700', lineHeight: '1.1' }],
        'label':   ['12px', { fontWeight: '500', lineHeight: '1.5' }],
      },

      fontFamily: {
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },

      // ── KEYFRAMES & ANIMATIONS ────────────────────────
      // Emil skill: ease-out for enter, spring for gesture, stagger 30-80ms
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          // Emil: never scale(0) — start from scale(0.95) + opacity 0
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%,100%': { boxShadow: '0 0 18px rgba(138,92,255,0.28)' },
          '50%':     { boxShadow: '0 0 32px rgba(138,92,255,0.48)' },
        },
      },
      animation: {
        // Emil: ease-out for enter, max 300ms UI
        'fade-up':    'fade-up 280ms cubic-bezier(0.23,1,0.32,1) both',
        'scale-in':   'scale-in 220ms cubic-bezier(0.23,1,0.32,1) both',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
