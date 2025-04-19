export interface Habit {
  id: string;
  name: string;
  frequency: {
    type: 'daily' | 'weekly';
    days?: number[];
  };
  startDate: Date;
  endDate?: Date;
  color: string;
  records: {
    [date: string]: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
} 