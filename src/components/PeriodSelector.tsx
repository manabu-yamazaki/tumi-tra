import { Button } from '@/components/ui/button';

type Period = 'week' | 'month' | 'year';

interface PeriodSelectorProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export function PeriodSelector({ period, onPeriodChange }: PeriodSelectorProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="text-sm font-medium mb-2">期間選択</h2>
      <div className="flex gap-2">
        <Button
          variant={period === 'week' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onPeriodChange('week')}
        >
          週間
        </Button>
        <Button
          variant={period === 'month' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onPeriodChange('month')}
        >
          月間
        </Button>
        <Button
          variant={period === 'year' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onPeriodChange('year')}
        >
          年間
        </Button>
      </div>
    </div>
  );
} 