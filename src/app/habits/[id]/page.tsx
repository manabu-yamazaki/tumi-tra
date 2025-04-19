import { HabitForm } from '@/components/HabitForm';

type Props = {
  params: { id: string }
}

export default function HabitEditPage({
  params,
}: Props) {
  return <HabitForm habitId={params.id === 'new' ? undefined : params.id} />;
} 