import type { Metadata } from 'next';
import { ThemeProvider } from '@mui/material';

import { Inter } from 'next/font/google';
import '@styles/globals.css';

import theme from '@theme';
import { TaskProvider } from '@store';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Management',
  description: 'Empower Your Productivity: Where Tasks Meet Efficiency',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <TaskProvider>
          <body className={inter.className}>{children}</body>
        </TaskProvider>
      </ThemeProvider>
    </html>
  );
}
