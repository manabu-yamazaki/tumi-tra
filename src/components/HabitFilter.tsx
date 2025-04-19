import { useHabits } from '@/hooks/useHabits';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HabitFilterProps {
  selectedHabitId: string | null;
  onSelectHabit: (habitId: string | null) => void;
}

export function HabitFilter({ selectedHabitId, onSelectHabit }: HabitFilterProps) {
  const { habits } = useHabits();

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="text-sm font-medium mb-2">習慣フィルター</h2>
      <Select
        value={selectedHabitId || 'all'}
        onValueChange={(value) => onSelectHabit(value === 'all' ? null : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="すべての習慣" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべての習慣</SelectItem>
          {habits.map((habit) => (
            <SelectItem key={habit.id} value={habit.id}>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: habit.color }}
                />
                <span>{habit.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 