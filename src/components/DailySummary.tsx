'use client';

import { useHabits } from '@/hooks/useHabits';
import { Progress } from './ui/progress';

export function DailySummary() {
  const { habits, habitRecords } = useHabits();
  
  const totalHabits = habits.length;
  const completedHabits = habitRecords.filter(record => record.completed).length;
  const progressPercentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-accent-neutral/20">
      <h2 className="text-lg font-semibold mb-2">今日の進捗</h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold">
          {completedHabits}/{totalHabits}
        </span>
        <span className="text-text-secondary">
          {progressPercentage.toFixed(0)}%
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
} 