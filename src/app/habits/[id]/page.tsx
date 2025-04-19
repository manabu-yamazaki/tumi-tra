import { HabitForm } from '@/components/HabitForm';

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function HabitEditPage({ params }: Props) {
  return <HabitForm habitId={params.id === 'new' ? undefined : params.id} />;
} 