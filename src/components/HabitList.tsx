'use client';

import { useHabits } from '@/hooks/useHabits';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export function HabitList() {
  const { habits, habitRecords, toggleHabit } = useHabits();

  const handleToggle = async (habitId: string) => {
    try {
      await toggleHabit(habitId);
    } catch (error) {
      console.error('習慣の記録に失敗しました:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">習慣一覧</h2>
      {habits.map((habit) => {
        const record = habitRecords.find((r) => r.habitId === habit.id);
        const isCompleted = record?.completed ?? false;

        return (
          <div
            key={habit.id}
            className="bg-card rounded-lg p-4 shadow-sm border border-accent-neutral/20"
            style={{ borderLeftColor: habit.color, borderLeftWidth: 4 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => handleToggle(habit.id)}
                />
                <div>
                  <h3 className="font-medium">{habit.name}</h3>
                  <p className="text-sm text-text-secondary">
                    {habit.frequency.type === 'daily' ? '毎日' : 
                      habit.frequency.days ? 
                        `${habit.frequency.days.map(d => ['日', '月', '火', '水', '木', '金', '土'][d]).join('・')}曜日` : 
                        '曜日未設定'
                    }
                  </p>
                </div>
              </div>
              <Link href={`/habits/${habit.id}`}>
                <Button size="icon" variant="secondary">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-text-secondary mb-1">
                <span>進捗</span>
                <span>今日: {isCompleted ? '達成' : '未達成'}</span>
              </div>
              <Progress value={isCompleted ? 100 : 0} className="h-1" />
            </div>
          </div>
        );
      })}
      {habits.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          習慣を追加してください
        </div>
      )}
    </div>
  );
} 