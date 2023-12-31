import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './scss/main.scss';

import { ModalProvider } from '@/components/Modal';
import { DataProvider } from './context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <ModalProvider>{children}</ModalProvider>
        </DataProvider>
      </body>
    </html>
  );
}
