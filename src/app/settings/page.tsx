'use client';

import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-accent-neutral/20">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <h1 className="text-xl font-bold">設定</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>テーマ設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">ダークモード</Label>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={handleThemeChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>アプリ情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">バージョン</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">開発者</span>
              <span>Yamazaki Manabu</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">ライセンス</span>
              <span>MIT</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 