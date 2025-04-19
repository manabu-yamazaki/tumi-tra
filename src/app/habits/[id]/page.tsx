import { HabitForm } from '@/components/HabitForm';

export type paramsType = Promise<{ id: string }>;

export default async function HabitEditPage(props: { params: paramsType }) {
  const { id } = await props.params;
  return <HabitForm habitId={id === 'new' ? undefined : id} />;
} 