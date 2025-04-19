import { db } from './db';
import { Habit, HabitRecord } from '@/store/atoms';
import { v4 as uuidv4 } from 'uuid';

const getDB = async () => {
  if (!db) {
    throw new Error('データベースが利用できません');
  }
  return await db;
};

// 習慣の操作
export async function createHabit(habitData: {
  name: string;
  frequency: {
    type: 'daily' | 'weekly';
    times?: number;
  };
  startDate: Date;
  color?: string;
}): Promise<Habit> {
  const habit: Habit = {
    id: uuidv4(),
    name: habitData.name,
    frequency: habitData.frequency,
    startDate: habitData.startDate,
    color: habitData.color,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const database = await getDB();
  await database.add('habits', habit);
  return habit;
}

export async function updateHabit(id: string, data: {
  name: string;
  frequency: {
    type: 'daily' | 'weekly';
    days?: number[];
  };
  startDate: Date;
  endDate?: Date;
  color?: string;
}): Promise<Habit> {
  const database = await getDB();
  const habit = await database.get('habits', id);
  if (!habit) {
    throw new Error('習慣が見つかりません');
  }

  const updatedHabit: Habit = {
    ...habit,
    ...data,
    updatedAt: new Date(),
  };

  await database.put('habits', updatedHabit);
  return updatedHabit;
}

export async function deleteHabit(id: string): Promise<void> {
  const database = await getDB();
  await database.delete('habits', id);
  // 関連する記録も削除
  const recordsToDelete = await database.getAllFromIndex('records', 'by-habit', id);
  await Promise.all(recordsToDelete.map(async record => {
    await database.delete('records', record.id);
  }));
}

export async function getAllHabits(): Promise<Habit[]> {
  const database = await getDB();
  return database.getAll('habits');
}

// 習慣記録の操作
export async function toggleHabitRecord(habitId: string, date: Date): Promise<HabitRecord> {
  const database = await getDB();
  const dateStr = date.toISOString().split('T')[0];
  const existingRecords = await database.getAllFromIndex('records', 'by-date', new Date(dateStr));
  const existingRecord = existingRecords.find(r => r.habitId === habitId);

  if (existingRecord) {
    const updatedRecord: HabitRecord = {
      ...existingRecord,
      completed: !existingRecord.completed,
    };
    await database.put('records', updatedRecord);
    return updatedRecord;
  }

  const newRecord: HabitRecord = {
    id: uuidv4(),
    habitId,
    date: new Date(dateStr),
    completed: true,
  };
  await database.add('records', newRecord);
  return newRecord;
}

export async function getHabitRecordsByDate(date: Date): Promise<HabitRecord[]> {
  const database = await getDB();
  const dateStr = date.toISOString().split('T')[0];
  return database.getAllFromIndex('records', 'by-date', new Date(dateStr));
}

export async function updateHabitNote(recordId: string, note: string): Promise<HabitRecord> {
  const database = await getDB();
  const record = await database.get('records', recordId);
  if (!record) {
    throw new Error('記録が見つかりません');
  }

  const updatedRecord: HabitRecord = {
    ...record,
    note,
  };
  await database.put('records', updatedRecord);
  return updatedRecord;
}

// 統計情報の取得
export async function getHabitStats(habitId: string, startDate: Date, endDate: Date) {
  const database = await getDB();
  const records = await database.getAllFromIndex('records', 'by-habit', habitId);
  const filteredRecords = records.filter(
    record => record.date >= startDate && record.date <= endDate
  );

  return {
    total: filteredRecords.length,
    completed: filteredRecords.filter(r => r.completed).length,
    streak: calculateStreak(filteredRecords),
  };
}

function calculateStreak(records: HabitRecord[]): number {
  const sortedRecords = records
    .filter(r => r.completed)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  let streak = 0;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const record of sortedRecords) {
    const recordDate = new Date(record.date);
    recordDate.setHours(0, 0, 0, 0);

    if (recordDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (recordDate.getTime() < currentDate.getTime()) {
      break;
    }
  }

  return streak;
} 