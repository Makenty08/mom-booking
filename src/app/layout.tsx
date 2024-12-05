import './globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '~/lib/utils';
import dynamic from 'next/dynamic';
import { Toaster } from '~/components/ui/toaster';
import { ChatBot } from '~/feature/chatbot/Chatbot';

const ReduxProviders = dynamic(() => import('~/store/store-provider'), { ssr: false });

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700', '500', '600', '300', '200', '100', '800', '900'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen font-sans antialiased sm:bg-slate-50 bg-white',
          fontSans.variable,
        )}
      >
        <ReduxProviders>
          <ChatBot />
          <Toaster />
          {children}
        </ReduxProviders>
      </body>
    </html>
  );
}
