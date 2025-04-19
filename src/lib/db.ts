import { openDB, DBSchema } from 'idb';

interface MyDB extends DBSchema {
  habits: {
    key: string;
    value: {
      id: string;
      name: string;
      frequency: {
        type: 'daily' | 'weekly';
        times?: number; // 週当たりの目標回数（weeklyの場合）
      };
      startDate: Date;
      createdAt: Date;
      updatedAt: Date;
      color?: string; // カレンダー表示用の色
    };
    indexes: { 'by-date': Date };
  };
  records: {
    key: string;
    value: {
      id: string;
      habitId: string;
      date: Date;
      completed: boolean;
      note?: string;
    };
    indexes: { 'by-habit': string; 'by-date': Date };
  };
  settings: {
    key: string;
    value: {
      id: string;
      theme: 'light' | 'dark';
      lastSync?: Date;
    };
  };
}

export const db = typeof window !== 'undefined'
  ? openDB<MyDB>('habits-tracker-db', 1, {
      upgrade(db) {
        const habitStore = db.createObjectStore('habits', {
          keyPath: 'id',
        });
        habitStore.createIndex('by-date', 'createdAt');

        const recordStore = db.createObjectStore('records', {
          keyPath: 'id',
        });
        recordStore.createIndex('by-habit', 'habitId');
        recordStore.createIndex('by-date', 'date');

        db.createObjectStore('settings', {
          keyPath: 'id',
        });
      },
    })
  : null; 