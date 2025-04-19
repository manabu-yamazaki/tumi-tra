'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useHabits } from '@/hooks/useHabits';
import { useAsyncOperation } from '@/hooks/useAsyncOperation';

export function HabitTracker() {
  const {
    habits,
    habitRecords,
    selectedDate,
    addHabit,
    toggleHabit,
    selectDate,
  } = useHabits();

  const [newHabitName, setNewHabitName] = useState('');
  const [createHabit, { loading: creating }] = useAsyncOperation(addHabit);
  const [toggleHabitOp, { loading: toggling }] = useAsyncOperation(toggleHabit);

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) return;
    try {
      await createHabit(newHabitName);
      setNewHabitName('');
    } catch (error) {
      console.error('習慣の追加に失敗しました:', error);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    try {
      await toggleHabitOp(habitId);
    } catch (error) {
      console.error('習慣の記録に失敗しました:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 bg-background">
      <h1 className="text-title font-poppins text-text-primary mb-8">習慣トラッカー</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* カレンダー */}
        <Card className="border-accent-neutral border-opacity-20">
          <CardHeader className="border-b border-accent-neutral border-opacity-10">
            <CardTitle className="text-title font-poppins text-text-primary">カレンダー</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && selectDate(date)}
              locale={ja}
              className="rounded-md border border-accent-neutral border-opacity-20"
            />
          </CardContent>
        </Card>

        {/* 習慣リスト */}
        <Card className="border-accent-neutral border-opacity-20">
          <CardHeader className="border-b border-accent-neutral border-opacity-10">
            <CardTitle className="text-title font-poppins text-text-primary">習慣リスト</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="新しい習慣を入力"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
                className="text-body font-roboto text-text-primary border-accent-neutral border-opacity-20"
              />
              <Button
                onClick={handleAddHabit}
                disabled={creating || !newHabitName.trim()}
                className="bg-accent-highlight hover:bg-accent-highlight/90 text-button font-roboto"
              >
                追加
              </Button>
            </div>

            <div className="space-y-4">
              {habits.map((habit) => {
                const record = habitRecords.find(
                  (r) => r.habitId === habit.id
                );
                
                return (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-3 hover:bg-accent-neutral/5 rounded border border-accent-neutral border-opacity-10"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={record?.completed ?? false}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        disabled={toggling}
                        className="border-accent-neutral data-[state=checked]:bg-accent-success data-[state=checked]:border-accent-success"
                      />
                      <span className="text-body font-roboto text-text-primary">{habit.name}</span>
                    </div>
                    <span className="text-body font-roboto text-text-secondary">
                      {format(selectedDate, 'yyyy年MM月dd日', { locale: ja })}
                    </span>
                  </div>
                );
              })}
              {habits.length === 0 && (
                <div className="text-center py-8 text-body font-roboto text-text-secondary">
                  習慣を追加してください
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 