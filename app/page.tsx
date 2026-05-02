'use client';

import { pct } from '@/lib/utils';

const CALORIES = { current: 1750, goal: 2400 };
const MACROS = [
  { label: 'Protein', current: 125, goal: 180 },
  { label: 'Carbs',   current: 160, goal: 250 },
  { label: 'Fat',     current: 55,  goal: 70  },
];
const WORKOUT = {
  name: 'Push Day',
  subtitle: '6 exercises · 50 min',
  tags: ['Chest', 'Shoulders', 'Triceps'],
};
const WEEKLY_STATS = {
  avgCalories: 1820,
  streak: 5,
  bestDay: 'Tuesday',
};
const RECENT_ACTIVITY = [
  { day: 'Yesterday', workout: 'Pull Day', duration: '52 min' },
  { day: 'Monday', workout: 'Leg Day', duration: '48 min' },
  { day: 'Sunday', workout: 'Rest', duration: '-' },
];

const calorieProgress = pct(CALORIES.current, CALORIES.goal);

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'home', active: true },
  { label: 'Workout', href: '/session', icon: 'workout', active: false },
  { label: 'Nutrition', href: '/nutrition', icon: 'nutrition', active: false },
  { label: 'Progress', href: '/progress', icon: 'progress', active: false },
];

function NavIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? '#6A5CFF' : 'rgba(255,255,255,0.3)';
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    workout: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 17.5h11M12 6.5v11" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="6.5" r="2.5" />
        <circle cx="6.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    nutrition: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    progress: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  };
  return icons[type] || null;
}

function CalorieRing({ size = 120 }: { size?: number }) {
  const radius = (size - 8) / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(calorieProgress / 100) * circumference} ${circumference}`;
  const fontSize = Math.round(size * 0.18);
  const unitSize = Math.round(size * 0.09);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6A5CFF" />
            <stop offset="100%" stopColor="#B26BFF" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize, fontWeight: 700, color: '#fff' }}>
          {CALORIES.current.toLocaleString()}
        </span>
        <span style={{ fontSize: unitSize, color: 'rgba(255,255,255,0.4)' }}>
          kcal
        </span>
      </div>
    </div>
  );
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        borderRadius: 24,
      }}
    >
      {children}
    </div>
  );
}

function MacroBars() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {MACROS.map((m, i) => {
        const progress = pct(m.current, m.goal);
        return (
          <div key={m.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{m.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                {m.current}
                <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>/{m.goal}g</span>
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 9999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginTop: 6 }}>
              <div
                style={{
                  height: '100%',
                  borderRadius: 9999,
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #6A5CFF, #B26BFF)',
                  transition: `width 900ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WorkoutCard() {
  return (
    <GlassCard className="p-4 md:p-5 lg:p-6">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>
            TODAY'S WORKOUT
          </p>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">{WORKOUT.name}</h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{WORKOUT.subtitle}</p>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: 'rgba(106,92,255,0.20)',
            border: '1px solid rgba(106,92,255,0.35)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B26BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4v16" />
            <path d="M18 4v16" />
            <path d="M6 12h12" />
            <rect x="3" y="6" width="6" height="4" rx="1" />
            <rect x="15" y="6" width="6" height="4" rx="1" />
            <rect x="3" y="14" width="6" height="4" rx="1" />
            <rect x="15" y="14" width="6" height="4" rx="1" />
          </svg>
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {WORKOUT.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '5px 12px',
              borderRadius: 9999,
              fontSize: 11,
              fontWeight: 500,
              color: '#B26BFF',
              background: 'rgba(106,92,255,0.18)',
              border: '1px solid rgba(106,92,255,0.30)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

function CTAButton() {
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginBottom: 12, letterSpacing: '0.04em' }}>
        Ready to train?
      </p>
      <button
        style={{
          width: '100%',
          height: 56,
          borderRadius: 16,
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: '0.04em',
          background: 'linear-gradient(135deg, #6A5CFF 0%, #B26BFF 100%)',
          boxShadow: '0 8px 32px rgba(106,92,255,0.50), 0 2px 8px rgba(106,92,255,0.30)',
          transition: 'transform 150ms ease-out',
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Start Workout
      </button>
    </div>
  );
}

function WeeklyStatsCard() {
  return (
    <GlassCard className="p-5">
      <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
        THIS WEEK
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Avg Calories</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{WEEKLY_STATS.avgCalories.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Workout Streak</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#6A5CFF' }}>{WEEKLY_STATS.streak} days</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Best Day</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{WEEKLY_STATS.bestDay}</span>
        </div>
      </div>
    </GlassCard>
  );
}

function QuickMacrosCard() {
  return (
    <GlassCard className="p-5">
      <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
        MACRO BREAKDOWN
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {MACROS.map((m) => {
          const progress = pct(m.current, m.goal);
          return (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: 48, height: 48, margin: '0 auto' }}>
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${(progress / 100) * 2 * Math.PI * 20} ${2 * Math.PI * 20}`}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#fff' }}>{progress}%</span>
                </div>
              </div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{m.label}</p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function RecentActivityCard() {
  return (
    <GlassCard className="p-5">
      <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
        RECENT ACTIVITY
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {RECENT_ACTIVITY.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < 2 ? 12 : 0, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{item.workout}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{item.day}</p>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.duration}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <aside
      className={collapsed ? 'w-[72px]' : 'w-[240px]'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        background: 'rgba(8,8,16,0.95)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        padding: collapsed ? '24px 12px' : '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 40,
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #6A5CFF, #B26BFF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>F</span>
        </div>
        {!collapsed && <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>FitPulse</span>}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: collapsed ? '12px' : '12px 16px',
              borderRadius: 12,
              textDecoration: 'none',
              background: item.active ? 'rgba(106,92,255,0.15)' : 'transparent',
              transition: 'background 150ms ease',
            }}
          >
            <NavIcon type={item.icon} active={item.active} />
            {!collapsed && (
              <span style={{ fontSize: 14, fontWeight: item.active ? 600 : 400, color: item.active ? '#6A5CFF' : 'rgba(255,255,255,0.5)' }}>
                {item.label}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* User profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 14, color: '#fff' }}>S</span>
        </div>
        {!collapsed && (
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>Sinan</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Premium</p>
          </div>
        )}
      </div>
    </aside>
  );
}

function BottomNav() {
  return (
    <nav
      className="flex md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        background: 'rgba(8,8,16,0.85)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '12px 0 16px',
      }}
    >
      <div style={{ maxWidth: 390, margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative' }}>
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <a key={item.label} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
            <NavIcon type={item.icon} active={item.active} />
            <span style={{ fontSize: 10, fontWeight: item.active ? 500 : 400, color: item.active ? '#6A5CFF' : 'rgba(255,255,255,0.3)' }}>{item.label}</span>
          </a>
        ))}

        {/* Center FAB */}
        <button
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%) translateY(-16px)',
            width: 52,
            height: 52,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #6A5CFF, #B26BFF)',
            boxShadow: '0 4px 20px rgba(106,92,255,0.60)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {NAV_ITEMS.slice(2).map((item) => (
          <a key={item.label} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
            <NavIcon type={item.icon} active={item.active} />
            <span style={{ fontSize: 10, fontWeight: item.active ? 500 : 400, color: item.active ? '#6A5CFF' : 'rgba(255,255,255,0.3)' }}>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function DashboardPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#080810', overflowX: 'hidden' }}>
      {/* Background gradient orbs */}
      <div style={{ position: 'fixed', pointerEvents: 'none', top: -100, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(106,92,255,0.30) 0%, transparent 70%)' }} />
      <div style={{ position: 'fixed', pointerEvents: 'none', bottom: -50, right: -50, width: 400, height: 400, background: 'radial-gradient(circle, rgba(178,107,255,0.18) 0%, transparent 70%)' }} />

      {/* Noise overlay */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10, opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      {/* Tablet sidebar (icons only) */}
      <div className="hidden md:flex lg:hidden">
        <Sidebar collapsed />
      </div>

      {/* Desktop sidebar (full) */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Main content wrapper */}
      <main
        className="
          relative z-20
          px-4 pt-6 pb-28
          md:ml-[72px] md:px-8 md:pt-8 md:pb-8
          lg:ml-[240px] lg:px-10
        "
        style={{ minHeight: '100vh' }}
      >
        {/* Mobile/Tablet: single column, Desktop: two columns */}
        <div className="max-w-[390px] md:max-w-[768px] lg:max-w-[1200px] mx-auto">
          <div className="lg:flex lg:gap-8">
            {/* Left column - main content */}
            <div className="flex-1">
              {/* Greeting */}
              <div className="mb-5">
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>
                  Saturday, May 2
                </p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Good morning, Sinan
                </h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                  Today · {CALORIES.current.toLocaleString()} kcal tracked
                </p>
              </div>

              {/* Hero card */}
              <GlassCard className="p-5 md:p-6 lg:p-7 mb-3">
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ flexShrink: 0 }}>
                    {/* Mobile ring */}
                    <div className="block md:hidden">
                      <CalorieRing size={120} />
                    </div>
                    {/* Tablet ring */}
                    <div className="hidden md:block lg:hidden">
                      <CalorieRing size={140} />
                    </div>
                    {/* Desktop ring */}
                    <div className="hidden lg:block">
                      <CalorieRing size={160} />
                    </div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 8 }}>
                      of {CALORIES.goal.toLocaleString()} goal
                    </p>
                  </div>
                  <MacroBars />
                </div>
              </GlassCard>

              {/* CTA - desktop only shows here */}
              <div className="hidden lg:block mb-4">
                <CTAButton />
              </div>

              {/* Workout card */}
              <div className="mb-4">
                <WorkoutCard />
              </div>

              {/* CTA - mobile/tablet */}
              <div className="lg:hidden">
                <CTAButton />
              </div>
            </div>

            {/* Right column - desktop only */}
            <div className="hidden lg:flex lg:flex-col lg:gap-4" style={{ width: 320, flexShrink: 0 }}>
              <WeeklyStatsCard />
              <QuickMacrosCard />
              <RecentActivityCard />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom nav - mobile only */}
      <BottomNav />
    </div>
  );
}
