import { atom } from 'jotai';

export interface Habit {
  id: string;
  name: string;
  frequency: {
    type: 'daily' | 'weekly';
    times?: number;
    days?: number[];
  };
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
}

export interface HabitRecord {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean;
  note?: string;
}

export const habitsAtom = atom<Habit[]>([]);
export const selectedDateAtom = atom<Date>(new Date());
export const habitRecordsAtom = atom<HabitRecord[]>([]); 