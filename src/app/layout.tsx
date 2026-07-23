import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GamePulse - Your Ultimate Gaming Destination',
  description: 'Stay updated with the latest games, news, reviews, and deals from the gaming world.',
  keywords: 'gaming, games, reviews, news, deals, free games, upcoming releases',
  authors: [{ name: 'GamePulse Team' }],
  creator: 'GamePulse',
  publisher: 'GamePulse',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.gamepulse.com',
    siteName: 'GamePulse',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
