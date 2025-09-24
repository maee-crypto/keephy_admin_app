import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import { setupAdminGlobalErrorHandling } from '../utils/routeChecker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Keephy Admin Dashboard',
  description: 'Manage your Keephy platform with comprehensive analytics and controls.',
  keywords: ['admin', 'dashboard', 'analytics', 'feedback', 'keephy'],
  authors: [{ name: 'Keephy Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Setup global error handling
  if (typeof window !== 'undefined') {
    setupAdminGlobalErrorHandling();
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            <Layout>
              {children}
            </Layout>
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}