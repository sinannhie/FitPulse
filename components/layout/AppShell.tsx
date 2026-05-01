'use client';

import { GlassPillNav } from '@/components/ui/GlassPillNav';
import { useRouter, usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Home',      href: '/' },
  { label: 'Nutrition', href: '/nutrition' },
  { label: 'Progress',  href: '/progress' },
];

interface AppShellProps { children: React.ReactNode }

export function AppShell({ children }: AppShellProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const activeIdx = NAV_ITEMS.findIndex(n => n.href === pathname);

  return (
    <div className="relative min-h-dvh flex flex-col">
      <main className="flex-1 pb-28">{children}</main>

      {/* Bottom nav */}
      <div
        className="fixed bottom-0 inset-x-0 flex justify-center z-30"
        style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
      >
        <GlassPillNav
          items={NAV_ITEMS.map(n => n.label)}
          defaultIndex={activeIdx >= 0 ? activeIdx : 0}
          onChange={(i) => router.push(NAV_ITEMS[i].href)}
        />
      </div>
    </div>
  );
}
