import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { habitsAtom, habitRecordsAtom, selectedDateAtom } from '@/store/atoms';
import {
  createHabit,
  updateHabit,
  deleteHabit,
  getAllHabits,
  toggleHabitRecord,
  getHabitRecordsByDate,
  updateHabitNote,
  getHabitStats,
} from '@/lib/habitOperations';

export function useHabits() {
  const [habits, setHabits] = useAtom(habitsAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [habitRecords, setHabitRecords] = useAtom(habitRecordsAtom);

  // 初期データの読み込み
  useEffect(() => {
    const loadInitialData = async () => {
      const allHabits = await getAllHabits();
      setHabits(allHabits);
      
      const records = await getHabitRecordsByDate(selectedDate);
      setHabitRecords(records);
    };

    loadInitialData();
  }, [setHabits, setHabitRecords, selectedDate]);

  // 習慣の作成
  const addHabit = useCallback(async (habitData: {
    name: string;
    frequency: {
      type: 'daily' | 'weekly';
      times?: number;
    };
    startDate: Date;
    color?: string;
  }) => {
    const newHabit = await createHabit(habitData);
    setHabits(prev => [...prev, newHabit]);
    return newHabit;
  }, [setHabits]);

  // 習慣の更新
  const editHabit = useCallback(async (id: string, data: {
    name: string;
    frequency: {
      type: 'daily' | 'weekly';
      days?: number[];
    };
    startDate: Date;
    endDate?: Date;
    color?: string;
  }) => {
    const updatedHabit = await updateHabit(id, data);
    setHabits(prev => prev.map(habit => 
      habit.id === id ? updatedHabit : habit
    ));
    return updatedHabit;
  }, [setHabits]);

  // 習慣の削除
  const removeHabit = useCallback(async (id: string) => {
    await deleteHabit(id);
    setHabits(prev => prev.filter(habit => habit.id !== id));
    setHabitRecords(prev => prev.filter(record => record.habitId !== id));
  }, [setHabits, setHabitRecords]);

  // 日付の選択
  const selectDate = useCallback(async (date: Date) => {
    setSelectedDate(date);
    const records = await getHabitRecordsByDate(date);
    setHabitRecords(records);
  }, [setSelectedDate, setHabitRecords]);

  // 習慣の完了状態の切り替え
  const toggleHabit = useCallback(async (habitId: string) => {
    const updatedRecord = await toggleHabitRecord(habitId, selectedDate);
    setHabitRecords(prev => {
      const exists = prev.some(record => record.id === updatedRecord.id);
      if (exists) {
        return prev.map(record => 
          record.id === updatedRecord.id ? updatedRecord : record
        );
      } else {
        return [...prev, updatedRecord];
      }
    });
    return updatedRecord;
  }, [selectedDate, setHabitRecords]);

  // メモの更新
  const updateNote = useCallback(async (recordId: string, note: string) => {
    const updatedRecord = await updateHabitNote(recordId, note);
    setHabitRecords(prev => prev.map(record =>
      record.id === recordId ? updatedRecord : record
    ));
    return updatedRecord;
  }, [setHabitRecords]);

  // 統計情報の取得
  const getStats = useCallback(async (habitId: string, startDate: Date, endDate: Date) => {
    return getHabitStats(habitId, startDate, endDate);
  }, []);

  return {
    habits,
    selectedDate,
    habitRecords,
    addHabit,
    editHabit,
    removeHabit,
    selectDate,
    toggleHabit,
    updateNote,
    getStats,
  };
} 