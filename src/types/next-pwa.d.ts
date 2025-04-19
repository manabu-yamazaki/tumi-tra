declare module 'next-pwa' {
  import type { NextConfig } from 'next';
  export default function withPWA(config?: { dest?: string; register?: boolean; skipWaiting?: boolean }): (config: NextConfig) => NextConfig;
} 