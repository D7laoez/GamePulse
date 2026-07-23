'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Percent, Clock, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface Deal {
  id: string;
  storeName: string;
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
  discountEndDate?: Date;
  dealUrl: string;
  isActive: boolean;
  game: { title: string; slug: string; bannerImage?: string; overallRating?: number };
}

export function DealsSection() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {
    try {
      const mockDeals: Deal[] = [
        {
          id: '1',
          storeName: 'Steam',
          originalPrice: 59.99,
          currentPrice: 29.99,
          discountPercentage: 50,
          discountEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          dealUrl: 'https://store.steampowered.com/app/12345',
          isActive: true,
          game: { title: 'Cyberpunk 2077: Phantom Liberty', slug: 'cyberpunk-2077-phantom-liberty', bannerImage: '/images/cyberpunk-banner.jpg', overallRating: 8.5 },
        },
        {
          id: '2',
          storeName: 'Epic Games Store',
          originalPrice: 69.99,
          currentPrice: 0,
          discountPercentage: 100,
          discountEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          dealUrl: 'https://store.epicgames.com/p/cyberpunk-2077',
          isActive: true,
          game: { title: 'The Witcher 3: Wild Hunt', slug: 'the-witcher-3-wild-hunt', bannerImage: '/images/witcher3-banner.jpg', overallRating: 9.5 },
        },
        {
          id: '3',
          storeName: 'Humble Bundle',
          originalPrice: 59.99,
          currentPrice: 14.99,
          discountPercentage: 75,
          discountEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          dealUrl: 'https://www.humblebundle.com/store/the-elder-scrolls-v-skyrim',
          isActive: true,
          game: { title: 'The Elder Scrolls V: Skyrim', slug: 'skyrim', bannerImage: '/images/skyrim-banner.jpg', overallRating: 9.0 },
        },
        {
          id: '4',
          storeName: 'Green Man Gaming',
          originalPrice: 49.99,
          currentPrice: 19.99,
          discountPercentage: 60,
          discountEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          dealUrl: 'https://www.greenmangaming.com/games/fallout-4',
          isActive: true,
          game: { title: 'Fallout 4', slug: 'fallout-4', bannerImage: '/images/fallout4-banner.jpg', overallRating: 8.2 },
        },
        {
          id: '5',
          storeName: 'Fanatical',
          originalPrice: 39.99,
          currentPrice: 7.99,
          discountPercentage: 80,
          discountEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          dealUrl: 'https://www.fanatical.com/en/game/half-life-alyx',
          isActive: true,
          game: { title: 'Half-Life: Alyx', slug: 'half-life-alyx', bannerImage: '/images/halflife-banner.jpg', overallRating: 9.3 },
        },
        {
          id: '6',
          storeName: 'CDKeys',
          originalPrice: 59.99,
          currentPrice: 23.99,
          discountPercentage: 60,
          discountEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          dealUrl: 'https://www.cdkeys.com/halo-infinite',
          isActive: true,
          game: { title: 'Halo Infinite', slug: 'halo-infinite', bannerImage: '/images/halo-banner.jpg', overallRating: 8.0 },
        },
      ];
      setDeals(mockDeals);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 mb-8" />
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
    <section className="py-16 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
          Hot Deals & Discounts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  {deal.game.bannerImage ? (
                    <Image src={deal.game.bannerImage} alt={deal.game.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-400 text-lg font-medium">Game Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive" className="text-sm">-{deal.discountPercentage}%</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-xs">{deal.storeName}</Badge>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{deal.game.title}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="line-through text-muted-foreground text-sm">${deal.originalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-1 font-bold">
                      <DollarSign className="h-4 w-4" />
                      <span>${deal.currentPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  {deal.discountEndDate && (
                    <div className="flex items-center space-x-2 mb-3 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Ends: {new Date(deal.discountEndDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 mb-3">
                    <Percent className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 font-medium">Save ${(deal.originalPrice - deal.currentPrice).toFixed(2)}</span>
                  </div>
                  <div className="mt-auto pt-3 border-t">
                    <a href={deal.dealUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                      <span>Get Deal</span>
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
