import { useHabits } from '@/hooks/useHabits';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Habit } from '@/types/habit';

interface MonthSummaryProps {
  date: Date;
  selectedHabitId: string | null;
}

export function MonthSummary({ date, selectedHabitId }: MonthSummaryProps) {
  const { habits, habitRecords } = useHabits();
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const calculateAchievementRate = () => {
    const targetHabits = (selectedHabitId
      ? [habits.find(h => h.id === selectedHabitId)].filter(Boolean)
      : habits) as Habit[];

    if (targetHabits.length === 0) return 0;

    let totalDays = 0;
    let achievedDays = 0;

    targetHabits.forEach((habit: Habit) => {
      daysInMonth.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const record = habitRecords.find(r => 
          r.habitId === habit.id && 
          format(r.date, 'yyyy-MM-dd') === dateStr
        );
        if (record) {
          totalDays++;
          if (record.completed) {
            achievedDays++;
          }
        }
      });
    });

    return totalDays > 0 ? Math.round((achievedDays / totalDays) * 100) : 0;
  };

  const achievementRate = calculateAchievementRate();

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">
        {format(date, 'yyyy年M月', { locale: ja })}の達成状況
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">達成率</span>
          <span className="text-2xl font-bold">{achievementRate}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all"
            style={{ width: `${achievementRate}%` }}
          />
        </div>
      </div>
    </div>
  );
} 