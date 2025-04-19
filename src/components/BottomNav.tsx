'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Settings, BarChart } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-accent-neutral/20">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            pathname === '/' ? 'text-accent-highlight' : 'text-text-secondary'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">ホーム</span>
        </Link>
        <Link
          href="/calendar"
          className={`flex flex-col items-center justify-center w-full h-full ${
            pathname === '/calendar' ? 'text-accent-highlight' : 'text-text-secondary'
          }`}
        >
          <Calendar size={24} />
          <span className="text-xs mt-1">カレンダー</span>
        </Link>
        <Link
          href="/analysis"
          className={`flex flex-col items-center justify-center w-full h-full ${
            pathname === '/analysis' ? 'text-accent-highlight' : 'text-text-secondary'
          }`}
        >
          <BarChart size={24} />
          <span className="text-xs mt-1">分析</span>
        </Link>
        <Link
          href="/settings"
          className={`flex flex-col items-center justify-center w-full h-full ${
            pathname === '/settings' ? 'text-accent-highlight' : 'text-text-secondary'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">設定</span>
        </Link>
      </div>
    </nav>
  );
} 