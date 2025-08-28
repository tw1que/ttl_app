import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TTL App',
  description: 'Next.js + shadcn/ui client'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

