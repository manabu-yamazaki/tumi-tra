import { HabitForm } from '@/components/HabitForm';

interface HabitEditPageProps {
  params: {
    id: string;
  };
}

export default function HabitEditPage({ params }: HabitEditPageProps) {
  return <HabitForm habitId={params.id === 'new' ? undefined : params.id} />;
} 