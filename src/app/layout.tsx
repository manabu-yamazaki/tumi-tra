import type { Metadata } from "next";
import { BottomNav } from '@/components/BottomNav';
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "習慣トラッカー | 毎日の習慣を記録しよう",
  description: "あなたの習慣を管理し、継続をサポートするアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${poppins.variable} ${roboto.variable} font-roboto`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
