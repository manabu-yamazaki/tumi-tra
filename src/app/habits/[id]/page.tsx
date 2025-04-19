import { HabitForm } from '@/components/HabitForm';
import { Metadata } from 'next';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: '習慣の編集',
};

export default async function HabitEditPage({
  params,
}: Props) {
  return <HabitForm habitId={params.id === 'new' ? undefined : params.id} />;
} 