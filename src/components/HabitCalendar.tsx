import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useHabits } from '@/hooks/useHabits';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Habit } from '@/types/habit';
import { ClassNames } from 'react-day-picker';

interface HabitCalendarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  selectedHabitId: string | null;
}

export function HabitCalendar({ date, onDateChange, selectedHabitId }: HabitCalendarProps) {
  const { habits, habitRecords } = useHabits();
  const [modifierClassNames, setModifierClassNames] = useState<ClassNames>({
    months: "flex flex-col space-y-4",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    nav: "space-x-1 flex items-center",
    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
    row: "flex w-full mt-2",
    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-9 w-9",
    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside: "text-muted-foreground opacity-50",
    day_disabled: "text-muted-foreground opacity-50",
    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
    day_hidden: "invisible",
  });

  useEffect(() => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const completedDates = new Set<string>();
    const styles = new Map<string, string>();
    
    daysInMonth.forEach((day) => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayHabits = selectedHabitId
        ? [habits.find(h => h.id === selectedHabitId)].filter(Boolean)
        : habits;
      
      const completedHabits = dayHabits.filter((habit): habit is Habit => {
        if (!habit) return false;
        const record = habitRecords.find(r => 
          r.habitId === habit.id && 
          format(r.date, 'yyyy-MM-dd') === dateStr
        );
        return record?.completed === true;
      });
      
      if (completedHabits.length > 0) {
        const opacity = selectedHabitId
          ? completedHabits.length > 0 ? '1' : '0'
          : Math.min(0.2 + (completedHabits.length / habits.length) * 0.8, 1);
        
        const color = selectedHabitId
          ? habits.find(h => h.id === selectedHabitId)?.color || '#4CAF50'
          : '#4CAF50';
          
        completedDates.add(dateStr);
        styles.set(dateStr, `bg-[${color}] opacity-${opacity}`);
      }
    });
    
    setModifierClassNames(prev => ({
      ...prev,
      ...Array.from(completedDates).reduce((acc, date) => ({
        ...acc,
        [date]: `absolute inset-1 rounded-full ${styles.get(date)}`
      }), {})
    }));
  }, [date, habits, habitRecords, selectedHabitId]);

  return (
    <div className="rounded-lg border bg-card text-card-foreground p-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(newDate) => newDate && onDateChange(newDate)}
        locale={ja}
        classNames={modifierClassNames}
        showOutsideDays={true}
      />
    </div>
  );
} 