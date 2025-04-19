'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useHabits } from '@/hooks/useHabits';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const habitSchema = z.object({
  name: z.string().min(1, '習慣名を入力してください'),
  frequency: z.object({
    type: z.enum(['daily', 'weekly']),
    days: z.array(z.number()).optional(),
  }),
  startDate: z.date(),
  endDate: z.date().optional(),
  color: z.string(),
});

type HabitFormValues = z.infer<typeof habitSchema>;

const weekdays = [
  { value: 0, label: '日' },
  { value: 1, label: '月' },
  { value: 2, label: '火' },
  { value: 3, label: '水' },
  { value: 4, label: '木' },
  { value: 5, label: '金' },
  { value: 6, label: '土' },
];

interface HabitFormProps {
  habitId?: string;
}

export function HabitForm({ habitId }: HabitFormProps) {
  const router = useRouter();
  const { addHabit, editHabit, habits } = useHabits();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: '',
      frequency: {
        type: 'daily',
        days: [],
      },
      startDate: new Date(),
      color: '#4CAF50',
    },
  });

  useEffect(() => {
    if (habitId && habitId !== 'new') {
      const habit = habits.find(h => h.id === habitId);
      if (habit) {
        form.reset({
          name: habit.name,
          frequency: habit.frequency,
          startDate: habit.startDate,
          endDate: habit.endDate,
          color: habit.color || '#4CAF50',
        });
      }
    }
  }, [habitId, habits, form]);

  const onSubmit = async (data: HabitFormValues) => {
    try {
      setIsSubmitting(true);
      if (habitId && habitId !== 'new') {
        await editHabit(habitId, data);
      } else {
        await addHabit(data);
      }
      router.push('/');
    } catch (error) {
      console.error('習慣の保存に失敗しました:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-accent-neutral/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            {habitId && habitId !== 'new' ? '習慣を編集' : '新しい習慣'}
          </h1>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            variant="primary"
          >
            保存
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>習慣名</FormLabel>
                  <FormControl>
                    <Input placeholder="例: 朝のジョギング" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>頻度</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="頻度を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">毎日</SelectItem>
                      <SelectItem value="weekly">曜日指定</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('frequency.type') === 'weekly' && (
              <FormField
                control={form.control}
                name="frequency.days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>曜日</FormLabel>
                    <div className="flex gap-2 flex-wrap">
                      {weekdays.map((day) => (
                        <Button
                          key={day.value}
                          type="button"
                          variant={field.value?.includes(day.value) ? 'primary' : 'secondary'}
                          onClick={() => {
                            const current = field.value || [];
                            const updated = current.includes(day.value)
                              ? current.filter(d => d !== day.value)
                              : [...current, day.value];
                            field.onChange(updated);
                          }}
                          className="w-10 h-10"
                        >
                          {day.label}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>開始日</FormLabel>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={ja}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>終了日（任意）</FormLabel>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={ja}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>カラー</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </main>
    </div>
  );
} 