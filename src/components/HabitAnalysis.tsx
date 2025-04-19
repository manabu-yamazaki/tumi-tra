import { useHabits } from '@/hooks/useHabits';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, eachDayOfInterval } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

type Period = 'week' | 'month' | 'year';

interface HabitAnalysisProps {
  period: Period;
}

export function HabitAnalysis({ period }: HabitAnalysisProps) {
  const { habits, habitRecords } = useHabits();
  const today = new Date();

  const getDateRange = () => {
    switch (period) {
      case 'week':
        return {
          start: startOfWeek(today, { locale: ja }),
          end: endOfWeek(today, { locale: ja }),
        };
      case 'month':
        return {
          start: startOfMonth(today),
          end: endOfMonth(today),
        };
      case 'year':
        return {
          start: startOfYear(today),
          end: endOfYear(today),
        };
    }
  };

  const { start, end } = getDateRange();
  const days = eachDayOfInterval({ start, end });

  const labels = days.map(day => format(day, period === 'year' ? 'M月' : 'd日', { locale: ja }));

  const datasets = habits.map(habit => {
    const data = days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const record = habitRecords.find(r => 
        r.habitId === habit.id && 
        format(r.date, 'yyyy-MM-dd') === dateStr
      );
      return record?.completed ? 1 : 0;
    });

    return {
      label: habit.name,
      data,
      backgroundColor: `${habit.color}80`,
      borderColor: habit.color,
      borderWidth: 2,
    };
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${format(start, period === 'year' ? 'yyyy年' : 'yyyy年M月', { locale: ja })}の達成状況`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="h-[400px]">
        {period === 'year' ? (
          <Line data={{ labels, datasets }} options={options} />
        ) : (
          <Bar data={{ labels, datasets }} options={options} />
        )}
      </div>
    </div>
  );
} 