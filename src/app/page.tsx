import { DailySummary } from '@/components/DailySummary';
import { HabitList } from '@/components/HabitList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-accent-neutral/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">習慣トラッカー</h1>
          <Link href="/habits/new">
            <Button size="icon" variant="primary">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <DailySummary />
        <HabitList />
      </main>
    </div>
  );
}
