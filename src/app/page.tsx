import { Metadata } from 'next';
import { Suspense } from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { GamesSection } from '@/components/home/games-section';
import { NewsSection } from '@/components/home/news-section';
import { ReviewsSection } from '@/components/home/reviews-section';
import { DealsSection } from '@/components/home/deals-section';
import { FreeGamesSection } from '@/components/home/free-games-section';
import { CalendarSection } from '@/components/home/calendar-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';

export const metadata: Metadata = {
  title: 'GamePulse - Your Ultimate Gaming Destination',
  description: 'Stay updated with the latest games, news, reviews, and deals from the gaming world.',
  keywords: 'gaming, games, reviews, news, deals, free games, upcoming releases',
  authors: [{ name: 'GamePulse Team' }],
  creator: 'GamePulse',
  publisher: 'GamePulse',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.gamepulse.com',
    siteName: 'GamePulse',
    title: 'GamePulse - Your Ultimate Gaming Destination',
    description: 'Stay updated with the latest games, news, reviews, and deals from the gaming world.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GamePulse - Your Ultimate Gaming Destination',
    description: 'Stay updated with the latest games, news, reviews, and deals from the gaming world.',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSkeleton />}>
        <HeroSection />
        <GamesSection />
        <NewsSection />
        <ReviewsSection />
        <DealsSection />
        <FreeGamesSection />
        <CalendarSection />
        <NewsletterSection />
      </Suspense>
    </div>
  );
}
