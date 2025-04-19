'use client';

import { useState } from 'react';
import { HabitAnalysis } from '@/components/HabitAnalysis';
import { PeriodSelector } from '@/components/PeriodSelector';

type Period = 'week' | 'month' | 'year';

export default function AnalysisPage() {
  const [period, setPeriod] = useState<Period>('month');

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-accent-neutral/20">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <h1 className="text-xl font-bold">分析</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col gap-4">
          <PeriodSelector
            period={period}
            onPeriodChange={setPeriod}
          />
          
          <HabitAnalysis period={period} />
        </div>
      </main>
    </div>
  );
} 