'use client';

import { useState } from 'react';
import { HabitCalendar } from '@/components/HabitCalendar';
import { HabitFilter } from '@/components/HabitFilter';
import { MonthSummary } from '@/components/MonthSummary';

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-accent-neutral/20">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <h1 className="text-xl font-bold">カレンダー</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="w-full md:w-3/4">
            <HabitCalendar
              date={date}
              onDateChange={setDate}
              selectedHabitId={selectedHabitId}
            />
          </div>
          
          <div className="w-full md:w-1/4 space-y-4">
            <HabitFilter
              selectedHabitId={selectedHabitId}
              onSelectHabit={setSelectedHabitId}
            />
            
            <MonthSummary
              date={date}
              selectedHabitId={selectedHabitId}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 