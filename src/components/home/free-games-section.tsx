'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface FreeGame {
  id: string;
  storeName: string;
  offerType: 'FREE_FOREVER' | 'LIMITED_TIME' | 'GIVEAWAY' | 'FREE_WEEKEND';
  startDate: Date;
  endDate?: Date;
  offerUrl: string;
  isActive: boolean;
  game: { title: string; slug: string; bannerImage?: string; overallRating?: number };
}

export function FreeGamesSection() {
  const [freeGames, setFreeGames] = useState<FreeGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFreeGames();
  }, []);

  async function fetchFreeGames() {
    try {
      const mockFreeGames: FreeGame[] = [
        {
          id: '1',
          storeName: 'Epic Games Store',
          offerType: 'FREE_FOREVER',
          startDate: new Date('2024-01-01'),
          offerUrl: 'https://store.epicgames.com/p/cyberpunk-2077',
          isActive: true,
          game: { title: 'Cyberpunk 2077', slug: 'cyberpunk-2077', bannerImage: '/images/cyberpunk-banner.jpg', overallRating: 8.5 },
        },
        {
          id: '2',
          storeName: 'Steam',
          offerType: 'FREE_WEEKEND',
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          offerUrl: 'https://store.steampowered.com/app/12345',
          isActive: true,
          game: { title: 'Call of Duty: Warzone', slug: 'call-of-duty-warzone', bannerImage: '/images/warzone-banner.jpg', overallRating: 7.8 },
        },
        {
          id: '3',
          storeName: 'Humble Bundle',
          offerType: 'GIVEAWAY',
          startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          offerUrl: 'https://www.humblebundle.com/store',
          isActive: true,
          game: { title: 'Subnautica', slug: 'subnautica', bannerImage: '/images/subnautica-banner.jpg', overallRating: 9.0 },
        },
        {
          id: '4',
          storeName: 'Origin',
          offerType: 'LIMITED_TIME',
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          offerUrl: 'https://www.origin.com/store',
          isActive: true,
          game: { title: 'Apex Legends', slug: 'apex-legends', bannerImage: '/images/apex-banner.jpg', overallRating: 8.2 },
        },
        {
          id: '5',
          storeName: 'GOG',
          offerType: 'FREE_FOREVER',
          startDate: new Date('2024-01-01'),
          offerUrl: 'https://www.gog.com/store',
          isActive: true,
          game: { title: 'The Witcher: Enhanced Edition', slug: 'the-witcher-enhanced-edition', bannerImage: '/images/witcher1-banner.jpg', overallRating: 8.8 },
        },
        {
          id: '6',
          storeName: 'Xbox Live',
          offerType: 'FREE_WEEKEND',
          startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          offerUrl: 'https://www.xbox.com/play',
          isActive: true,
          game: { title: 'Forza Horizon 5', slug: 'forza-horizon-5', bannerImage: '/images/forza-banner.jpg', overallRating: 9.2 },
        },
      ];
      setFreeGames(mockFreeGames);
    } catch (error) {
      console.error('Error fetching free games:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
          Free Games & Giveaways
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeGames.map((freeGame, index) => (
            <motion.div
              key={freeGame.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  {freeGame.game.bannerImage ? (
                    <Image src={freeGame.game.bannerImage} alt={freeGame.game.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-400 text-lg font-medium">Game Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="text-xs">{freeGame.offerType.replace('_', ' ')}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="text-xs">{freeGame.storeName}</Badge>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{freeGame.game.title}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-green-500 font-bold text-xl">FREE</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Started: {new Date(freeGame.startDate).toLocaleDateString()}</span>
                  </div>
                  {freeGame.endDate && (
                    <div className="flex items-center space-x-2 mb-3 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Ends: {new Date(freeGame.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="mt-auto pt-3 border-t">
                    <a href={freeGame.offerUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                      <span>Claim Now</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
