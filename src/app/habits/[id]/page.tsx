import { HabitForm } from '@/components/HabitForm';

export default function HabitEditPage({
  params,
}: {
  params: { id: string }
}) {
  return <HabitForm habitId={params.id === 'new' ? undefined : params.id} />;
} 